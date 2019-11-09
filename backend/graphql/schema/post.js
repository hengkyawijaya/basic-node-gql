module.exports = `
    type Posts {
        posts: [Post!]
        total: Int
    }

    type Post {
        title: String
        body: String
        createdAt: Date
        updatedAt: Date
    }

    input inputPost {
        title: String
        body: String
    }
`