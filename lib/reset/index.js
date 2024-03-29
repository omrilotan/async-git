const spawn = require('../../helpers/spawn');

/**
 * Reset current HEAD to the specified state
 * @param  {String|Number}  destination
 * @param  {Boolean} options.hard
 * @return {void}
 */
module.exports = async function(destination, { hard = true } = {}) {
	if (destination && typeof destination === 'string') {
		return await spawn(`reset ${destination} ${hard ? '--hard' : ''}`);
	}

	if (destination && typeof destination === 'number') {
		return await spawn(`reset HEAD~${Math.abs(destination)} ${hard ? '--hard' : ''}`);
	}

	throw new TypeError(`No case for handling destination ${destination} (${typeof destination})`);
};
