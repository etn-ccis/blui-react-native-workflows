module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    // extends: ['@brightlayer-ui/eslint-config/tsx'],
    extends: '@react-native',
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {},
};
