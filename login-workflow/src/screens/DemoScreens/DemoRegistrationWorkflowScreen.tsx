/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useRef, useState } from 'react';

// Components
import { View, StyleSheet } from 'react-native';
// import { RegistrationContext } from '../../contexts';
// import PagerView from 'react-native-pager-view';
import PagerView from 'react-native-pager-view';
import { Text } from 'react-native-paper';
import { IndividualScreenData, RegistrationWorkflowContextProvider } from '../../contexts/RegistrationWorkflowContext';
// import { WorkflowCardActions } from 'src/components/WorkflowCard/WorkflowCardActions';
import { EulaScreen } from './EulaScreen';
import { CreateAccount } from './CreateAccount';
import { VerifyCode } from './VerifyCode';
import { CreatePassword } from './CreatePassword';
import { AccountDetails } from './AccountDetails';

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
});

export const DemoRegistrationWorkflowScreen: React.FC<React.PropsWithChildren<any>> = (props) => {
    const [isAccountExist, setIsAccountExist] = useState(false);
    
    const {
        initialScreenIndex = 0,
        successScreen = <View><Text>Success</Text></View>,
        existingAccountSuccessScreen = <View><Text>Existing Screen</Text></View>,
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
    // const [showSuccessScreen, setShowSuccessScreen] = useState(false);

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
        const { screenId, values, isAccountExist: accountExists } = data;

        // if (accountExists) {
        //     setIsAccountExist(accountExists);
        //     // setShowSuccessScreen(accountExists);
        // }

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
                    if (data.isAccountExist) {
                        setIsAccountExist(true);
                        // setShowSuccessScreen(true);
                    }
                    if (currentScreen === totalScreens - 1) { return };
                    setCurrentScreen((i: number) => i + 1);
                    viewPagerRef.current?.setPage(currentScreen + 1);
                } catch (_error) {
                    console.log(_error as Error);
                }
            }}
            previousScreen={(data): void => {
                updateScreenData(data);
                if (currentScreen === 0) {
                    console.log('navigate to home')
                }
                setCurrentScreen((i: number) => i - 1);
                viewPagerRef.current?.setPage(currentScreen - 1);
            }}
            screenData={screenData}
            updateScreenData={updateScreenData}
            isInviteRegistration={isInviteRegistration}
        >
            <PagerView style={styles.pagerView} initialPage={initialScreenIndex} ref={viewPagerRef}>
                {screens.map((route, index) => {
                    return <View key={index + 1}>{route}</View>;
                })}
            </PagerView>
        </RegistrationWorkflowContextProvider>
    );
};
