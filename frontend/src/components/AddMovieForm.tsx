import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Box, Button, Input, VStack, Heading } from "@chakra-ui/react";

export const ADD_MOVIE = gql`
  mutation AddMovie($title: String!) {
    addMovie(title: $title) {
      id
      title
      likes
    }
  }
`;

const AddMovieForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [addMovie] = useMutation(ADD_MOVIE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title) {
      await addMovie({ variables: { title } });
      setTitle("");
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={6}
      width={"100%"}
      borderWidth="1px"
      borderRadius="lg"
      textAlign="center"
      bg="white"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      transition="all 0.3s ease"
    >
      <VStack spacing={4}>
        <Heading as="h3" size="lg">
          Add New Movie
        </Heading>
        <Input
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" colorScheme="blue" width="full">
          Add Movie
        </Button>
      </VStack>
    </Box>
  );
};

export default AddMovieForm;
