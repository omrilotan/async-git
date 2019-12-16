const { clean, override } = abuser(__filename);


describe('lib/remote', () => {
	afterEach(() => {
		clean('.');
		clean('async-execute');
	});

	[
		'git@github.com:repo_owner1/repo-name.git',
		'https://github.com/repo_owner1/repo-name.git',
		'https://username@bitbucket.org/repo_owner1/repo-name.git',
		'git@bitbucket.org:repo_owner1/repo-name.git',
		'git@gitlab.com:repo_owner1/repo-name.git',
		'https://gitlab.com/repo_owner1/repo-name.git',
	].forEach(
		format => it(`should find user and repo name in ${format}`, async () => {
			override('async-execute', () => format);

			const remote = require('.');
			const { user, repo } = await remote(format);
			expect(user).to.equal('repo_owner1');
			expect(user).to.equal('repo-name');
		})
	);
});
