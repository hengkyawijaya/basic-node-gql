const { PubSub } = require('apollo-server-express');
const POST_ADDED = 'POST_ADDED'

const pubsub = new PubSub()

module.exports = {
    types: {
        POST_ADDED,
    },
    pubsub
}