const { clean, override } = abuser(__filename);

const diff = `
		line 1
		line 2
line 3

line 5
`;

describe('lib/changed', async() => {
	const exec = stub();
	let changed;

	before(() => {
		clean('.');
		override('async-execute', exec);
		changed = require('.');
	});
	after(() => clean('.'));

	it('Should hard reset to a given sha', async() => {
		exec.returns(diff);
		const list = await changed();
		expect(list).to.deep.equal([
			'line 1',
			'line 2',
			'line 3',
			'line 5',
		]);
	});

});
