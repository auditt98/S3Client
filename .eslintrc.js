module.exports = {
	env: {
		browser: true,
		es2021: true,
		es6: true,
	},
	extends: ['plugin:react/recommended', 'eslint:recommended', 'prettier', 'plugin:sonarjs/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		allowImportExportEverywhere: true,
		sourceType: 'module',
	},
	plugins: ['react', 'sonarjs', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				printWidth: 120,
				trailingComma: 'es5',
				semi: true,
				jsxSingleQuote: true,
				singleQuote: true,
				useTabs: true,
				endOfLine: 'auto',
			},
		],
		'sonarjs/no-identical-expressions': 'warn',
		'sonarjs/cognitive-complexity': 'warn',
		'sonarjs/no-duplicate-string': 'warn',
		'react/prop-types': 'warn',
		'no-unused-vars': 'warn',
		'no-undef': 1,
	},
};
