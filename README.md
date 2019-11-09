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
#### Backend
1. Run mongodb server using docker
```
docker-compose -f mongo/docker-compose.yml up
```
2. Open folder backend
3. Install dependencies 
```
yarn install
```
4. Start development server
```
yarn dev
```
5. Open link down below to access graphql playgroud
```
http://localhost:8001/graphql
```
6. Experiment creating new Query, Mutation, Subscription, and Resolvers.

#### React-app
1. Open folder react-app
```
yarn install
```
2. Start the react apps
```
yarn start
```
3. Open link down below to access react app from browser
```
http://localhost:3000
```


