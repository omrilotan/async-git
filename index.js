const list = require('./helpers/list');
const {
	branch,
	date,
	modified,
	name,
	origin,
	reset,
	show,
	tag,
	version,
} = require('./lib');

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

const lists = [
	['changed', 'git diff-tree --no-commit-id --name-only -r HEAD'],
	['staged', 'git diff --name-only --cached'],
	['unstaged', 'git diff --name-only'],
	['untracked', 'git ls-files -o --exclude-standard'],
];

const getters = Object.assign(
	{
		branch,
		date,
		name,
		origin,
		version,
	},
	...lists.map(
		([fn, value]) => ({[fn]: list.bind(null, value)}),
	),
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
 * @property {Promise<string>}   author    Author name of the last commit
 * @property {Promise<string>}   body      Most recent commit message body
 * @property {Promise<string>}   branch    Current branch name
 * @property {Promise<string>}   comitter  Comitter name of the last commit
 * @property {Promise<string>}   date      Get last author date
 * @property {Promise<string>}   email     Author email of the last commit
 * @property {Promise<string>}   message   Most recent commit full message
 * @property {Promise<string>}   name      Project name
 * @property {Promise<string>}   origin    Remote origin URL
 * @property {Promise<string>}   sha       Unique identifier of the last commit
 * @property {Promise<string>}   short     7 Character Unique identifier of the last commit
 * @property {Promise<string>}   subject   Most recent commit subject
 * @property {Promise<string>}   version   Get git version (semver)
 * @property {Promise<string[]>} changed   List of files changed in the last commit
 * @property {Promise<string[]>} staged    List of staged files
 * @property {Promise<string[]>} unstaged  List of unstaged files
 * @property {Promise<string[]>} untracked List of untracked files
 * @property {Function}          modified  Get the last modified date of a file
 * @property {Function}          reset     Reset current HEAD to the specified state
 * @property {Function}          tag       Create and push a git tag with the last commit message
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
