import { gql } from "graphql-tag";

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    likes: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    movies: [Movie]
  }

  type Mutation {
    addMovie(title: String!): Movie
    likeMovie(id: Int!): Movie
  }

  type Subscription {
    movieAdded: Movie
    movieLiked: Movie
  }
`;

export { typeDefs };
