import React from 'react';
import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

// https://github.com/ProminentEdge/mobile-boilerplate/blob/master
const url = 'http://localhost';

const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url });
const { window } = jsdom;

function copyProps(src, target) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target),
    });
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);

Enzyme.configure({ adapter: new Adapter() });

const originalConsoleError = console.error;
console.error = (message) => {
    // see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
    // see https://github.com/Root-App/react-native-mock-render/issues/6
    if (message.startsWith('Warning:')) {
        return;
    }

    originalConsoleError(message);
};
