const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
  it('postCount returns number of posts', (done) => {
    const mali = new User({
      name: 'Mali',
      posts: [{ title: 'Post Title' }]
    });

    mali.save()
      .then(() => User.findOne({ name: 'Mali' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
