const assert = require('assert');
const User = require('../src/user');

describe('Reading users from database', () => {
  let mali;

  beforeEach((done) => {
    mali = new User({ name: 'Mali', age: 23 });
    mali.save()
      .then(() => done());
  });

  it('finds all users with a name of Mali', (done) => {
    User.find({ name: 'Mali' })
      .then((users) => {
        assert(users[0].id.toString === mali.id.toString);
        done();
      });
  });

  it('finds a user with a particular id', (done) => {
    User.findOne({ _id: mali.id })
      .then((user) => {
        assert(user.name === 'Mali');
        done();
      });
  });
});
