# Relay Workshop

You are going to learn Relay and build a mini social network at the end of this workshop

## Welcome 👋

Each lesson including the exercise description can be found in each of the directories of /workshop.

I will explain everything during the intro.

## Code

Most of it is written in TypeScript (not particularity well typed). Feel free to use plain JavaScript if you prefer that.

## Structure

The workshop is a "huge" monorepo with many packages, let's see what's inside:

packages - contains packages and code that make workshop exercises possible

- babel - shared babel config
- babelweb - shared babel config for web with react fast refresh
- graphql - graphql utilities to make building graphql servers with graphql-js faster
- relay - relay utilities
- route - custom routing solution until react-router supports render as you fetch
- server - graphql server used on demo and workshop exercises
- test - test utilities to make tests easy
- ui - mini design system to be used on demo and workshop exercises
- web - demo app - mini social network
- webpack - shared webpack config for the demo and workshop exercises

workshop - a set of practice exercises to really learn Relay

- 01-fetchGraphql - fetch GraphQL data using pure React
- 02-useLazyLoadQuery - fetch GraphQL data using Relay useLazyLoadQuery hook
- 03-useFragment - refactor code to colocate data using useFragment hook
- 04-usePagination - learn to paginate back and forward using usePagination hook
- 05-useMutation - learn to do mutation using useMutation hook
- 06-mutationUpdater - learn to update Relay store with mutation output data
- 07-useRefetchableFragment - use useRefetchableFragment to do some refetch queries and update data
- 08-useSubscription - learn how to useSubscription to make you app realtime
- 09-usePreloadQuery - learn the render as you fetch pattern using preloadQuery and usePreloadQuery
- 10-testUsePreloadQuery - learn how to test your Relay components using @testing-library
- 11-testUseFragment - learn how to test a single component with useFragment
- 12-testUseMutation - learn how to test mutations calls

solutions - the same folder of workshop but with my solutions

slides - some slides to help in workshop

- concepts - GraphQL and Relay Concepts

## Requirements

- pnpm - we need to use yarn, as npm does not support workspaces yet
- node lts - we recommend using node LTS version, and nvm to manage your node version
- mongo - you can

## Mongo

### How to install mongo

```sh
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### How to run mongo in docker

```sh

### remember to start docker before executing the command!
### run mongo:latest image in detached mode
docker run -d -p 27017:27017 --name CONTAINER_NAME -d mongo:latest
```

docker tips

```bash
### list all running containers
docker ps
### list all containers (including the exited ones)
docker ps -a
### stop the container
docker stop CONTAINER_NAME
### start the container
docker start CONTAINER_N
### delete the container to free disk spaceAME
docker rm CONTA
### list all downloaded imagesINER_NAME
docker image ls
###: remove image from your computer to free disk space
docker rmi IMAGE_NAME:TAG
```

### Use React Workshop mongo URI

```sh
mongodb+srv://sibelius:eYZlo2POmcyuUuRR@reacteurope-los0c.mongodb.net/test
```

## Server

### Run

Server runs at http://localhost:7500/graphql

```sh
pnpm server
```

### How to update GraphQL schema SDL (schema.graphql)

```sh
pnpm update-schema
```

### How to create a seed of posts

```sh
pnpm seed
```

## How to update Relay artifacts

```
pnpm relay
```

## How to get an Authorization Token

Useful for exercises that user should be logged in

```
pnpm get-token
```

## Setup .env

Web and workshops consumes a local .env, you just need to copy the .env.example to .env inside each package

```sh
pnpm copy-envs
```

## Web

```
pnpm web
```

## Run both `web` and `server` packages

```bash
pnpm start
```

## How to run Workshop exercises

- go inside the workshop/<exercise>/
- run pnpm start

Example for 01-fetchGraphQL

```bash
cd ./workshop/01-fetchGraphQL
pnpm start
```

## Feedback Form

https://forms.gle/uxkoyyeuUSjADC3s7

## Remote Workshop

If you are interested in this workshop as a remote workshop (live), send an email to sibeliusseraphini@gmail.com
I can run this workshop in English/Portuguese (I'm still learning Spanish)

## Donation

You can donate to me on Patreon (https://www.patreon.com/sibelius), or Bitcoin
