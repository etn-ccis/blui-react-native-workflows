import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { WorkflowCardBodyProps } from './WorkflowCard.types';
import { Card, Divider, Text } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    instructions: ViewStyle;
    viewContainer: ViewStyle;
    workflowBody: ViewStyle;
}> =>
    StyleSheet.create({
        workflowBody: {
            marginHorizontal: isTablet ? 24 : 16,
            paddingTop: 32,
            paddingBottom: isTablet ? 32 : 24,
            paddingHorizontal: 0,
            flex: 1,
        },
        instructions: {
            letterSpacing: 0,
        },
        viewContainer: {
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
    const { instructions, divider = true, children, style, scrollable = true, ...otherCardContentProps } = props;
    const { isTablet } = useScreenDimensions();
    const defaultStyles = makeStyles(isTablet);

    return (
        <>
            {scrollable ? (
                <KeyboardAwareScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    bounces={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
                        {typeof instructions === 'string' ? (
                            <Text variant="bodyLarge" style={[defaultStyles.instructions]}>
                                {instructions}
                            </Text>
                        ) : (
                            instructions
                        )}
                    </View>
                    {divider && <Divider />}
                    <View style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
                        {children}
                    </View>
                </KeyboardAwareScrollView>
            ) : (
                <Card.Content style={[defaultStyles.workflowBody, style]} {...otherCardContentProps}>
                    <View style={defaultStyles.viewContainer}>{children}</View>
                </Card.Content>
            )}
        </>
    );
};
