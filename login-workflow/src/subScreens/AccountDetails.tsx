/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView, TextInput as ReactTextInput } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Instruction } from '../components/Instruction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';

// Hooks
import { useInjectedUIContext, useLanguageLocale } from '@brightlayer-ui/react-auth-shared';

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
        mainContainer: {
            marginTop: 8,
            flex: 1,
        },
        containerMargins: {
            marginHorizontal: 16,
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
 * Type to represent the input of the account details component.
 *
 * @param firstName  The first name string.
 * @param lastName  The last name string.
 */
export type AccountDetailInformation = {
    firstName: string;
    lastName: string;
};

/**
 * Defaults for the account details component inputs.
 */
export const emptyAccountDetailInformation = {
    firstName: '',
    lastName: '',
};

/**
 * Handle the change of any of the account details inputs.
 *
 * @param onDetailsChanged   Handle the change of any of the account details inputs.
 * @param onSubmit callback called when user submits on the last form field to advance the screen
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
export type AccountDetailsProps = {
    onDetailsChanged(details: AccountDetailInformation | null): void;
    onSubmit?: () => void;
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the content of the Account Details screen entry
 * (inputs for first name, last name, and phone number).
 *
 * @category Component
 */
export const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
    const theme = useTheme(props.theme);
    const [firstNameInput, setFirstNameInput] = React.useState('');
    const [lastNameInput, setLastNameInput] = React.useState('');
    const { t } = useLanguageLocale();

    const firstNameLengthLimit = useInjectedUIContext()?.registrationConfig?.firstName?.maxLength || null;
    const lastNameLengthLimit = useInjectedUIContext()?.registrationConfig?.lastName?.maxLength || null;

    React.useEffect(() => {
        if (firstNameInput.length > 0 && lastNameInput.length > 0) {
            props.onDetailsChanged({ firstName: firstNameInput, lastName: lastNameInput });
        } else {
            props.onDetailsChanged(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstNameInput, lastNameInput]); // ignore props

    const styles = makeStyles();
    const containerStyles = makeContainerStyles(theme);

    const lastNameRef = React.useRef<ReactTextInput>(null);
    const goToLastName = (): void => lastNameRef?.current?.focus();

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <View style={{ width: '100%', maxWidth: 600 }}>
                <KeyboardAwareScrollView>
                    <Instruction
                        text={t('blui:REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS')}
                        style={containerStyles.containerMargins}
                    />

                    <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                        <TextInput
                            label={t('blui:FORMS.FIRST_NAME')}
                            value={firstNameInput}
                            style={styles.inputMargin}
                            autoCapitalize={'sentences'}
                            returnKeyType={'next'}
                            onChangeText={(text: string): void => setFirstNameInput(text)}
                            onSubmitEditing={(): void => {
                                goToLastName();
                            }}
                            blurOnSubmit={false}
                            maxLength={firstNameLengthLimit}
                        />

                        <TextInput
                            ref={lastNameRef}
                            label={t('blui:FORMS.LAST_NAME')}
                            value={lastNameInput}
                            style={styles.inputMargin}
                            autoCapitalize={'sentences'}
                            returnKeyType={'next'}
                            onChangeText={(text: string): void => setLastNameInput(text)}
                            onSubmitEditing={
                                firstNameInput.length > 0 && lastNameInput.length > 0 ? props.onSubmit : undefined
                            }
                            maxLength={lastNameLengthLimit}
                        />
                        {props.children}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
};
