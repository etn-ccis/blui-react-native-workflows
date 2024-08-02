module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    // react-native-reanimated/plugin must be listed last
    plugins: ['react-native-reanimated/plugin', 'module:react-native-dotenv', '@babel/plugin-transform-modules-commonjs',],
};
