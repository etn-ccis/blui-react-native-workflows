/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useState } from 'react';

// Components
import { View, SafeAreaView, BackHandler } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
// Hooks
import { useNavigation } from '@react-navigation/native';
import { Eula } from 'src/subScreens/Eula';
import { CreateAccount } from 'src/subScreens/CreateAccount';
/**
 * @ignore
 */

/**
 * Renders the contact support screen with a tap-able contact email and contact phone.
 *
 * @category Component
 */
export const Screen1: React.FC<React.PropsWithChildren<any>> = (props) => {
    const navigation = useNavigation();
    const {
        children = [<TextInput value="" label={'first input'} />, <Text>Hello 2</Text>, <TextInput>Hello 3</TextInput>],
    } = props;

    // Navigate appropriately with the hardware back button on android
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
            <Text>Screen 1</Text>
            <Button mode="text" onPress={() => navigation.navigate('Screen2')}>
                Next
            </Button>
        </View>
    );
};
