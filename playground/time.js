// Unix Timestap or Unix Epoch = 0 = January 1, 1970 00:00:00am
const moment = require('moment');

// new Date().getTime()
const someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

const createdAt = 1234;
const date = moment(createdAt);
console.log(date.format('h:mma'));
