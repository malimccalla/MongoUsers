const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let mali;

  beforeEach((done) => {
    mali = new User({ name: 'Mali' });
    mali.save()
      .then(() => done());
  });

  function assertDeletion(operation, done) {
    operation
      .then(() => User.findOne({ name: 'Mali' })
      .then((user) => {
        assert(user === null);
        done();
      }));
  }

  it('model instance remove', (done) => {
    assertDeletion(mali.remove(), done);
  });

  it('class method remove', (done) => {
    assertDeletion(User.remove({ name: 'Mali' }), done);
  });

  it('class method findAndRemove', (done) => {
    assertDeletion(User.findOneAndRemove({ name: 'Mali' }), done);
  });

  it('class method findByIdAndRemove', (done) => {
    assertDeletion(User.findOneAndRemove(mali.id), done);
  });
});
