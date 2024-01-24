import React from 'react';

import { StyleSheet, ViewStyle } from 'react-native';
import { Card, CardContentProps } from 'react-native-paper';
import { useScreenWidth } from '../../hooks/useScreenWidth';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    workflowBodyStyle: ViewStyle;
}> =>
    StyleSheet.create({
        workflowBodyStyle: {
            flex: 1,
            marginHorizontal: isTablet ? 24 : 16,
            paddingTop: 32,
            paddingBottom: isTablet ? 32 : 24,
            paddingHorizontal: 0,
        },
    });

/**
 * Component that renders the body content for the workflow card.
 *
 * @param children content to render in the WorkflowCardBody
 *
 * @category Component
 */

export const WorkflowCardBody: React.FC<CardContentProps> = (props) => {
    const { children, style, ...otherCardContentProps } = props;
    const isTablet = useScreenWidth();
    const defaultStyles = makeStyles(isTablet);
    return (
        <Card.Content style={[defaultStyles.workflowBodyStyle, style]} {...otherCardContentProps}>
            {children}
        </Card.Content>
    );
};
