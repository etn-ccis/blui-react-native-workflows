/**
 * @packageDocumentation
 * @module Hooks
 * @internal
 */
import { useWindowDimensions } from 'react-native';

type ScreenWidthProps = {
    width: number;
    height: number;
    isTablet: boolean;
};
export const useScreenDimensions = (): ScreenWidthProps => {
    const { height, width } = useWindowDimensions();
    return {
        isTablet: width >= 768,
        width: width,
        height: height,
    };
};
