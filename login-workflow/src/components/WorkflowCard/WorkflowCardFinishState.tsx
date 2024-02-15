import React from 'react';
import { EmptyStateProps, EmptyState } from '@brightlayer-ui/react-native-components';
import { View, StyleSheet, ViewStyle } from 'react-native';

const makeStyles = (): StyleSheet.NamedStyles<{
    workflowCardFinishState: ViewStyle;
}> =>
    StyleSheet.create({
        workflowCardFinishState: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
    });

/**
 * Component that renders a EmptyState component indicating completion of a user flow.
 *
 * @param props all props will be passed to the EmptyState component, except for style
 * which is applied to the root element
 *
 * @category Component
 */

export const WorkflowCardFinishState: React.FC<EmptyStateProps> = (props) => {
    const { style, ...emptyStateProps } = props;
    const styles = makeStyles();

    return (
        <View style={[styles.workflowCardFinishState, style]}>
            <EmptyState {...emptyStateProps} />
        </View>
    );
};
