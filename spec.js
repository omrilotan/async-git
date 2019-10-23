
const exec = require('async-execute');
const git = require('.');

describe(`async-git (${Object.getOwnPropertyNames(git).join(', ')})`, async() => {
	let start;

	before(async() => {
		if (process.env.CI) { return; }

		start = await git.sha;
		await exec('echo "content" > fake-file.txt');
		await exec('git add .');
		await exec('git commit -m "committing all changes before tests"');
	});

	after(async() => {
		if (process.env.CI) { return; }

		await exec(`git reset ${start} --soft`);
		await exec('rm fake-file.txt');
	});

	[
		'author',
		'branch',
		'comitter',
		'email',
		'message',
		'name',
		'origin',
		'sha',
		'short',
		'subject',
		'version',
	].forEach(member => it(`${member} should retrieve a string`, async () => {
		const value = await git[member];
		expect(value).to.be.a('string');
		expect(value).to.have.lengthOf.at.least(1);
	}));

	it('body should retrieve a string, may be empty', async () => {
		const value = await git.body;
		expect(value).to.be.a('string');
	});

	it('date should retrieve a valid date', async () => {
		const date = await git.date;

		expect(date).to.be.a('date');

		const invalid = Number.isNaN(date.getTime());
		expect(invalid).to.be.false;
	});

	it('date should be in proximity to now', async () => {
		const date = await git.date;

		expect(
			date.getFullYear()
		).to.be.closeTo(
			new Date().getFullYear(),
			1
		);
	});

	it('Should get the short and long sha', async() => {
		expect(await git.sha).to.have.lengthOf(40);
		expect(await git.short).to.have.lengthOf(7);
	});

	it('Should be able to import specific getters', async () => {
		const { author } = git;
		expect(await author).to.be.a('string');
	});

	it('Should get the name of the repo', async () =>
		expect(await git.name).to.equal('async-git')
	);
});
