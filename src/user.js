const mongoose = require('mongoose');
const PostSchema = require('./post_schema');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  followers: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogpost'
  }],
  posts: [PostSchema]
});

UserSchema.virtual('postCount').get(function getPostCount() {
  return this.posts.length;
});

UserSchema.pre('remove', function removeBlogPosts(next) {
  const BlogPost = mongoose.model('blogpost');

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
