# DevelopsToday

This project is a full-stack application consisting of a **React frontend** and a **NestJS backend**. The frontend is built using React and the backend is built using NestJS, both running in separate Docker containers for easy setup and deployment.

## Prerequisites

Before setting up the project, ensure you have the following tools installed on your local machine:

- [Docker](https://www.docker.com/get-started) (for containerizing the application)
- [Docker Compose](https://docs.docker.com/compose/) (for managing multi-container Docker applications)

Make sure you also have a recent version of **Node.js** installed on your machine, although Docker will handle most of the environment setup.

## Project Structure

## Setup

## 1. Clone the Repository

Start by cloning the project repository to your local machine.

```bash
git clone <repository_url>
cd <project_directory>
```

## 2. Build and Run with Docker Compose

To run both the frontend and backend services together, you'll use Docker Compose. This will build the Docker images and run them in containers.

Make sure you're in the project root directory (where the docker-compose.yml file is located), then run the following command to start the services:

```bash
docker-compose up --build
```

## 3. Access the Application

Once the containers are up and running, you can access the application in your browser.

    The React frontend will be available at http://localhost:80.
    The NestJS backend will be available at http://localhost:3030.

## 4. Stopping the Services

To stop the Docker containers when you're done, run the following command in the project directory:

```bash
docker-compose down
```

## Frontend

The frontend is built using React and React Router for navigation. The frontend communicates with the backend via API calls. When you first visit the app in the browser, it will display a list of countries and allow navigation to specific country details, including their borders and population.
Features

    Displays a list of countries.
    Shows a population chart for the selected country.
    Shows neighboring countries and allows navigation to them.

#### Technologies Used

    React (Frontend)
    React Router (Routing)
    Chart.js (Population charts)
    Docker (Containerization)
    Docker Compose (Multi-container management)

## Backend

The backend is built using NestJS and provides API endpoints for retrieving country information, such as population, borders, and flags.

### API Endpoints

Here are the main API endpoints provided by the backend:

    GET /countries/ - Returns a list of all the countries
    GET /countries/countryInfo/{countryCode} – Returns information about a specific country (name, region, borders, etc.).
    GET /countries/population/{countryName} – Returns population data for a specific country.
    GET /countries/flags/{countryName} – Returns the flag image for a specific country.

## Troubleshooting

If you encounter issues with the setup or running the application, here are a few things to check:

    Docker Compose version: Make sure you're using a compatible version of Docker Compose. You can check your Docker Compose version with docker-compose --version and update if needed.
    Network issues: If the frontend can't connect to the backend, check if the backend container is running and reachable by the frontend container. The Docker network configuration in the docker-compose.yml file ensures they can communicate, but issues may arise if containers fail to start.
    Logs: Always check the logs using docker-compose logs for errors that might provide more details on what's going wrong.
