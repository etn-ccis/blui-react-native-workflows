/**
 * Check if the project has been moved out of
 */

const path = require('path');

const isInModuleFunc = () => {
    try {
        const potentialPackage = path.resolve(__dirname + '/../package.json');
        const parentPackage = require(potentialPackage);
        return parentPackage.name === '@etn-sst/react-native-auth-ui';
    } catch {
        // The example has been moved out of the npm, use the normal imported package
        return false;
    }
};

module.exports = isInModuleFunc();
