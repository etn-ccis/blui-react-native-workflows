module.exports = {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-react', '@babel/preset-typescript'],
    // react-native-reanimated/plugin must be listed last
    plugins: [
        'react-native-reanimated/plugin',
        'module:react-native-dotenv',
        '@babel/plugin-transform-modules-commonjs',
        ['@babel/plugin-transform-private-methods', { loose: true }],
        ['@babel/plugin-transform-class-properties', { loose: true }],
        ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ],
};
