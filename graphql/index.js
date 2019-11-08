const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./resolvers')
const schema = require('./schema')

const { Post } = require('../models')

module.exports = new ApolloServer({
    typeDefs:schema,
    resolvers,
    playground: {
        endpoint: '/graphql',
    },
    context: {
        Post,
    }
});