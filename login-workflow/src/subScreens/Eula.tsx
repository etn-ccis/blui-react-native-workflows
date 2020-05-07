/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React, { useCallback } from 'react';

// Components
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Checkbox } from '../components/Checkbox';

// Styles
import * as Colors from '@pxblue/colors';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = () =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: Colors.white['50'],
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
        checkboxText: {
            flexShrink: 1,
            paddingLeft: 8,
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
 */
type EulaProps = {
    eulaAccepted?: boolean;
    eulaContent?: string;
    onEulaChanged(accepted: boolean): void;
    eulaError: string | null;
    loadEula: Function;
};

/**
 * Renders the content of the EULA screen (EULA body and accept checkbox).
 *
 * @category Component
 */
export default function Eula(props: EulaProps): JSX.Element {
    const { t } = useLanguageLocale();
    const containerStyles = makeContainerStyles();
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
                    <Text>{props.eulaContent ?? props.eulaError ?? t('REGISTRATION.EULA.LOADING')}</Text>
                </ScrollView>
            </View>
            <View style={[containerStyles.containerMargins, containerStyles.checkboxContainer]}>
                <Checkbox
                    label={t('REGISTRATION.EULA.AGREE_TERMS')}
                    disabled={disableCheckBox}
                    isChecked={eulaIsChecked}
                    textStyle={containerStyles.checkboxText}
                    onPress={checkedBox}
                />
            </View>
        </SafeAreaView>
    );
}
