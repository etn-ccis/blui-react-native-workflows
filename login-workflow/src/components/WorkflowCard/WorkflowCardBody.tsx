import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Card, CardContentProps } from 'react-native-paper';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    workflowBody: ViewStyle;
}> =>
    StyleSheet.create({
        workflowBody: {
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
    const { isTablet } = useScreenDimensions();
    const defaultStyles = makeStyles(isTablet);

    return (
        <ScrollView>
            <Card.Content style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
                {children}
            </Card.Content>
        </ScrollView>
    );
};
