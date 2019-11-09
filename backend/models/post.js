const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
      type: String,
  },
  body: {
    type: String,
  },
  deletedAt: {
    type: Date
  },
}, {
  timestamps: true
})

PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;