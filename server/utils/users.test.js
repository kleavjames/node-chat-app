const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'John',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Sarah',
      room: 'Angular Course'
    }, {
      id: '3',
      name: 'Jane',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Kleavant',
      room: 'Node Course'
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove the user', () => {
    const userId = '1';
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove the user', () => {
    const userId = '6';
    const user = users.removeUser(userId);

    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });

  it('should find the user', () => {
    const userId = '1';
    const user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find the user', () => {
    const userId = '15';
    const user = users.getUser(userId);

    expect(user).toBeUndefined();
  });

  it('should return names for a specific room', () => {
    const userList = users.getUserList('Node Course');

    expect(userList).toEqual(['John', 'Jane']);
  })
});