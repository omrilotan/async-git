const { clean, override } = abuser(__filename);

describe('lib/version', async() => {
	const exec = stub();
	let version;

	before(() => {
		clean('.');
		override('async-execute', exec);
		version = require('.');
	});
	after(() => clean('.'));

	it('Should hard reset to a given sha', async() => {
		exec.returns('git version 2.3.4');
		expect(await version()).to.equal('2.3.4');
	});
});
