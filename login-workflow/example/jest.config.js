module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
        'node_modules/(?!(|react-native|@react-native/*|@brightlayer-ui/react-native-components|react-native-animatable|react-native-reanimated|react-native-iphone-x-helper|react-native-collapsible|@react-native/polyfills|react-native-status-bar-height/*)/)',
    ],
    setupFiles: ['./jestSetupFile.js', './node_modules/react-native-gesture-handler/jestSetup.js'],
    moduleNameMapper: {
        '\\.svg': '<rootDir>/__mocks__/svgMock.js',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '\\.(css|less)$': 'identity-obj-proxy',
    },
};
