/**
 * @packageDocumentation
 * @module Hooks
 * @internal
 */

/**
 * @packageDocumentation
 * @module Hooks
 * @internal
 */

import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useScreenWidth = (): boolean => {
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', () => {
            setWindowWidth(Dimensions.get('window').width);
        });
        return () => subscription?.remove();
    }, []);
    return windowWidth >= 600 ? true : false;
};
