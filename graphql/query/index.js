
module.exports = {
    getPosts: async (root, { page, limit }, { Post }) => {
       thePosts = await Post.paginate({  }, { page, limit })
       return {
           posts: thePosts.docs,
           total: thePosts.total,
       }
    },
    getPost: async (root, { id }, { Post }) => {
        thePost = await Post.findOne({ id: id  })
        return thePost
     }
}