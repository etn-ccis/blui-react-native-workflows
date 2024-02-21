import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Card, CardContentProps } from 'react-native-paper';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    container: ViewStyle;
    workflowBody: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            height: '100%',
        },
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
 * @param {CardContentProps} props - Props of CardContentProps component
 *
 * @category Component
 */
export const WorkflowCardBody: React.FC<CardContentProps> = (props: CardContentProps) => {
    const { children, style, ...otherCardContentProps } = props;
    const { isTablet } = useScreenDimensions();
    const defaultStyles = makeStyles(isTablet);

    return (
        <ScrollView bounces={false} contentContainerStyle={[defaultStyles.container]}>
            <Card.Content style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
                {children}
            </Card.Content>
        </ScrollView>
    );
};
