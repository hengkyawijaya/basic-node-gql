# BASIC NODE GQL
### Objective
- Learn graphql concept
- Learn about Query, Mutation, Resolver and Subscription in graphql
- Implement basic graphql with node js

### Prerequisite
- Docker already installed on your machine
- Having knowledge about basic node js
- Having knowledge about basic docker

### How To Run
1. Run mongodb server using docker
```
docker-compose -f mongo/docker-compose.yml up
```
2. Install dependencies 
```
yarn install
```
3. Start development server
```
yarn dev
```
4. Open link down below to access graphql playgroud
```
http://localhost:8001/graphql
```
5. Experiment creating new Query, Mutation, Subscription, and Resolvers.
