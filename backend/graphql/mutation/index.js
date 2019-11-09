const { types:{ POST_ADDED }, pubsub } = require('../pubsub')

module.exports = {
    createPost: async (root, { input }, { Post }) => {
        thePost = await new Post(input).save()
        pubsub.publish(POST_ADDED, { listenNotification: { title: "post has been created", message: "horeee" } });
       return thePost
    },
    updatePost: async (root, { id, input }, { Post }) => {
        thePost = await Post.findOneAndUpdate(id, input)
        return thePost
     },
     singleUpload: async (root, { file }, {  }) => {
        
     },
}