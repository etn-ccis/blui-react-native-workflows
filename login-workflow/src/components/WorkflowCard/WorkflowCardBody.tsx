import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { WorkflowCardBodyProps } from './WorkflowCard.types';
import { Card } from 'react-native-paper';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    container: ViewStyle;
    viewContainer: ViewStyle;
    workflowBody: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            minHeight: '100%',
            flex: 1,
        },
        viewContainer: {
            flex: 1,
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
export const WorkflowCardBody: React.FC<WorkflowCardBodyProps> = (props) => {
    const { children, style, scrollable = true, ...otherCardContentProps } = props;
    const { isTablet } = useScreenDimensions();
    const defaultStyles = makeStyles(isTablet);

    return (
        <>
            {scrollable ? (
                <ScrollView bounces={false} contentContainerStyle={[defaultStyles.container]}>
                    <Card.Content style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
                        {children}
                    </Card.Content>
                </ScrollView>
            ) : (
                <Card.Content style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
                    <View style={defaultStyles.viewContainer}>{children}</View>
                </Card.Content>
            )}
        </>
    );
};
