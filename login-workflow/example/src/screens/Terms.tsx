import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import * as Colors from '@pxblue/colors';
import { Header } from '@pxblue/react-native-components';
import { useNavigation } from '@react-navigation/core';

export const Terms: React.FC = () => {
    const navigation = useNavigation();
    return (
        <>
            <Header
                expandable={true}
                title={'Terms and Conditions'}
                subtitle={'Terms Screen'}
                info={`You'll need to replace this`}
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white[50] }}>
                <View style={{ flex: 1, padding: 20 }}>
                    <Button mode={'contained'} onPress={(): void => navigation.goBack()}>
                        Back
                    </Button>
                </View>
            </SafeAreaView>
        </>
    );
};
