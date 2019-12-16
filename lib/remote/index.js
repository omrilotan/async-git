const exec = require('async-execute');

module.exports = async function remote() {
	const origin = await exec('git config --get remote.origin.url');
	const [ match ] = origin.replace(/\.git$/, '').match(/[\w-]*\/[\w-]+/) || [];

	if (!match) {
		return null;
	}

	console.log(match.split('/').reverse());

	const [ repo, user ] = match.split('/').reverse();

	return { repo, user };
}


