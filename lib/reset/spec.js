describe('async-git:reset', async() => {
	let reset;
	let exec;

	before(() => {
		delete require.cache[require.resolve('.')];
		require('async-execute');
		exec = require.cache[require.resolve('async-execute')].exports = spy();
		reset = require('.');
	});
	afterEach(() => {
		exec.resetHistory();
	});
	after(() => {
		delete require.cache[require.resolve('async-execute')];
		delete require.cache[require.resolve('.')];
	});

	it('Should only accept string as sha', async() => {
		const types = [
			null,
			122,
			[1, 2, 3],
			{a: 1},
			/regexp/,
		];
		for (let t of types) {
			try {
				await reset(t);
				assert(false, `should fail with ${t}`);
			} catch (error) {
				expect(error).to.be.instanceOf(TypeError);
			}
		}
	});

	it('Should hard reset to a given sha', async() => {
		reset('shaid');
		expect(exec.getCall(0).args[0]).to.equal('git reset shaid --hard');
	});

	it('Should hard reset to n commits back', async() => {
		reset(1);
		expect(exec.getCall(0).args[0]).to.equal('git reset HEAD~1 --hard');
	});

	it('Should hard reset to n commits back with negative value as well', async() => {
		reset(-3);
		expect(exec.getCall(0).args[0]).to.equal('git reset HEAD~3 --hard');
	});

	it('Should reset w/o hard argument', async() => {
		reset('shaid', {hard: false});
		expect(exec.getCall(0).args[0].trim()).to.equal('git reset shaid');
	});
});
