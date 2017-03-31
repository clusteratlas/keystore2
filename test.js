import test from 'ava';
import KeyStore2 from '.';

const _KeyStore = new KeyStore2();

test('set & get', t => {
	_KeyStore.set('a', 1);

	t.is(_KeyStore.get('a'), 1);
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
