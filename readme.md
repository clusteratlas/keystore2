# KeyStore2 [![Build Status](https://travis-ci.org/servercharlie/keystore2>.svg?branch=master)](https://travis-ci.org/servercharlie/keystore2)

> yesh


## Install

```
$ npm install --save keystore2
```


## Usage

**Basics**

```js
const _KeyStore = require('keystore2');

_KeyStore.set('a', 123);
// true

_KeyStore.get('a');
// 123
```

**Using contexts**

```js
const _KeyStore = require('keystore2');

_KeyStore.pullContext('myContext').set('b', 456);
// true

_KeyStore.pullContext('myContext').get('b');
// 456
```

**Nested contexts**

```js
const _KeyStore = require('keystore2');

_KeyStore.pullContext('myContext').pullContext('mySubContext').set('b', 789);
// true

_KeyStore.pullContext('myContext').pullContext('mySubContext').get('b');
// 789
```

**Testing w/ xo & ava**

```sh
npm install && npm test
```


## License

MIT © [servercharlie](https://github.com/servercharlie)
