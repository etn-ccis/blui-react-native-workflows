/**
 * @packageDocumentation
 * @module Hooks
 * @internal
 */
import { useWindowDimensions } from 'react-native';

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
    const { height, width } = useWindowDimensions();
    return {
        isTablet: width >= 768,
        width: width,
        height: height,
    };
};
