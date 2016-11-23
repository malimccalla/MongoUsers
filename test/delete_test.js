const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let mali;

  beforeEach((done) => {
    mali = new User({ name: 'Mali' });
    mali.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    mali.remove()
      .then(() => User.findOne({ name: 'Mali' })
      .then((user) => {
        assert(user === null);
        done();
      }));
  });

  it('class method remove', (done) => {
    User.remove({ name: 'Mali' })
      .then(() => User.findOne({ name: 'Mali' })
      .then((user) => {
        assert(user === null);
        done();
      }));
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Mali' })
      .then(() => User.findOne({ name: 'Mali' })
      .then((user) => {
        assert(user === null);
        done();
      }));
  });

  it('class method findByIdAndRemove', (done) => {
    User.findOneAndRemove(mali.id)
      .then(() => User.findOne({ name: 'Mali' })
      .then((user) => {
        assert(user === null);
        done();
      }));
  });
});
