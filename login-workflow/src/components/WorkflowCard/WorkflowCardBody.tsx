import React from 'react';
import { KeyboardAvoidingView, StyleSheet, ViewStyle } from 'react-native';
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
            // minHeight: '100%',
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
    const { children, style, ...otherCardContentProps } = props;
    const { isTablet } = useScreenDimensions();
    const defaultStyles = makeStyles(isTablet);

    return (
        <>
            {/* <Card.Content style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
                <ScrollView bounces={false} contentContainerStyle={[defaultStyles.container]}>
                    {children}
                    <View style={{ height: 1000, backgroundColor: 'red' }}></View>
                </ScrollView>
            </Card.Content> */}
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <Card.Content style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
                    {children}
                </Card.Content>
            </KeyboardAvoidingView>
        </>
    );
};
