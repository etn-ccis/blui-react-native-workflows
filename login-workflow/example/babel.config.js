module.exports = {
    presets: ['module:@react-native/babel-preset'],
    // react-native-reanimated/plugin must be listed last
    plugins: ['react-native-reanimated/plugin', 'module:react-native-dotenv'],
};
