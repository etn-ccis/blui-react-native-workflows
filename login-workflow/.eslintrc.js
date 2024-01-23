module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['@brightlayer-ui/eslint-config/tsx'],
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['react-hooks'],
    rules: {
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'react/display-name': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            },
            {
                selector: 'property',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            },
            {
                selector: 'property',
                format: null,
                modifiers: ['requiresQuotes'],
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE'],
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'import',
                format: ['camelCase', 'PascalCase'],
            },
        ],
    },
};
