module.exports = {
    "extends": "airbnb",
    "rules": {
		"import/no-unresolved": [2, { "ignore": ["^components"] }],
		"no-undef": [2, { "document": true }],
	}
};