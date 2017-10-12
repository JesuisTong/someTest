module.exports = {
	"parser": "babel-eslint",
    "extends": "airbnb",
    "globals": {
        "React": true,
        "ReactDOM": true,
        "WPT": true,
        "$": true
    },
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
		"import/no-unresolved": [2, { ignore: [/^components/g, /^Redx/g] }],
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
	}
};