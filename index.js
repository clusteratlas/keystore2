'use strict';

function KeyStore2() {
	this.storage = {};
	this.contexts = {};
}

KeyStore2.prototype.set = function (_key, _value) {
	if (typeof _key === 'string') {
		this.storage[_key] = _value;
		return true;
	}
	throw new Error('string only!');
};
KeyStore2.prototype.get = function (_key) {
	if (typeof _key === 'string') {
		return this.storage[_key];
	}
	throw new Error('string only!');
};
KeyStore2.prototype.clearContext = function (_context) {
	this.contexts[_context].storage = {};
	return true;
};
KeyStore2.prototype.pullContext = function (_context) {
	if (typeof this.contexts[_context] === 'object') {
		return this.contexts[_context];
	}
	this.contexts[_context] = new KeyStore2();
	return this.contexts[_context];
};

if (typeof module !== 'undefined') {
	module.exports = KeyStore2;
}
