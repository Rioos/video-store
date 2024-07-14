import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import MovieCard from "./MovieCard";
import { LIKE_MOVIE } from "./MovieCard";

const movie = {
  id: "1",
  title: "Test Movie",
  likes: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mocks = [
  {
    request: {
      query: LIKE_MOVIE,
      variables: { id: "1" },
    },
    result: {
      data: {
        likeMovie: {
          ...movie,
          likes: 11,
        },
      },
    },
  },
];

test("renders MovieCard component", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MovieCard movie={movie} />
    </MockedProvider>
  );

  expect(screen.getByText(/Test Movie/i)).toBeInTheDocument();
  expect(screen.getByText(/Likes: 10/i)).toBeInTheDocument();
});
