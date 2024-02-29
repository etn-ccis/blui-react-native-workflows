import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { WorkflowCardBodyProps } from './WorkflowCard.types';
import { Card } from 'react-native-paper';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    viewContainer: ViewStyle;
    workflowBody: ViewStyle;
}> =>
    StyleSheet.create({
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
        <>
            {scrollable ? (
                <ScrollView contentInsetAdjustmentBehavior="automatic" bounces={false}>
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
