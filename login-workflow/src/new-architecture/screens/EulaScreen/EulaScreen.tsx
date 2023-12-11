/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from '../../../components/TextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, useTheme } from 'react-native-paper';

// Shared Auth Logic
import {
    useLanguageLocale,
} from '@brightlayer-ui/react-auth-shared';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRegistration } from '../../contexts/RegistrationContextProvider';

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        scrollContainer: {
            flex: 1,
            alignContent: 'center',
        },
        scrollContentContainer: {
            alignSelf: 'center',
            width: '100%',
            maxWidth: 600,
        },
        mainContainer: {
            flex: 1,
            marginTop: 8,
            paddingBottom: 16,
        },
        containerMargins: {
            marginHorizontal: 16,
        },
        bottomButtonContainer: {
            position: 'absolute',
            bottom: 16,
            width: '100%',
        },
    });

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        inputMargin: {
            marginTop: 24,
        },
    });

/**
 * Handle the change of any of the email inputs.
 *
 * @param onEmailChanged  Handle the change of any of the email inputs.
 * @param onSubmit callback called when user submits on the last form field to advance the screen
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type EulaScreenProps = {
    name?: string;
};

/**
 * Renders the content of the Create Account screen (input for email).
 *
 * @category Component
 */
export const EulaScreen: React.FC<EulaScreenProps> = (props) => {
    const theme = useTheme(props.theme);
    const route = useRoute();
    // const [hasEmailFormatError, setHasEmailFormatError] = React.useState(false);
    const { t } = useLanguageLocale();
    const navigation = useNavigation();
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();
    const { eulaData, setEulaData } = useRegistration();
    const [nameInput, setNameInput] = React.useState(eulaData.name ?? props.name);
    const routeParams = route.params as any;
    console.log(routeParams, 'routeParamsEula');
    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <KeyboardAwareScrollView
                style={containerStyles.scrollContainer}
                contentContainerStyle={containerStyles.scrollContentContainer}
            >
                {/* <Instruction style={containerStyles.containerMargins} text={t('blui:SELF_REGISTRATION.INSTRUCTIONS')} /> */}

                <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                    <TextInput
                        label={'Name'}
                        value={nameInput}
                        style={styles.inputMargin}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        // error={hasEmailFormatError}
                        // errorText={hasEmailFormatError ? t('blui:MESSAGES.EMAIL_ENTRY_ERROR') : ''}
                        onChangeText={(name: string): void => {
                            setNameInput(name);
                            setEulaData({ name: name });
                            // setHasEmailFormatError(false);
                        }}
                        // onBlur={(): void => {
                        //     if (nameInput.length > 0 && !EMAIL_REGEX.test(nameInput)) setHasEmailFormatError(true);
                        // }}
                    />
                </View>
                <View style={{ display: 'flex' }}>
                    <Button onPress={() => navigation.navigate(routeParams.previousScreen)}>Back</Button>
                    <Button
                        onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            navigation.navigate(routeParams.nextScreen);
                        }}
                    >
                        Next
                    </Button>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
