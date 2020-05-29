/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React, { useCallback } from 'react';

// Components
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Body } from '@pxblue/react-native-components';
import { Checkbox } from '../components/Checkbox';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import { Theme, useTheme } from 'react-native-paper';

/**
 * @ignore
 */
const makeContainerStyles = (theme: Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
        },
        mainContainer: {
            flex: 1,
            paddingTop: 20,
        },
        containerMargins: {
            marginHorizontal: 20,
        },
        checkboxContainer: {
            height: 70,
            justifyContent: 'center',
            alignSelf: 'flex-start',
            marginLeft: 10,
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
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type EulaProps = {
    eulaAccepted?: boolean;
    eulaContent?: string;
    onEulaChanged(accepted: boolean): void;
    eulaError: string | null;
    loadEula: Function;
    theme?: Theme;
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
    const eulaIsChecked = props.eulaAccepted ?? false;

    React.useEffect(() => {
        props.loadEula();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkedBox = useCallback(() => {
        props.onEulaChanged(!eulaIsChecked);
    }, [eulaIsChecked, props]);

    const disableCheckBox = props.eulaError || !props.eulaContent ? true : false;

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <View style={[containerStyles.mainContainer, containerStyles.containerMargins]}>
                <ScrollView>
                    <Body>{props.eulaContent ?? props.eulaError ?? t('REGISTRATION.EULA.LOADING')}</Body>
                </ScrollView>
            </View>
            <View style={[containerStyles.containerMargins, containerStyles.checkboxContainer]}>
                <Checkbox
                    label={t('REGISTRATION.EULA.AGREE_TERMS')}
                    disabled={disableCheckBox}
                    checked={eulaIsChecked}
                    onPress={checkedBox}
                />
            </View>
        </SafeAreaView>
    );
};
