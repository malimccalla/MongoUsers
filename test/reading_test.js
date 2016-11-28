const assert = require('assert');
const User = require('../src/user');

describe('Reading users from database', () => {
  let mali;
  let joe;
  let jane;
  let john;

  beforeEach((done) => {
    mali = new User({ name: 'Mali' });
    joe = new User({ name: 'Joe' });
    jane = new User({ name: 'Jane' });
    john = new User({ name: 'John' });
    Promise.all([
      mali.save(),
      jane.save(),
      joe.save(),
      john.save()
    ]).then(() => done());
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

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        done();
      });
  });
});
