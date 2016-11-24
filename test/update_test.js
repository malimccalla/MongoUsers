const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let mali;

  beforeEach((done) => {
    mali = new User({ name: 'Mali', followers: 0 });
    mali.save()
      .then(() => {
        done();
      });
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Olivia');
        done();
      });
  }

  it('instance type using set n save', (done) => {
    mali.set('name', 'Olivia');
    assertName(mali.save(), done);
  });

  it('model instance can update', (done) => {
    assertName(mali.update({ name: 'Olivia' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Mali' }, { name: 'Olivia' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Mali' }, { name: 'Olivia' }),
      done
    );
  });

  it('A model class can find by Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(mali.id, { name: 'Olivia' }),
      done
    );
  });

  it('Increments a users followers count by 1', (done) => {
    User.update({ name: 'Mali' }, { $inc: { followers: 1 } })
      .then(() => User.findOne({ name: 'Mali' }))
      .then((user) => {
        assert(user.followers === 1);
        done();
      });
  });
});
