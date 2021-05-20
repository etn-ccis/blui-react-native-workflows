/**
 * @packageDocumentation
 * @module Components
 */

import * as React from 'react';

// Components
import { Header, wrapIcon } from '@pxblue/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

// PxBlue: It is advised to always call wrapIcon() once per Icon type, and to do so outside of any methods
/**
 * @ignore
 */
const CloseIcon = wrapIcon({ IconClass: MatIcon, name: 'close' });

/**
 * @param title  The title to show in the header.
 * @param backAction  The function to handle the back action.
 */
type CloseHeaderProps = {
    title: string;
    backAction: () => void;
};

/**
 * Creates a styled header with a back button.
 *
 * @category Component
 */
export const CloseHeader: React.FC<CloseHeaderProps> = (props) => {
    const theme = useTheme();
    return (
        <Header
            title={props.title}
            navigation={{ icon: CloseIcon, onPress: props.backAction }}
            backgroundColor={theme.colors.primaryBase}
        />
    );
};
