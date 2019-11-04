const exec = require('async-execute');

/**
 * List of files changed in the last commit
 * @return {string[]}
 */
module.exports = async function changed() {
	const output = await exec('git diff-tree --no-commit-id --name-only -r HEAD');

	return output
		.split('\n')
		.map(
			item => item.trim(),
		)
		.filter(Boolean);
};
