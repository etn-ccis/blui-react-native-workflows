import React from 'react';

import { StyleSheet, ViewStyle } from 'react-native';
import { Card, CardContentProps } from 'react-native-paper';


const makeStyles = (): StyleSheet.NamedStyles<{
    workflowBodyStyle: ViewStyle;
}> => {
    return StyleSheet.create({
        workflowBodyStyle: {
            backgroundColor: 'red',
            flex: 1,
            marginTop: 8,
            paddingBottom: 16,
            marginHorizontal: 16,
        }
    });
};

/**
 * Component that renders the body content for the workflow card.
 *
 * @param children content to render in the WorkflowCardBody
 *
 * @category Component
 */

export const WorkflowCardBody: React.FC<CardContentProps> = (props) => {
    const { children, style, ...otherCardContentProps } = props;
    const defaultStyles = makeStyles();
    return (
        <Card.Content
            style={[defaultStyles.workflowBodyStyle, style]}
            {...otherCardContentProps}
        >
            {children}
        </Card.Content>
    );
};
