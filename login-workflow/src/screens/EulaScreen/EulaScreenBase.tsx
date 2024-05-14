import React, { useCallback, useRef, useState } from 'react';
import { EulaScreenProps } from './types';
import {
    ErrorManager,
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
} from '../../components';
import { LayoutChangeEvent, ScrollView, TouchableOpacity, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Icon } from '@brightlayer-ui/react-native-components';
import { WebView } from 'react-native-webview';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { useTranslation } from 'react-i18next';

const makeStyles = (
    theme: ExtendedTheme
): StyleSheet.NamedStyles<{
    container: ViewStyle;
    retryContainer: ViewStyle;
    retryBody: ViewStyle;
    text: TextStyle;
    webview: ViewStyle;
    checkbox: ViewStyle;
    checkboxLabel: TextStyle;
}> =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        retryContainer: {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        retryBody: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: { letterSpacing: 0, paddingLeft: 10 },
        webview: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        checkbox: {
            paddingLeft: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        checkboxLabel: { flexGrow: 0, flexShrink: 0, textAlign: 'left' },
    });

/**
 * Base Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param {EulaScreenProps} props - Basic props of EULA Screen Base component
 *
 * @category Component
 */
export const EulaScreenBase: React.FC<EulaScreenProps> = (props) => {
    const {
        onEulaAcceptedChange,
        eulaContent,
        checkboxLabel,
        html,
        initialCheckboxValue,
        checkboxProps,
        errorDisplayConfig,
        refreshConfig,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const cardBodyProps = props.WorkflowCardBodyProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const theme = useExtendedTheme();
    const { t } = useTranslation();
    const scrollViewRef = useRef<ScrollView>(null);
    const contentSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
    const defaultStyles = makeStyles(theme);

    const [eulaAccepted, setEulaAccepted] = useState(initialCheckboxValue ?? false);
    const [checkboxEnable, setCheckboxEnable] = useState(eulaAccepted);

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
        if (eulaAccepted) {
            return true;
        }
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    const handleLayout = (event: LayoutChangeEvent): void => {
        const { width, height } = event.nativeEvent.layout;
        contentSizeRef.current = { width, height };
    };

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody scrollable={false} {...cardBodyProps}>
                <View style={defaultStyles.container}>
                    {refreshConfig?.showRefreshButton ? (
                        <View style={defaultStyles.retryContainer}>
                            <TouchableOpacity style={defaultStyles.retryBody} onPress={refreshConfig?.onRefresh}>
                                <Icon source={{ name: 'refresh' }} />
                                <Text variant={'titleSmall'} style={defaultStyles.text}>
                                    {refreshConfig?.refreshButtonLabel || t('bluiCommon:MESSAGES.RETRY')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={defaultStyles.container}>
                            {html ? (
                                <WebView
                                    originWhitelist={['*']}
                                    testID="blui-eula-web-view"
                                    source={{ html: eulaContent as string, baseUrl: '' }}
                                    scalesPageToFit={false}
                                    nestedScrollEnabled={true}
                                    onScroll={({ nativeEvent }) => {
                                        if (isCloseToBottom(nativeEvent)) {
                                            setCheckboxEnable(true);
                                        }
                                    }}
                                    injectedJavaScript={`
                                        function updateScroll() {
                                            window.scrollTo(1, 0);
                                        }
                                        updateScroll();
                                    `}
                                    scrollEventThrottle={10}
                                    forceDarkOn={theme.dark ? true : false}
                                    style={defaultStyles.webview}
                                />
                            ) : (
                                <ScrollView
                                    onScroll={({ nativeEvent }) => {
                                        if (isCloseToBottom(nativeEvent)) {
                                            setCheckboxEnable(true);
                                        }
                                    }}
                                    testID="blui-eula-scroll-view"
                                    ref={scrollViewRef}
                                    scrollEventThrottle={10}
                                    nestedScrollEnabled={true}
                                    onContentSizeChange={(w, height) => {
                                        if (eulaAccepted === false) {
                                            setCheckboxEnable(height <= contentSizeRef.current.height);
                                        }
                                    }}
                                    onLayout={handleLayout}
                                >
                                    <Text variant={'bodyLarge'} style={defaultStyles.text}>
                                        {eulaContent}
                                    </Text>
                                </ScrollView>
                            )}
                            <ErrorManager {...errorDisplayConfig}>
                                <Checkbox.Item
                                    testID="blui-eula-checkbox"
                                    color={checkboxProps?.color || theme.colors.primary}
                                    disabled={!checkboxEnable}
                                    status={eulaAccepted ? 'checked' : 'unchecked'}
                                    label={checkboxLabel as string}
                                    onPress={() => {
                                        handleEulaAcceptedChecked(!eulaAccepted);
                                    }}
                                    style={[defaultStyles.checkbox, checkboxProps?.style]}
                                    labelStyle={[defaultStyles.checkboxLabel, checkboxProps?.labelStyle]}
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
