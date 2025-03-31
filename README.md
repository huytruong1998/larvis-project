# Larvis home assignment project

This project contains all the code for LARVIS home assignment

## Directories

- `larvis-service`: Contains provided backend Larvis service and the frontend assignment instruction
- `larvis-ui`: Frontend Web application to interracti with Larvis service

## Setup project environment with docker

The project is run in docker to keep the envirnment consistent across multiple machine.In order to run the project, you need to have docker installed in your local machine .To create and starts all the container, build all the image, create volume to store package installed in node_module by running the command below in root folder containing the file `docker-compose.yml`

```
docker compose up --build
```

After the initial build, you can start the project in the background next time with command

```
docker compose up -d
```

You can stop all running container with command

```
docker compose down
```

## How to use the frontend service
