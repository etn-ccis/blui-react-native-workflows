// eslint-disable-next-line no-undef

const path = require('path');
const potentialSrc = path.resolve(__dirname + '/../src');
const potentialAssets = path.resolve(potentialSrc + '/assets/fonts/');

const isInModule = require('./checkIfMovedOutOfModule');

let assets = [];
let dependencies = {};

if (isInModule) {
    dependencies = {
        '@etn-sst/react-native-auth-ui': {
            root: potentialSrc,
        },
    };
    assets = [potentialAssets];
}

module.exports = {
    project: {
        ios: {},
        android: {}, // grouped into "project"
    },
    assets: assets, // stays the same
    dependencies: dependencies,
};
