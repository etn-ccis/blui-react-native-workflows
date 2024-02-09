/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { IndividualScreenData, RegistrationWorkflowContextProvider } from '../../contexts/RegistrationWorkflowContext';
import { EulaScreen } from './EulaScreen';
import { CreateAccount } from './CreateAccount';
import { VerifyCode } from './VerifyCode';
import { CreatePassword } from './CreatePassword';
import { AccountDetails } from './AccountDetails';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
});

export const DemoRegistrationWorkflowScreen: React.FC<React.PropsWithChildren<any>> = (props) => {
    const navigation = useNavigation();
    const {
        initialScreenIndex = 0,
        isInviteRegistration = false,
        children = [
            <EulaScreen key="EulaScreen" />,
            <CreateAccount key="CreateAccount" />,
            <VerifyCode key="VerifyCode" />,
            <CreatePassword key="CreatePassword" />,
            <AccountDetails key="AccountDetails" />,
        ],
    } = props;

    const screens = [...(Array.isArray(children) ? children : [children])];
    const totalScreens = screens.length;
    const [currentScreen, setCurrentScreen] = useState(
        initialScreenIndex < 0 ? 0 : initialScreenIndex > totalScreens - 1 ? totalScreens - 1 : initialScreenIndex
    );

    const [screenData, setScreenData] = useState({
        Eula: {
            accepted: false,
        },
        CreateAccount: {
            emailAddress: '',
        },
        VerifyCode: {
            code: '',
            isAccountExist: false,
        },
        CreatePassword: {
            password: '',
            confirmPassword: '',
        },
        AccountDetails: {
            firstName: '',
            lastName: '',
        },
        Other: {},
    });

    const updateScreenData = (data: IndividualScreenData): void => {
        const { Other }: { [key: string]: any } = screenData;
        const { screenId, values } = data;

        if (!Object.keys(screenData).includes(screenId)) {
            setScreenData((oldData) => ({
                ...oldData,
                Other: { ...oldData.Other, [screenId]: values },
            }));
        } else if (Object.keys(Other).includes(screenId)) {
            setScreenData((oldData) => ({
                ...oldData,
                Other: { ...Other, [screenId]: { ...Other[screenId], ...values } },
            }));
        } else {
            setScreenData((oldData) => ({
                ...oldData,
                [screenId]: values,
            }));
        }
    };

    const viewPagerRef = useRef<PagerView>(null);
    return (
        <RegistrationWorkflowContextProvider
            currentScreen={currentScreen}
            totalScreens={totalScreens}
            nextScreen={(data): Promise<void> | undefined => {
                try {
                    updateScreenData(data);
                    if (currentScreen === totalScreens - 1) {
                        return;
                    }
                    setCurrentScreen((i: number) => i + 1);
                    viewPagerRef.current?.setPage(currentScreen + 1);
                } catch (_error) {
                    // eslint-disable-next-line
                    console.log(_error as Error);
                }
            }}
            previousScreen={(data): void => {
                updateScreenData(data);
                if (currentScreen === 0) {
                    navigation.navigate('Home');
                }
                setCurrentScreen((i: number) => i - 1);
                viewPagerRef.current?.setPage(currentScreen - 1);
            }}
            screenData={screenData}
            updateScreenData={updateScreenData}
            isInviteRegistration={isInviteRegistration}
        >
            <PagerView style={styles.pagerView} initialPage={initialScreenIndex} ref={viewPagerRef}>
                {screens.map((route, index) => (
                    <View key={index + 1}>{route}</View>
                ))}
            </PagerView>
        </RegistrationWorkflowContextProvider>
    );
};
