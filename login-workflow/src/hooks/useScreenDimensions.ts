/**
 * @packageDocumentation
 * @module Hooks
 * @internal
 */

import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

type ScreenWidthProps = {
    width: number;
    height: number;
    isTablet: boolean;
};
export const useScreenDimensions = (): ScreenWidthProps => {
    const { height: initialHeight, width: initialWidth } = Dimensions.get('window');
    const [windowWidth, setWindowWidth] = useState(initialWidth);
    const [windowHeight, setWindowHeight] = useState(initialHeight);
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', () => {
            const { height, width } = Dimensions.get('window');
            setWindowWidth(height);
            setWindowHeight(width);
        });
        return () => subscription?.remove();
    }, []);
    return {
        isTablet: windowWidth >= 768,
        width: windowWidth,
        height: windowHeight,
    };
};
