import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export const Login: React.FC = (): JSX.Element => {
    const Text1 = 'Login Page';
    return (
        <View>
            <Text style={{ alignSelf: 'center', marginTop: 100 }} variant="titleLarge">
                {Text1}
            </Text>
        </View>
    );
};
