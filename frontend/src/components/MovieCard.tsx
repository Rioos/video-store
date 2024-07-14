import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Box, Button, Text } from "@chakra-ui/react";

const LIKE_MOVIE = gql`
  mutation LikeMovie($id: ID!) {
    likeMovie(id: $id) {
      id
      likes
    }
  }
`;

interface Movie {
  id: string;
  title: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [likeMovie] = useMutation(LIKE_MOVIE);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      textAlign="center"
    >
      <Text fontSize="xl" mb={4}>
        {movie.title}
      </Text>
      <Button
        colorScheme="teal"
        onClick={() => likeMovie({ variables: { id: movie.id } })}
      >
        Likes: {movie.likes}
      </Button>
    </Box>
  );
};

export default MovieCard;
