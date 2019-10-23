const globals = require('mocha-setup/globals');

module.exports = {
	extends: [
		'@omrilotan'
	],
	overrides: [
		{
			files: [ "**/spec.js" ],
			globals
		}
	]
};

