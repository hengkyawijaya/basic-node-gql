const { gql } = require('apollo-server-express');
const post = require('./post');
const notif = require('./notif')

const schema = gql`
scalar Date

 type Query {
    getPosts(page: Int!, limit: Int!):Posts
    getPost(id: Int!): Post
 }

 type Mutation {
    createPost(input: inputPost!):Post
    updatePost(id: ID!, input: inputPost!):Post
 }

 type Subscription {
    listenNotification: Notif
  }
`
module.exports = [schema, post, notif]