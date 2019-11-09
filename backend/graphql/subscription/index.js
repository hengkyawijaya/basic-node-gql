const { types:{POST_ADDED}, pubsub } = require('../pubsub')
module.exports = {
    listenNotification: {
        subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
}