const exec = require('async-execute');

/**
 * Get repository name
 * @return {Promise<String>}
 */
module.exports = exec.bind(null, 'git remote get-url origin');
