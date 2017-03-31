# KeyStore2 [![Build Status](https://travis-ci.org/servercharlie/keystore2>.svg?branch=master)](https://travis-ci.org/servercharlie/keystore2)

> **KeyStore2** because all the first ones are inferior.

> Globally reusable value / reference storage that supports all data types. Simply put, instead of polluting your functions & promises w/ multiple arguments / single-arity functions, these **keystore2 contexts** gives your code more readability, and code reusability.

## Best use cases / works best with:
- Heavy asynchronous workloads (ie: working w/ multiple objects at the same time)
- Chained promises
- Pure functions that never sacrifices reusability.

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

_KeyStore.clearContext('myContext');
// true

_KeyStore.pullContext('myContext').get('b');
// undefined

```

**Nested contexts**

```js
const _KeyStore = require('keystore2');

_KeyStore.pullContext('myContext').pullContext('mySubContext').set('c', 789);
// true

_KeyStore.pullContext('myContext').pullContext('mySubContext').get('c');
// 789
```

**Testing w/ xo & ava**

```sh
npm install && npm test
```


## License

MIT © [servercharlie](https://github.com/servercharlie)
