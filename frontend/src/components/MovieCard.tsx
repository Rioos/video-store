import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Box, Button, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaThumbsUp } from "react-icons/fa";

export const LIKE_MOVIE = gql`
  mutation LikeMovie($id: Int!) {
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
      bg="white"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      transition="all 0.3s ease"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {movie.title}
        </Text>
        <HStack>
          <Button
            colorScheme="blue"
            onClick={() => likeMovie({ variables: { id: movie.id } })}
            leftIcon={<Icon as={FaThumbsUp} />}
          >
            Likes: {movie.likes}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MovieCard;
