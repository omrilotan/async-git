# async-git [![](https://img.shields.io/npm/v/async-git.svg)](https://www.npmjs.com/package/async-git) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/async-git) [![](https://circleci.com/gh/omrilotan/async-git.svg?style=svg)](https://circleci.com/gh/omrilotan/async-git)

## 👾 Retrieve data from current git repository

\* Getter properties are async (getters) [more on async properties](https://medium.com/@omrilotan/javascript-async-variables-686dc5f03cb2)

```js
const git = require('async-git');

`${await git.author} committed ${await git.message}` // Omri committed Some changes
```

## Getters

| Property | Type | Description | Example
| - | - | - | -
| `author` | string | Author name of the last commit | `await git.author`
| `body` | string | Most recent commit message body | `await git.body`
| `branch` | string | Current branch name | `await git.branch`
| `comitter` | string | Comitter name of the last commit | `await git.comitter`
| `date` | Date | Date of the last change | `await git.date`
| `email` | string | Author email of the last commit | `await git.email`
| `message` | string | Most recent commit full message (subject and body) | `await git.message`
| `name` | string | Project name | `await git.name`
| `sha` | string | Unique identifier of the last commit | `await git.sha`
| `short` | string | 7 Character Unique identifier of the last commit | `await git.short`
| `subject` | string | Most recent commit subject | `await git.subject`

## Functions

### `modified`
Get the last modified date of a file
```js
await modified('./index.js')
```

| Argument | Return value
| - | -
| `{string}` Path to file | `{Date}` Last modified date

### `reset`
Reset current HEAD to the specified state
```js
await git.reset('f5db755')
```

| Argument | Return value
| - | -
| `{string}` State ID | `{void}` nothing

### `tag`
Create a tag using the last commit message
```js
await git.tag('1.2.3')
```

| Argument | Return value
| - | -
| `{string}` Version | `{void}` nothing
