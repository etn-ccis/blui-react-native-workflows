import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

/**
 * THIS IS A MOCK IMPLEMENTATION FOR TESTING PURPOSES
 */
export const WorkflowCardHeader: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { isTablet } = useScreenDimensions();

    return <View style={{ backgroundColor: 'red', height: isTablet ? 56 : 56 + insets.top }} />;
};
