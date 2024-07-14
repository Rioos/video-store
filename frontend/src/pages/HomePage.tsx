import React, { useEffect } from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";
import { SimpleGrid, Box } from "@chakra-ui/react";
import MovieCard from "../components/MovieCard";
import AddMovieForm from "../components/AddMovieForm";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      likes
    }
  }
`;

const MOVIE_ADDED = gql`
  subscription OnMovieAdded {
    movieAdded {
      id
      title
      likes
    }
  }
`;

const MOVIE_LIKED = gql`
  subscription OnMovieLiked {
    movieLiked {
      id
      title
      likes
    }
  }
`;

const HomePage: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_MOVIES);
  const { data: movieAddedData } = useSubscription(MOVIE_ADDED);
  const { data: movieLikedData } = useSubscription(MOVIE_LIKED);

  useEffect(() => {
    if (movieAddedData) {
      refetch();
    }
  }, [movieAddedData, refetch]);

  useEffect(() => {
    if (movieLikedData) {
      refetch();
    }
  }, [movieLikedData, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Box>
      <SimpleGrid columns={[1, null, 3]} spacing="40px">
        {data.movies.map(
          (movie: {
            id: string;
            title: string;
            likes: number;
            createdAt: string;
            updatedAt: string;
          }) => (
            <MovieCard key={movie.id} movie={movie} />
          )
        )}
      </SimpleGrid>
      <Box mt={8}>
        <AddMovieForm />
      </Box>
    </Box>
  );
};

export default HomePage;
