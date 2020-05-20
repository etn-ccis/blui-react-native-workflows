/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
/**
 * Maps @etn-sst/react-native-auth-ui to the source folder for testing development of react-native-auth-ui.
 * If the examples folder is moved out of the react-native-auth-ui repository, prefers use of npm.
*/

let extraNodeModules = {};
let watchFolders = [];
let blackListWithModule = undefined;
const isInModule = require('./checkIfMovedOutOfModule');

if (isInModule) {
    extraNodeModules = {
        '@etn-sst/react-native-auth-ui': path.resolve(__dirname + '/../src'),
    };
    watchFolders = [path.resolve(__dirname + '/../src')];
    let blackListRegex = /.*[\/\\]node_modules[/\\]@etn-sst[/\\].*/;
    blackListWithModule = blacklist([blackListRegex]);
}

module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    resolver: {
        blacklistRE: blackListWithModule,
        extraNodeModules: new Proxy(extraNodeModules, {
            get: (target, name) =>
                // Redirects dependencies
                name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
        }),
    },
    watchFolders,
};
