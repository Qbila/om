import chalk from 'chalk';
require('env2')('./config.env');

console.log( chalk.green('Starting app in ' + process.env.NODE_ENV + ' mode') ); // eslint-disable-line no-console
