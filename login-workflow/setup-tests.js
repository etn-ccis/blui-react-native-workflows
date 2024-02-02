import React from 'react';
import 'react-native';
import '@testing-library/react-native';
import 'jest';

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
