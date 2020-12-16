/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

// Styles
import * as Colors from '@pxblue/colors';
import { Subtitle2 } from '@pxblue/react-native-components';

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        itemContainer: {
            // paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        text: {
            paddingLeft: 10,
        },
    });

/**
 * @param isChecked  If the requirement is met / a check mark is shown.
 * @param text  The text to show next to the check mark.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type RequirementCheckProps = {
    isChecked: boolean;
    text: string;
    theme?: ReactNativePaper.Theme;
};

/**
 * Creates a component consisting of a check mark and a string next to it.
 * Will be colored if checked and grayed out if not.
 *
 * @category Component
 */
export const RequirementCheck: React.FC<RequirementCheckProps> = (props) => {
    const { isChecked, text } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles();

    function colorIfValid(valid: boolean): string {
        return valid ? theme.colors.primary : Colors.gray['100'];
    }

    return (
        <View style={styles.itemContainer}>
            <MatIcon name={'check'} size={24} color={colorIfValid(isChecked)} />
            <Subtitle2 font={'regular'} style={styles.text}>
                {text}
            </Subtitle2>
        </View>
    );
};
