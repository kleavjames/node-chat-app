[{
  id: 'sd2asdas',
  name: 'Kleavant',
  room: 'Node Course Room'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    // return user that was removed
    let removed;

    this.users = this.users.filter(user => {
      if (user.id === id) {
        removed = user;
        return false;
      }
      return true;
    });

    return removed;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList(room) {
    const users = this.users.filter((user) => user.room === room);
    const namesArr = users.map((user) => user.name);

    return namesArr;
  }
}

module.exports = { Users };

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }

// const me = new Person('Kleavant', 25);
// const description = me.getUserDescription();
// console.log(description);