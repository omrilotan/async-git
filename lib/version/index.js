const exec = require('async-execute');

/**
 * Get repository name
 * @return {Promise<String>}
 */
module.exports = async () => (await exec('git version')).split(' ').pop();
