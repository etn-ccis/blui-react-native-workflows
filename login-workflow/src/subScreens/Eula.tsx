/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React, { useCallback, useState } from 'react';

// Components
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Body1 } from '@brightlayer-ui/react-native-components';
import { Checkbox } from '../components/Checkbox';
import { WebView } from 'react-native-webview';

// Hooks
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import { useTheme } from 'react-native-paper';

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
        },
        mainContainer: {
            flex: 1,
            paddingTop: 16,
            width: 'auto',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        containerMargins: {
            marginHorizontal: 16,
        },
        checkboxContainer: {
            height: 72,
            justifyContent: 'center',
            alignSelf: 'stretch',
            marginLeft: 8,
        },
    });

/**
 * Handle the change of the password input.
 *
 * @param eulaAccepted  (Optional) If the EULA has been accepted or not. Default false.
 * @param eulaContent  (Optional) The content of the EULA.
 * @param onEulaChanged  The function to handle when the EULA state has changed.
 * @param eulaError  The error message.
 * @param loadEula  The function to be used for loading the EULA.
 * @param htmlEula (Optional) whether the EULA should be plaintext or support HTML
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type EulaProps = {
    eulaAccepted?: boolean;
    eulaContent?: string;
    onEulaChanged(accepted: boolean): void;
    eulaError: string | null;
    loadEula: () => void;
    htmlEula?: boolean;
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the content of the EULA screen (EULA body and accept checkbox).
 *
 * @category Component
 */
export const Eula: React.FC<EulaProps> = (props) => {
    const theme = useTheme(props.theme);
    const { t } = useLanguageLocale();
    const containerStyles = makeContainerStyles(theme);
    const [contentLoaded, setContentLoaded] = useState(false);
    const eulaIsChecked = props.eulaAccepted ?? false;
    const htmlEula = props.htmlEula ?? false;

    React.useEffect(() => {
        props.loadEula();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkedBox = useCallback(() => {
        props.onEulaChanged(!eulaIsChecked);
    }, [eulaIsChecked, props]);

    const disableCheckBox = props.eulaError || (!contentLoaded && htmlEula) || !props.eulaContent ? true : false;

    const eulaContentInternals = !htmlEula
        ? props.eulaContent ?? props.eulaError ?? t('blui:REGISTRATION.EULA.LOADING')
        : props.eulaContent ??
          '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
              `<style>body { font-size: 120%; word-wrap: break-word; overflow-wrap: break-word; margin: 0; padding: 0; color: ${theme.colors.text}; background-color: ${theme.colors.surface}; }</style>` +
              `<body>${props.eulaError ?? t('blui:REGISTRATION.EULA.LOADING')}</body>` +
              '</html>';

    const onLoadEnd = (): void => {
        setContentLoaded(true);
    };

    return (
        <SafeAreaView style={[containerStyles.safeContainer]}>
            <View style={[containerStyles.mainContainer, containerStyles.containerMargins]}>
                <View style={{ flex: 1, maxWidth: 600 }}>
                    {htmlEula ? (
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: eulaContentInternals, baseUrl: '' }}
                            scalesPageToFit={false}
                            onLoadEnd={onLoadEnd}
                            style={{
                                flex: 1,
                                height: 50 /* WebView needs a fixed height set or it won't render */,
                                backgroundColor: theme.colors.surface,
                            }}
                        />
                    ) : (
                        <ScrollView>
                            <Body1>{eulaContentInternals}</Body1>
                        </ScrollView>
                    )}
                </View>
            </View>
            <View style={[containerStyles.containerMargins, containerStyles.checkboxContainer]}>
                <Checkbox
                    label={t('blui:REGISTRATION.EULA.AGREE_TERMS')}
                    disabled={disableCheckBox}
                    checked={eulaIsChecked}
                    onPress={checkedBox}
                />
            </View>
        </SafeAreaView>
    );
};
