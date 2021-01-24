const { promises: { access, unlink } } = require('fs');
const wait = require('@lets/wait');
const git = require('..');

/**
 * Check if file exists
 * @param {string}
 * @returns {boolean}
 */
const exists = async path => {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
};

/**
 * Fail silently and asynchronously
 * @param {function}
 * @param {...any}
 * @returns {any}
 */
async function softly(fn, ...args) {
	try {
		return await fn(...args);
	} catch (error) {
		// ignore
	}
}

describe('vulnerabilities', async() => {
	before(async() => {
		await wait(100);
		await softly(unlink, 'HACKED');
	});
	afterEach(async() => {
		await wait(100);
		await softly(unlink, 'HACKED');
	});
	it('shell injection in reset', async() => {
		await softly(git.reset, '; touch HACKED #');
		expect(await exists('HACKED')).to.be.false;
	});
	it('shell injection in reset', async() => {
		await softly(git.reset, 'a`touch HACKED`b');
		expect(await exists('HACKED')).to.be.false;
	});
	it('shell injection in tag', async() => {
		await softly(git.tag, '; touch HACKED #');
		expect(await exists('HACKED')).to.be.false;
	});
});
