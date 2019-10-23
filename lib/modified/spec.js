let modified;

describe('async-git:modified', async() => {

	before(() => {
		delete require.cache[require.resolve('.')];
		delete require.cache[require.resolve('async-execute')];
		modified = require('.');
	});

	it('Should get the date of the last date a certain file was changes', async() => {
		const date = await modified('./index.js');

		expect(date).to.be.a('date');
	});

	it('Should throw an error when the file is not there', async() => {
		await expect(modified('./nothere.js')).to.be.rejectedWith(Error);
	});
});
