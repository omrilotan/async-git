const { clean } = abuser(__filename);
const modified = require('.');

describe('lib/modified', async() => {
	after(() => clean('.'));

	it('Should get the date of the last date a certain file was changes', async() => {
		const date = await modified('./index.js');

		expect(date).to.be.a('date');
	});

	it('Should throw an error when the file is not there', async() => {
		await expect(modified('./nothere.js')).to.be.rejectedWith(Error);
	});
});
