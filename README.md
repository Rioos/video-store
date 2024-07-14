# Video Store Web Application

This project is a video store web application built with React, Apollo Client, Apollo Server, GraphQL, Sequelize, and PostgreSQL. The frontend is created using React and Chakra UI, while the backend uses Express and Apollo Server with Sequelize to interact with a PostgreSQL database.

## Features

- List movies with their titles and like counts
- Add new movies
- Like movies
- Real-time updates using GraphQL subscriptions


## Clone the Repository

```bash
git clone https://github.com/your-username/video-store-app.git
cd video-store-app
```

## Run the application

### Docker Version

#### Prerequisites

- Docker
- Docker Compose

#### Run the containers

The following command will start 3 containers, one for the React front-end, one for the Node back-end and the other for our Postgress database.

The backend and frontend containers will be running on hot reload mode, so if you make any change it should restart automatically with the updated files.

**You may want to update your .env files (inside backend and frontend folders) if you wish.**

```bash
docker-compose up --build
```

### Manual instalation

#### Prerequesites
- NodeJS 
- PostgresDB instance running

#### Run Backend

Edit the `.env` file inside the `backend` to mach your Database configuration then run:

```bash
cd backend
yarn install
yarn run dev
```

#### Run Frontend

Edit the `.env` file inside the `frontend` to mach your backend URL then run:

```bash
cd frontend
yarn install
yarn start
```

## Access the Application

	•	Frontend: http://localhost:3000
	•	Backend GraphQL Playground: http://localhost:4000/graphql

From the Playground you may want to use some usefull queries/mutations:


```graphql

# Gets all movies
query GetMovies {
  movies {
    id
    title
    likes
  }
}

# Like a movie (will increment likes in one)
mutation LikeMovie($likeMovieId: Int!) {
  likeMovie(id: $likeMovieId) {
    id
    title
    likes
  }
}

# Variables example
# {
#  "id": 1
# }

# Add a movie
mutation AddMovie($title: String!) {
  addMovie(title: $title) {
    id
    title
    likes
  }
}

# Variables example
# {
#  "title": "New Movie"
# }

# Listens to the MovieAdded channel so that you will get updates when a new Movie is added
subscription MovieAdded {
  movieAdded {
    id
    likes
    title
  }
}

# Listens to the MovieLiked channel  so that you will get updates when a Movie is liked
subscription MovieLiked {
    movieLiked {
    id
    likes
    title
  }
}
```