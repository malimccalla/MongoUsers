const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const user = new User({ name: 'Mali', age: 23 });
    user.save()
      .then(() => {
        assert(!user.isNew); // user.isNew === false (has been saved)
        done();
      });
  });
});
