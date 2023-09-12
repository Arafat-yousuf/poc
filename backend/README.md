<p align="center">
  <img src="../frontend/public/assets/dhub_120_120.png" width="200" alt="Dragonhub Logo" />
</p>

# Dragonhub Server Repository
## Pre-requisite

This project uses `pnpm ` as a package manager. If you do not have it installed but have `npm` in you machine. just run `npm install -g pnpm` and you are good to go. 

For other ways to install, check out [HERE](https://pnpm.io/installation)
## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
## How to Connect MongoDB

This project requires mongoDB. You can install MongoDB locally in several ways. We highly recommend using Docker as you can just go to the `deploy\docker` path and run ```docker compose up```.  You will find mongoDB up and running in `http://localhost:8081/`.

N.B: You can run docker desktop in windows using wsl (recommended) or hyper-v as backend. check [HERE](https://docs.docker.com/desktop/install/windows-install/)


Or if you want to just install mongoDB in windows. click [HERE](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)