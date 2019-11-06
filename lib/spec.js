const inedx = require('index-require');
const lib = require('.');

describe('lib', () => {
	Object.entries(inedx(__dirname)).forEach(
		([key, value]) => it(
			`should expose ${key} function`,
			() => expect(lib[key]).to.equal(value),
		),
	);
});

