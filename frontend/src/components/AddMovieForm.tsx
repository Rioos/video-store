import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Box, Button, Input, Stack } from "@chakra-ui/react";

const ADD_MOVIE = gql`
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
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      textAlign="center"
    >
      <Stack spacing={4}>
        <Input
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" colorScheme="teal">
          Add Movie
        </Button>
      </Stack>
    </Box>
  );
};

export default AddMovieForm;
