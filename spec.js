const exec = require('async-execute');

const { clean } = abuser(__filename);
let git;

const is = Object.defineProperty(
	{},
	'ci',
	{
		get: () => process.env.CI || process.env.GITHUB_WORKSPACE,
	},
);

describe('async-git', async() => {
	let start;

	before(async() => {
		clean('.');
		clean('./lib');
		git = require('.');

		if (is.ci) { return; }

		start = await git.sha;
		await exec('echo "content" > fake-file.txt');
		await exec('git add .');
		await exec('git commit -m "committing all changes before tests"');
		await exec('echo "content" > unadded.txt');
	});

	after(async() => {
		clean('.');

		if (is.ci) { return; }

		await exec(`git reset ${start} --soft`);
		await exec('rm unadded.txt');
		await exec('rm fake-file.txt');
		await exec('git add fake-file.txt');
	});

	[
		'author',
		'branch',
		'comitter',
		'email',
		'message',
		'name',
		'origin',
		'owner',
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
			date.getFullYear(),
		).to.be.closeTo(
			new Date().getFullYear(),
			1,
		);
	});

	it('Should hard reset to a given sha', async() => {
		const semver = await git.version;
		const parts = semver.split('.');

		expect(parts).to.have.lengthOf(3);
		parts.forEach(
			part => expect(part == parseInt(part)).to.be.true,
		);
	});

	[
		'changed',
		'staged',
		'tags',
		'untracked',
	].forEach(member => it(`${member} should retrieve an array`, async () => {
		const value = await git[member];
		expect(value).to.be.an('array');
		expect(value).to.have.lengthOf.at.least(1);
	}));

	it('changed should retrieve an array of strings', async () => {
		const value = await git.changed;
		expect(value).to.be.an('array');
		value.forEach(
			file => expect(file).to.be.a('string'),
		);
	});

	// Functions

	it('Should get the short and long sha', async() => {
		expect(await git.sha).to.have.lengthOf(40);
		expect(await git.short).to.have.lengthOf(7);
	});

	it('Should be able to import specific getters', async () => {
		const { author } = git;
		expect(await author).to.be.a('string');
	});

	it('Should get the name of the repo', async () =>
		expect(await git.name).to.equal('async-git'),
	);
});
