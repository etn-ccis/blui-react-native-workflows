import React, { useCallback, useState } from 'react';
import { EulaScreenProps } from './types';
import {
    ErrorManager,
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Icon } from '@brightlayer-ui/react-native-components';
import { WebView } from 'react-native-webview';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
// import { useTranslation } from 'react-i18next';

export const EulaScreenBase: React.FC<EulaScreenProps> = (props) => {
    const {
        onEulaAcceptedChange,
        eulaContent,
        checkboxLabel,
        html,
        initialCheckboxValue,
        checkboxProps,
        errorDisplayConfig,
        onRefetch,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const theme = useExtendedTheme();
    // const { t } = useTranslation();

    const [eulaAccepted, setEulaAccepted] = useState(initialCheckboxValue ?? false);
    const [checkboxEnable, setCheckboxEnable] = useState(false);
    const handleEulaAcceptedChecked = useCallback(
        (accepted: boolean) => {
            setEulaAccepted(accepted);
            onEulaAcceptedChange?.(accepted);
        },
        [onEulaAcceptedChange]
    );

    const isCloseToBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }: {
        layoutMeasurement: { height: number };
        contentOffset: { y: number };
        contentSize: { height: number };
    }): boolean => {
        const paddingToBottom = 30;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody scrollable={false}>
                <View style={{ flex: 1 }}>
                    {checkboxProps?.disabled ? (
                        <View
                            style={{
                                display: 'flex',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // height: height * 0.68, maxHeight: 520,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={onRefetch}
                            >
                                <Icon source={{ name: 'refresh' }} />
                                <Text variant={'titleSmall'} style={{ letterSpacing: 0 }}>
                                    Retry
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ flex: 1 }}>
                            {html ? (
                                <WebView
                                    originWhitelist={['*']}
                                    source={{ html: eulaContent as string, baseUrl: '' }}
                                    scalesPageToFit={false}
                                    nestedScrollEnabled={true}
                                    onScroll={({ nativeEvent }) => {
                                        if (isCloseToBottom(nativeEvent)) {
                                            setCheckboxEnable(true);
                                        }
                                    }}
                                    scrollEventThrottle={10}
                                    forceDarkOn={theme.dark ? true : false}
                                    style={{
                                        flex: 1,
                                        backgroundColor: theme.colors.background,
                                    }}
                                />
                            ) : (
                                <ScrollView
                                    onScroll={({ nativeEvent }) => {
                                        if (isCloseToBottom(nativeEvent)) {
                                            setCheckboxEnable(true);
                                        }
                                    }}
                                    scrollEventThrottle={10}
                                    nestedScrollEnabled={true}
                                >
                                    <Text variant={'titleSmall'} style={{ letterSpacing: 0 }}>
                                        {eulaContent}
                                    </Text>
                                </ScrollView>
                            )}
                            <ErrorManager {...errorDisplayConfig}>
                                <Checkbox.Item
                                    color={theme.colors.primary}
                                    disabled={!checkboxEnable}
                                    status={eulaAccepted ? 'checked' : 'unchecked'}
                                    label={checkboxLabel as string}
                                    onPress={() => {
                                        handleEulaAcceptedChecked(!eulaAccepted);
                                    }}
                                    style={{
                                        paddingLeft: 0,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                    labelStyle={{ flexGrow: 0 }}
                                    position="leading"
                                    mode="android"
                                    {...checkboxProps}
                                />
                            </ErrorManager>
                        </View>
                    )}
                </View>
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} canGoNext={eulaAccepted && actionsProps.canGoNext} />
        </WorkflowCard>
    );
};
