import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AddMovieForm from "./AddMovieForm";
import { ADD_MOVIE } from "./AddMovieForm";

const mocks = [
  {
    request: {
      query: ADD_MOVIE,
      variables: { title: "New Test Movie" },
    },
    result: {
      data: {
        addMovie: {
          id: "1",
          title: "New Test Movie",
          likes: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    },
  },
];

test("renders AddMovieForm component", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AddMovieForm />
    </MockedProvider>
  );

  expect(screen.getByPlaceholderText(/Movie Title/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Movie/i)).toBeInTheDocument();
});
