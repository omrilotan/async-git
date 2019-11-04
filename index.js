const branch = require('./lib/branch');
const changed = require('./lib/changed');
const date = require('./lib/date');
const modified = require('./lib/modified');
const name = require('./lib/name');
const origin = require('./lib/origin');
const reset = require('./lib/reset');
const show = require('./lib/show');
const tag = require('./lib/tag');
const version = require('./lib/version');

const formats = [
	['author'  , 'an'],
	['body'    , 'b' ],
	['comitter', 'cn'],
	['email'   , 'ae'],
	['message' , 'B' ],
	['sha'     , 'H' ],
	['short'   , 'h' ],
	['subject' , 's' ],
];

const getters = Object.assign(
	{
		branch,
		changed,
		date,
		name,
		origin,
		version,
	},
	...formats.map(
		([key, value]) => ({[key]: show.bind(null, value)}),
	),
);

const functions = {
	modified,
	reset,
	tag,
};

/**
 * @typedef     asyncGit
 * @description Get git info
 * @type     {Object}
 * @property {Promise<String>} author   Author name of the last commit
 * @property {Promise<String>} body     Most recent commit message body
 * @property {Promise<String>} branch   Current branch name
 * @property {Promise<Array>}  changed  List of files changed in the last commit
 * @property {Promise<String>} comitter Comitter name of the last commit
 * @property {Promise<String>} date     Get last author date
 * @property {Promise<String>} email    Author email of the last commit
 * @property {Promise<String>} message  Most recent commit full message
 * @property {Promise<String>} name     Project name
 * @property {Promise<String>} origin   Remote origin URL
 * @property {Promise<String>} sha      Unique identifier of the last commit
 * @property {Promise<String>} short    7 Character Unique identifier of the last commit
 * @property {Promise<String>} subject  Most recent commit subject
 * @property {Promise<String>} version  Get git version (semver)
 * @property {Function}        modified Get the last modified date of a file
 * @property {Function}        reset    Reset current HEAD to the specified state
 * @property {Function}        tag      Create and push a git tag with the last commit message
 */
Object.defineProperties(
	module.exports,
	Object.assign(
		Object.entries(getters).reduce(
			(props, [key, value]) => Object.assign(
				props,
				{
					[key]: {
						get: value,
						configurable: true,
					},
				},
			),
			{},
		),
		Object.entries(functions).reduce(
			(props, [key, value]) => Object.assign(
				props,
				{
					[key]: {
						value,
						configurable: true,
					},
				},
			),
			{},
		),
	),
);
