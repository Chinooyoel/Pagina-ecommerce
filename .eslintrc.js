module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
		'node': true
	},
	"parser": "@typescript-eslint/parser",
	"plugins": [
	  "@typescript-eslint"
	],
	"extends": [
	  "eslint:recommended",
	  "plugin:@typescript-eslint/eslint-recommended",
	  "plugin:@typescript-eslint/recommended"
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
