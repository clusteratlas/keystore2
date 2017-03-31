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

**Real-world example**

```js
const gulp		= require('gulp');
const _KeyStore = require('keystore2');

function FirstPromise(_context){

	var _KeyStoreContext = _KeyStore.pullContext(_context);
	
	return new Promise(function(resolve, reject){
	
		// promise chain ejecting if context-based error is present
		if(typeof _KeyStoreContext.get('error') == 'undefined'){
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

**Testing w/ xo & ava**

```sh
npm install && npm test
```


## License

MIT © [servercharlie](https://github.com/servercharlie)
