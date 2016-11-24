const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const mali = new User({
      name: 'Mali',
      posts: [{ title: 'JS world' }]
    });

    mali.save()
      .then(() => User.findOne({ name: 'Mali' }))
      .then((user) => {
        assert(user.posts[0].title === 'JS world');
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    const mali = new User({
      name: 'Mali',
      posts: []
    });

    mali.save()
      .then(() => User.findOne({ name: 'Mali' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Mali' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an exisiting subdocument', (done) => {
    const mali = new User({
      name: 'Mali',
      posts: [{ title: 'Old Post' }]
    });

    mali.save()
      .then(() => User.findOne({ name: 'Mali' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Mali' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
