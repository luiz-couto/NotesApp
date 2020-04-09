const chalk = require('chalk');
const getNotes =  require('./notes');

console.log(getNotes());
console.log(chalk.bold.green.inverse('Sucess!'));


