import { Spacer } from '@brightlayer-ui/react-native-components';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export const DebugComponent = (): JSX.Element => {
    const [debugMode, setDebugMode] = useState(false);
    const navigation = useNavigation();
    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                {debugMode && <Text variant="headlineSmall">DEBUG MODE</Text>}
                <Spacer />
                <Button
                    mode="contained"
                    onPress={(): void => {
                        setDebugMode(!debugMode);
                    }}
                >
                    DEBUG
                </Button>
            </View>
            {debugMode && (
                <View style={{ paddingBottom: 2 }}>
                    <Button
                        mode={'text'}
                        labelStyle={{ fontSize: 16 }}
                        uppercase={false}
                        onPress={(): void => {
                            navigation.navigate('RegistrationProviderExample', { screen: 'RegisterInvite' });
                        }}
                    >
                        [Test Invite Register]
                    </Button>
                    <Button
                        mode={'text'}
                        labelStyle={{ fontSize: 16 }}
                        uppercase={false}
                        onPress={(): void => navigation.navigate('ResetPassword')}
                    >
                        [Test Reset Password]
                    </Button>
                </View>
            )}
        </>
    );
};
