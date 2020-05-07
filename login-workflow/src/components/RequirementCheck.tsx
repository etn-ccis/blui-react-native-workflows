/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Icon } from 'react-native-elements';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
    StyleSheet.create({
        itemContainer: {
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        text: {
            paddingLeft: 10,
        },
    });

/**
 * @param isChecked  If the requirement is met / a checkmark is shown.
 * @param text  The text to show next to the checkmark.
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

    function colorIfValid(valid: boolean): string {
        return valid ? Colors.blue['500'] : Colors.gray['100'];
    }

    return (
        <View style={styles.itemContainer}>
            <Icon name={'check'} color={colorIfValid(props.isChecked)}></Icon>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};
