# KeyStore2 [![Build Status](https://travis-ci.org/servercharlie/keystore2>.svg?branch=master)](https://travis-ci.org/servercharlie/keystore2)

> Globally reusable value / reference storage that supports all data types; and **2** because all the first ones are inferior.

> Simply put, instead of polluting your functions & promises w/ multiple arguments / single-arity functions, these **keystore2 contexts** gives your code more readability, and code reusability.

## Best use cases / works best with:
- Heavy asynchronous workloads (ie: working w/ multiple objects at the same time)
- Chained promises
- Pure functions that never sacrifices reusability.

## Install

```
$ npm install --save keystore2

$ npm update
# updating an old version installed
```

## Usage

**Basics**

```js
const KeyStore	= require('keystore2');

var _KeyStore	= new KeyStore();

_KeyStore.set('a', 123);
// true

_KeyStore.get('a');
// 123

_KeyStore.has('a');
// true

_KeyStore.has('b');
// false

```

**Using contexts**

```js
const KeyStore	= require('keystore2');

var _KeyStore	= new KeyStore();

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
const KeyStore	= require('keystore2');

var _KeyStore	= new KeyStore();

_KeyStore.pullContext('myContext').pullContext('mySubContext').set('c', 789);
// true

_KeyStore.pullContext('myContext').pullContext('mySubContext').get('c');
// 789
```

**Random contexts** (Added in 1.1.0)

```js
const KeyStore	= require('keystore2');

var _KeyStore	= new KeyStore();

var randomContext = _KeyStore.pullRandomContext();

randomContext.id;
// uuidv4 random id, like '0b99b82f-62cf-4275-88b3-de039020f14e'

randomContext.set('a', 5);
// true

randomContext.get('a');
// 5

// Random contexts can also be nested!

randomContext.pullContext('nestedInRandom').set('c', 123);
// true

randomContext.pullContext('nestedInRandom').get('c');
// 123

```

**Real-world example**

```js
const gulp = require('gulp');
const KeyStore	= require('keystore2');

var _KeyStore	= new KeyStore();

function FirstPromise(_context){

	var _KeyStoreContext = _KeyStore.pullContext(_context);
	
	return new Promise(function(resolve, reject){
	
		// promise chain ejecting if context-based error is present
		if(_KeyStoreContext.has('error') === true){
			reject(_context);
		}
		
		// some tasks..
		var _someKey = _KeyStoreContext.get('someKey');
		
		// on success
		_KeyStoreContext.set('newKey', 'sampleStringValue');
		resolve(_context);
		
		// OR
		
		// on failure:
		reject('some error message');
		
		// or this, if you wanna store it in the context.
		_KeyStoreContext.set('error', 'some error message.');
		reject(_context);
		
	});
	
}

// function SecondPromise...

// function ThirdPromise...

gulp.task(`test`, () => {
	return FirstPromise('myContext')
		.then((_context)=>SecondPromise(_context))
			.catch((err)=>{throw new Error(err);})
		.then((_context)=>ThirdPromise(_context))
			.catch((err)=>{throw new Error(err);});
});
```

**Notes, References, Todo's, etc.**
- Changelog:
	- 1.1.0
		- keystore.pullRandomContext()
			- creates a uuidv4-based randomized context.
		- keystore.pullRandomContext().id
			- 'id' retrieves the generated UUIDv4 for the random context.
		- nested random contexts
			- random contexts can be nested just like pulled contexts
		- keystore.has(key)
			- to check if key is set, returns true or false.
		- readme updates
			- lol
- Todo's:
	- Context & Key Storage Adapters, ie, using redis or other remote cache microservices.
- References:
	- Jed's UUIDv4 Implementation, used in randomized context implementation.
		- https://www.npmjs.com/package/uuid-random
	- Mozilla Developer Network, for all the inner-workings.
		- https://developer.mozilla.org/en-US/docs/Web/JavaScript
	- XO for linting
		- https://github.com/sindresorhus/xo
	- AVA for testing
		- https://github.com/avajs/ava

**Testing w/ xo & ava**

```sh
npm install && npm test
```


## License

MIT © [servercharlie](https://github.com/servercharlie)
