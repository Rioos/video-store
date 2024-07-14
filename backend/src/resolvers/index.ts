import { sequelize, Movie } from "../models";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const resolvers = {
  Query: {
    movies: async () => await Movie.findAll({ order: [["createdAt", "DESC"]] }),
  },
  Mutation: {
    addMovie: async (_: undefined, { title }: { title: string }) => {
      const movie = await Movie.create({ title });
      pubsub.publish("MOVIE_ADDED", { movieAdded: movie });
      return movie;
    },
    likeMovie: async (_: undefined, { id }: { id: number }) => {
      return sequelize.transaction(async (transaction) => {
        const movie = await Movie.findByPk(id, {
          lock: transaction.LOCK.UPDATE,
          transaction,
        });
        if (movie) {
          movie.likes += 1;
          await movie.save({ transaction });
          pubsub.publish("MOVIE_LIKED", { movieLiked: movie });
          return movie;
        }
        return null;
      });
    },
  },
  Subscription: {
    movieAdded: {
      subscribe: () => pubsub.asyncIterator(["MOVIE_ADDED"]),
    },
    movieLiked: {
      subscribe: () => pubsub.asyncIterator(["MOVIE_LIKED"]),
    },
  },
};

export { resolvers };
