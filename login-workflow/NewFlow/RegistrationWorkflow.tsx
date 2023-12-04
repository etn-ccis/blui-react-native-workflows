/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useState } from 'react';

// Components
import { View, SafeAreaView, BackHandler } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

// Hooks
import { useNavigation } from '@react-navigation/native';

/**
 * Renders the contact support screen with a tap-able contact email and contact phone.
 *
 * @category Component
 */
export const RegistrationWorkflow: React.FC<React.PropsWithChildren<any>> = (props) => {
    const navigation = useNavigation();
    const {
        children = [<TextInput value="" label={'first input'} />, <Text>Hello 2</Text>, <TextInput>Hello 3</TextInput>],
    } = props;
    const screens = [...(Array.isArray(children) ? children : [children])];
    const [currentScreen, setCurrentScreen] = useState(0);

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
        <>
            <SafeAreaView>
                <View>
                    {screens[currentScreen]}
                    <View style={{ display: 'flex' }}>
                        <Button onPress={() => setCurrentScreen(currentScreen - 1)}>Back</Button>
                        <Button onPress={() => setCurrentScreen(currentScreen + 1)}>Next</Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};
