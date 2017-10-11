module.exports = {
    "extends": "airbnb",
    "rules": {
		"import/no-unresolved": [2, { "ignore": ["^components", "^Redx"] }],
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
	}
};