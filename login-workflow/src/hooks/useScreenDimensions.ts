/**
 * @packageDocumentation
 * @module Hooks
 * @internal
 */
import { Dimensions } from 'react-native';

type ScreenDimensionsProps = {
    width: number;
    height: number;
    isTablet: boolean;
};

/**
 * Hook used to identify whether an app is run on a tablet and to get the app window's width and height.
 *
 * @category Hook
 */
export const useScreenDimensions = (): ScreenDimensionsProps => {
    const { height, width } = Dimensions.get('screen');
    return {
        isTablet: width >= 768,
        width: width,
        height: height,
    };
};
