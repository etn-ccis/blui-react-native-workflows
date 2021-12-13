import React, { useEffect, useRef, useState } from 'react';

// Components
import { View, StyleSheet, TextInput as ReactTextInput } from 'react-native';
import { TextInput } from '../components/TextInput';

// Hooks
import { AccountDetailsFormProps } from '@brightlayer-ui/react-auth-shared';

/**
 * @ignore
 */
const makeContainerStyles = (): Record<string, any> => ({
    mainContainer: {
        marginTop: 8,
        flex: 1,
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
 * Renders the content of the Account Details screen entry
 * (inputs for first name, last name, and phone number).
 *
 * @category Component
 */
export const CustomAccountDetails: React.FC<AccountDetailsFormProps> = (props) => {
    const styles = makeStyles();
    const containerStyles = makeContainerStyles();

    const { onDetailsChanged, initialDetails, onSubmit } = props;
    const [country, setCountry] = useState(initialDetails ? initialDetails.country : '');
    const [currency, setCurrency] = useState(initialDetails ? initialDetails.currency : '');

    const countryRef = useRef<ReactTextInput>(null);
    const currencyRef = useRef<ReactTextInput>(null);
    const goToCurrency = (): void => currencyRef?.current?.focus();

    useEffect((): void => {
        // validation checks
        const valid = country !== '';
        onDetailsChanged({ country, currency }, valid);
    }, [currency, country]); // Do NOT include onDetailsChanged in the dependencies array here or you will run into an infinite loop of updates

    return (
        <View style={[containerStyles.mainContainer]}>
            <TextInput
                ref={countryRef}
                label={'Country'}
                value={country.toString()}
                style={styles.inputMargin}
                autoCapitalize={'sentences'}
                returnKeyType={'next'}
                onChangeText={(text: string): void => setCountry(text)}
                onSubmitEditing={(): void => {
                    goToCurrency();
                }}
                blurOnSubmit={true}
            />

            <TextInput
                ref={currencyRef}
                label={'Currency'}
                value={currency.toString()}
                style={styles.inputMargin}
                autoCapitalize={'sentences'}
                returnKeyType={'next'}
                onChangeText={(text: string): void => setCurrency(text)}
                onSubmitEditing={(): void => {
                    if (onSubmit) onSubmit();
                }}
                blurOnSubmit={false}
            />
        </View>
    );
};

export const CustomAccountDetailsTwo: React.FC<AccountDetailsFormProps> = (props) => {
    const styles = makeStyles();
    const containerStyles = makeContainerStyles();

    const { onDetailsChanged, initialDetails, onSubmit } = props;
    const [company, setCompany] = useState(initialDetails ? initialDetails.company : '');
    const [role, setRole] = useState(initialDetails ? initialDetails.role : '');

    const companyRef = useRef<ReactTextInput>(null);
    const roleRef = useRef<ReactTextInput>(null);
    const goToRole = (): void => roleRef?.current?.focus();

    useEffect((): void => {
        // validation checks
        onDetailsChanged({ company, role }, true);
    }, [company, role]); // Do NOT include onDetailsChanged in the dependencies array here or you will run into an infinite loop of updates

    return (
        <View style={[containerStyles.mainContainer]}>
            <TextInput
                ref={companyRef}
                label={'Company'}
                value={company.toString()}
                style={styles.inputMargin}
                autoCapitalize={'sentences'}
                returnKeyType={'next'}
                onChangeText={(text: string): void => setCompany(text)}
                onSubmitEditing={(): void => {
                    goToRole();
                }}
                blurOnSubmit={true}
            />

            <TextInput
                ref={roleRef}
                label={'Role'}
                value={role.toString()}
                style={styles.inputMargin}
                autoCapitalize={'sentences'}
                returnKeyType={'next'}
                onChangeText={(text: string): void => setRole(text)}
                onSubmitEditing={(): void => {
                    if (onSubmit) onSubmit();
                }}
                blurOnSubmit={false}
            />
        </View>
    );
};
