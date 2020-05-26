import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSecurityActions, useSecurityState } from '@pxblue/react-native-auth-workflow';
//@ts-ignore TODO: Find a way to get the types for this
import { ToggleButton } from '@pxblue/react-native-auth-workflow/lib/module/components/ToggleButton';
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
                    <ToggleButton
                        text={'Change Password'}
                        isOutlineOnly
                        style={{ marginBottom: 20 }}
                        onPress={securityHelper.showChangePassword}
                    />
                    {/* TODO These components need to be properly themed */}
                    <ToggleButton text={'Log Out'} onPress={logOut} />
                </View>
            </SafeAreaView>
        </>
    );
};
