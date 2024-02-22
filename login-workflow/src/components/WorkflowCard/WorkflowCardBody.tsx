import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { WorkflowCardBodyProps } from './WorkflowCard.types';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    container: ViewStyle;
    viewContainer: ViewStyle;
    workflowBody: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            height: '100%',
        },
        viewContainer: {
            flex: 1,
        },
        workflowBody: {
            marginHorizontal: isTablet ? 24 : 16,
            paddingTop: 32,
            paddingBottom: isTablet ? 32 : 24,
            paddingHorizontal: 0,
            flex: 1,
        },
    });

/**
 * Component that renders the body content for the workflow card.
 *
 * @param {CardContentProps} props - Props of CardContentProps component
 *
 * @category Component
 */
export const WorkflowCardBody: React.FC<WorkflowCardBodyProps> = (props) => {
    const { children, style, scrollable = true, ...otherCardContentProps } = props;
    const { isTablet } = useScreenDimensions();
    const defaultStyles = makeStyles(isTablet);

    return (
        <Card.Content style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
            {scrollable ? (
                <ScrollView bounces={false} contentContainerStyle={[defaultStyles.container]}>
                    {children}
                </ScrollView>
            ) : (
                <View style={defaultStyles.viewContainer}>{children}</View>
            )}
        </Card.Content>
    );
};
