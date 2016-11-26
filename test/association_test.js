const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');


describe('Associations', () => {
  let mali;
  let blogpost;
  let comment;

  beforeEach((done) => {
    mali = new User({ name: 'Mali' });
    blogpost = new BlogPost({ title: 'New Post', content: 'This is content' });
    comment = new Comment({ content: 'This is a comment' });

    mali.blogPosts.push(blogpost);
    blogpost.comments.push(comment);
    comment.user = mali;

    Promise.all([mali.save(), blogpost.save(), comment.save()])
      .then(() => done());
  });

  it.only('saves a realtation between a user and a blog post', (done) => {
    User.findOne({ name: 'Mali' })
      .populate('blogPosts') // the property on user
      .then((user) => {
        console.log(user);
        done();
      });
  });
});
