require('mocha-setup');

// Your other things
process.on('unhandledRejection', error => { throw error; });
