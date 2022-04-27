/**
 * @packageDocumentation
 * @module Components
 */

import * as React from 'react';

// Components
import { Header, IconFamily } from '@brightlayer-ui/react-native-components';
import { useTheme } from 'react-native-paper';
import * as Colors from '@brightlayer-ui/colors';

const CloseIcon: IconFamily = { name: 'close' };

/**
 * @param title  The title to show in the header.
 * @param backAction  The function to handle the back action.
 * @param backgroundColor  A custom background color to override the default
 */
type CloseHeaderProps = {
    title: string;
    backAction: () => void;
    backgroundColor?: string;
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
            icon={CloseIcon}
            onIconPress={props.backAction}
            backgroundColor={
                props.backgroundColor ||
                (theme.dark
                    ? Colors.black[800]
                    : (theme.dark ? theme.colors.actionPalette.active : theme.colors.primary) || theme.colors.primary)
            }
        />
    );
};
