import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSecurityActions, useSecurityState } from '@pxblue/react-native-auth-workflow';
import { Button } from 'react-native-paper';
import * as Colors from '@pxblue/colors';
import { LocalStorage } from '../store/local-storage';
import { EmptyState, wrapIcon, Header } from '@pxblue/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

const Welcome = wrapIcon({ IconClass: MatIcon, name: 'new-releases' });

export const ExampleHome: React.FC = () => {
    const securityHelper = useSecurityActions();
    const securityState = useSecurityState();

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    return (
        <>
            <Header expandable={true} title={'Home'} subtitle={'Sample Screen'} info={`You'll need to replace this`} />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white[50] }}>
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ flex: 1 }}>
                        <EmptyState
                            title={`Welcome, ${securityState.email}!`}
                            description={'This is a placeholder screen that you should replace with your application.'}
                            IconClass={Welcome}
                        />
                    </View>
                    <Button mode={'outlined'} style={{ marginBottom: 20 }} onPress={securityHelper.showChangePassword}>
                        Change Password
                    </Button>
                    <Button mode={'contained'} onPress={logOut}>
                        Log Out
                    </Button>
                </View>
            </SafeAreaView>
        </>
    );
};
