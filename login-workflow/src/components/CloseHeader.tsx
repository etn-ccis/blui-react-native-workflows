/**
 * @packageDocumentation
 * @module Components
 */

import * as React from 'react';

// Components
import { Header, wrapIcon } from '@pxblue/react-native-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

// PxBlue: It is advised to always call wrapIcon() once per Icon type, and to do so outside of any methods
/**
 * @ignore
 */
const CloseIcon = wrapIcon({ IconClass: Icon, name: 'close' });

/**
 * @param title  The title to show in the header.
 * @param backAction  The function to handle the back action.
 */
type CloseHeaderProps = {
    title: string;
    backAction: Function;
};

/**
 * Creates a styled header with a back button.
 *
 * @category Component
 */
export function CloseHeader(props: CloseHeaderProps): JSX.Element {
    return <Header title={props.title} navigation={{ icon: CloseIcon, onPress: props.backAction }} />;
}

export default CloseHeader;
