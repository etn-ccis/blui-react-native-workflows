/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';

// Components
import { View, SafeAreaView, BackHandler } from 'react-native';
import { Text } from 'react-native-paper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

// Hooks
import { useNavigation } from '@react-navigation/native';

/**
 * Renders the contact support screen with a tap-able contact email and contact phone.
 *
 * @category Component
 */
export const DemoScreen: React.FC = () => {
    const navigation = useNavigation();

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
                <View style={{ maxWidth: 600 }}>
                    <MatIcon name={'chat-bubble-outline'} size={70} />

                    <View>
                        <Text>Questions</Text>
                        <Text>
                            Message
                            <Text>example@example.example</Text>.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};
