module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'prettier', 'plugin:sonarjs/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', 'sonarjs'],
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
		'react/no-unescaped-entities': 'off',
		'react/prop-types': 'off',
	},
};
