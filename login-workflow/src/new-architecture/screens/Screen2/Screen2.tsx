/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';

// Components
import { View, BackHandler } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
// Hooks
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRegistration } from '../../contexts/RegistrationContextProvider';
/**
 * @ignore
 */

/**
 * Renders the contact support screen with a tap-able contact email and contact phone.
 *
 * @category Component
 */
export const Screen2: React.FC<React.PropsWithChildren<any>> = (props) => {
    const navigation = useNavigation();
    // Navigate appropriately with the hardware back button on android
    const { eulaData,createAccountScreen } = useRegistration();
    React.useEffect(() => {
        const onBackPress = (): boolean => {
            navigation.navigate('Login');
            return true;
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return (): void => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Name: {eulaData.name}</Text>
            <Text>Email: {createAccountScreen.email}</Text>
            <Button mode="text" onPress={() => navigation.goBack()}>
                Back
            </Button>
        </View>
    );
};
