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
import { Subtitle } from '@pxblue/react-native-components';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
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
 */
type RequirementCheckProps = {
    isChecked: boolean;
    text: string;
};

/**
 * Creates a component consisting of a checkmark and a string next to it.
 * Will be styled with `Colors.blue['500']` if checked and `Colors.gray['100']` if not.
 *
 * @category Component
 */
export const RequirementCheck = (props: RequirementCheckProps): JSX.Element => {
    const styles = makeStyles();
    const theme = useTheme();

    function colorIfValid(valid: boolean): string {
        return valid ? theme.colors.primary : Colors.gray['100'];
    }

    return (
        <View style={styles.itemContainer}>
            <MatIcon name={'check'} size={24} color={colorIfValid(props.isChecked)} />
            <Subtitle font={'regular'} style={styles.text}>
                {props.text}
            </Subtitle>
        </View>
    );
};
