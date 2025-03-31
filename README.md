# Larvis home assignment project

This project contains all the code for LARVIS home assignment

## Directories

- `larvis-service`: Contains provided backend Larvis service and the frontend assignment instruction running on port `8080`
- `larvis-ui`: Frontend Web application to interracti with Larvis service running on port `3000`

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

When all container is running, go to [http://localhost:3000/login](http://localhost:3000/login) to login into Larvis service using 3 default users `alice`, `bob`, and `charlie`, with the default password, `1234`, other wise you can't use the service

### Larvis UI

The service should have layout like this:
![Larvis UI](assets/larvis-homepage.png)

There are 3 main component

- There is a Navigation Bar on top that allow user to edit their own data by clicking `My Profile` and `Log out` button to log out of the service.

- There is a `User List` that display all the user in the service. We can see the user information by clicking on the user, if the user is the same as logged in user then we can edit the user information.

- There is a `Satellite Monthly Ore Acquisitions` that display the amount of ore deposited to the satellite everyday from last month
