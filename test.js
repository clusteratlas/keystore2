import test from 'ava';
import KeyStore2 from '.';

const _KeyStore = new KeyStore2();

test('set & get', t => {
	_KeyStore.set('a', 1);

	t.is(_KeyStore.get('a'), 1);
});

test('has the fucking value / has(existing_key) = true ', t => {
	t.is(_KeyStore.has('a'), true);
});

test('does not have the fucking value / has(missing_key) = false ', t => {
	t.is(_KeyStore.has('zxvczxvc'), false);
});

test('string keys only for set.', t => {
	var hasError = false;
	try {
		_KeyStore.set([1, 2], 1);
	} catch (err) {
		hasError = true;
	}
	t.is(hasError, true);
});

test('string keys only for get.', t => {
	var hasError = false;
	try {
		_KeyStore.get([1, 2]);
	} catch (err) {
		hasError = true;
	}
	t.is(hasError, true);
});

test('context set sample value', t => {
	t.is(_KeyStore.pullContext('sample context').set('a', 1), true);
});

test('context get sample value', t => {
	t.is(_KeyStore.pullContext('sample context').get('a'), 1);
});

test('context clear', t => {
	_KeyStore.clearContext('sample context');
	t.is(_KeyStore.pullContext('sample context').get('a'), undefined);
});

test('random context test', t => {
	var randomContext = _KeyStore.pullRandomContext();
	var randomContextId = randomContext.id;
	randomContext.set('a', 5);
	var randomContextCheck = false;
	if (_KeyStore.pullContext(randomContextId).get('a') === 5) {
		randomContextCheck = true;
	}
	t.is(randomContextCheck, true);
});

test('nested random context test', t => {
	var randomContext = _KeyStore.pullRandomContext();
	var randomContextId = randomContext.id;
	randomContext.set('a', 5);
	var randomContextCheck = false;
	if (_KeyStore.pullContext(randomContextId).get('a') === 5) {
		randomContextCheck = true;
	}
	var nestedRandomContext = randomContext.pullRandomContext();
	var nestedRandomContextId = nestedRandomContext.id;
	nestedRandomContext.set('b', 10);
	var nestedRandomContextCheck = false;
	if (randomContext.pullContext(nestedRandomContextId).get('b') === 10) {
		nestedRandomContextCheck = true;
	}
	t.is(randomContextCheck && nestedRandomContextCheck, true);
});
