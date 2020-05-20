import React from 'react';

// Components
import { Platform, Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { LoginHeaderSplash, useSecurityActions, useSecurityState } from '@etn-sst/react-native-auth-ui';

// Styles
import * as Colors from '@pxblue/colors';
import { LocalStorage } from '../store/local-storage';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = () =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: Colors.white['50'],
        },
        mainContainer: {
            flex: 1,
            marginHorizontal: 30,
            height: '82%',
        },
        topArea: {
            height: '18%',
        },
        welcomeText: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            margin: 20,
        },
    });

let statusBar: JSX.Element = <></>;
statusBar =
    Platform.OS === 'ios' ? (
        <StatusBar backgroundColor={Colors.blue['700']} barStyle="dark-content" />
    ) : (
        <StatusBar backgroundColor={Colors.blue['700']} barStyle="light-content" />
    );

function FakeHome(): JSX.Element {
    const containerStyles = makeContainerStyles();
    const securityHelper = useSecurityActions();
    const securityState = useSecurityState();

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    return (
        <SafeAreaView style={[containerStyles.safeContainer, { flex: 1, justifyContent: 'space-between' }]}>
            {statusBar}
            <LoginHeaderSplash
                style={containerStyles.topArea}
                mainImage={require('../assets/images/eaton_stacked_logo.png')}
            />

            <View style={{ margin: 20 }}>
                <Text style={containerStyles.welcomeText}>
                    {`Welcome, ${securityState.email}!\nThis is a placeholder screen which your app should replace.`}
                </Text>
                <Button
                    uppercase={false}
                    mode={'contained'}
                    style={{ backgroundColor: Colors.yellow['500'] }}
                    onPress={securityHelper.showChangePassword}
                >
                    Change Password
                </Button>
                <Button
                    uppercase={false}
                    mode={'contained'}
                    style={{ backgroundColor: Colors.blue['500'] }}
                    onPress={logOut}
                >
                    Log Out
                </Button>
            </View>
        </SafeAreaView>
    );
}
export default FakeHome;
