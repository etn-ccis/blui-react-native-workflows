import React, { useEffect, useRef, useState } from 'react';
import {
    IndividualScreenData,
    RegistrationWorkflowContextProvider,
    useErrorManager,
    useRegistrationContext,
} from '../../contexts';
import PagerView from 'react-native-pager-view';
import { View, StyleSheet } from 'react-native';
import { ErrorManager } from '../Error/ErrorManager';
import { RegistrationWorkflowProps } from './types';
import {
    EulaScreen,
    CreateAccountScreen,
    VerifyCodeScreen,
    CreatePasswordScreen,
    AccountDetailsScreen,
    RegistrationSuccessScreen,
    ExistingAccountSuccessScreen,
} from '../../screens';
import { ErrorManagerProps } from '../Error';
import { Spinner } from '../Spinner';
import { timeOutDelay } from '../../constants';

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
});

/**
 * Component that contain the registration workflow and index of screens.
 *
 * @param {RegistrationWorkflowProps} props - props of RegistrationWorkflow component
 *
 * @category Component
 */
export const RegistrationWorkflow: React.FC<React.PropsWithChildren<RegistrationWorkflowProps>> = (props) => {
    const { errorDisplayConfig: registrationWorkflowErrorConfig } = props;
    const [isAccountExist, setIsAccountExist] = useState(false);
    const { triggerError, errorManagerConfig: globalErrorManagerConfig } = useErrorManager();
    const { actions, navigate, routeConfig } = useRegistrationContext();
    const viewPagerRef = useRef<PagerView>(null);

    const {
        messageBoxConfig: workflowMessageBoxConfig,
        dialogConfig: workflowDialogConfig,
        onClose: workflowOnClose,
        ...otherWorkflowErrorConfig
    } = registrationWorkflowErrorConfig ?? {};
    const {
        messageBoxConfig: globalMessageBoxConfig,
        dialogConfig: globalDialogConfig,
        onClose: globalOnClose,
        ...otherGlobalErrorConfig
    } = globalErrorManagerConfig;

    const errorDisplayConfig: ErrorManagerProps = {
        messageBoxConfig: { ...globalMessageBoxConfig, ...workflowMessageBoxConfig },
        dialogConfig: { ...globalDialogConfig, ...workflowDialogConfig },
        onClose: (): void => {
            workflowOnClose?.();
            globalOnClose?.();
        },

        ...otherGlobalErrorConfig,
        ...otherWorkflowErrorConfig,
    };

    const {
        initialScreenIndex = 0,
        successScreen = <RegistrationSuccessScreen />,
        existingAccountSuccessScreen = <ExistingAccountSuccessScreen />,
        isInviteRegistration,
        children = isInviteRegistration
            ? [
                  <EulaScreen key="EulaScreen" />,
                  <CreatePasswordScreen key="CreatePasswordScreen" />,
                  <AccountDetailsScreen key="AccountDetailsScreen" />,
              ]
            : [
                  <EulaScreen key="EulaScreen" />,
                  <CreateAccountScreen key="CreateAccountScreen" />,
                  <VerifyCodeScreen key="VerifyCodeScreen" />,
                  <CreatePasswordScreen key="CreatePasswordScreen" />,
                  <AccountDetailsScreen key="AccountDetailsScreen" />,
              ],
    } = props;

    const screens = [...(Array.isArray(children) ? children : [children])];
    const totalScreens = screens.length;
    const [currentScreen, setCurrentScreen] = useState(
        initialScreenIndex < 0 ? 0 : initialScreenIndex > totalScreens - 1 ? totalScreens - 1 : initialScreenIndex
    );
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const initialRegistrationWorkflowScreenData = {
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
    };
    const [screenData, setScreenData] = useState(initialRegistrationWorkflowScreenData);
    const [viewPagerIndex, setViewPagerIndex] = useState(0);
    const selectedPage = React.useRef(0);

    const updateScreenData = (data: IndividualScreenData): void => {
        const { Other }: { [key: string]: any } = screenData;
        const { screenId, values, isAccountExist: accountExists } = data;

        if (accountExists) {
            setIsAccountExist(accountExists);
            setShowSuccessScreen(accountExists);
        }

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

    const resetScreenData = (): void => {
        setScreenData(initialRegistrationWorkflowScreenData);
        setViewPagerIndex(viewPagerIndex + 1);
        setIsAccountExist(false);
        setCurrentScreen(0);
        setShowSuccessScreen(false);
        viewPagerRef.current?.setPage(0);
    };

    const [loading, setLoading] = useState(false);

    const finishRegistration = async (data: IndividualScreenData): Promise<void> => {
        try {
            setTimeout(() => {
                setLoading(true);
            }, timeOutDelay);
            if (actions && actions.completeRegistration) {
                const { Eula, CreateAccount, VerifyCode, CreatePassword, AccountDetails, Other } = screenData;
                const userInfo = {
                    ...Eula,
                    ...CreateAccount,
                    ...VerifyCode,
                    ...CreatePassword,
                    ...AccountDetails,
                    ...Other,
                    ...data.values,
                };
                return await actions
                    .completeRegistration(userInfo)
                    .then(({ email, organizationName }) => {
                        updateScreenData({
                            screenId: 'RegistrationSuccessScreen',
                            values: { email, organizationName },
                        });
                        setShowSuccessScreen(true);
                    })
                    .catch((_error) => {
                        triggerError(_error);
                    });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, timeOutDelay);
        }
    };

    useEffect(() => {
        if (isInviteRegistration === true) {
            const {
                initialRegistrationParams: { email, code },
            } = props;
            updateScreenData({ screenId: 'CreateAccount', values: { emailAddress: email } });
            updateScreenData({ screenId: 'VerifyCode', values: { code } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <RegistrationWorkflowContextProvider
            currentScreen={currentScreen}
            totalScreens={totalScreens}
            nextScreen={(data): Promise<void> | undefined => {
                try {
                    updateScreenData(data);
                    if (data.isAccountExist) {
                        setIsAccountExist(true);
                        setShowSuccessScreen(true);
                    }
                    if (currentScreen === totalScreens - 1) return finishRegistration(data);
                    setCurrentScreen((i) => i + 1);
                    viewPagerRef.current?.setPage(currentScreen + 1);
                } catch (_error) {
                    triggerError(_error as Error);
                }
            }}
            previousScreen={(data): void => {
                updateScreenData(data);
                if (currentScreen === 0) {
                    resetScreenData();
                    navigate(routeConfig.LOGIN as string);
                } else {
                    setCurrentScreen((i) => i - 1);
                    viewPagerRef.current?.setPage(currentScreen - 1);
                }
            }}
            screenData={screenData}
            updateScreenData={updateScreenData}
            resetScreenData={resetScreenData}
            isInviteRegistration={isInviteRegistration}
        >
            <ErrorManager {...errorDisplayConfig} mode="dialog">
                {showSuccessScreen ? (
                    isAccountExist ? (
                        existingAccountSuccessScreen
                    ) : (
                        successScreen
                    )
                ) : (
                    <PagerView
                        style={styles.pagerView}
                        initialPage={currentScreen ?? initialScreenIndex}
                        ref={viewPagerRef}
                        scrollEnabled={false}
                        collapsable={false}
                        key={viewPagerIndex}
                        onPageSelected={(e) => {
                            selectedPage.current = e.nativeEvent.position;
                        }}
                        onPageScrollStateChanged={(e) => {
                            if (e.nativeEvent.pageScrollState === 'idle') {
                                viewPagerRef.current?.setPageWithoutAnimation(0);
                                viewPagerRef.current?.setPageWithoutAnimation(selectedPage.current);
                            }
                        }}
                    >
                        {screens.map((screen, index) => (
                            <View style={{ flex: 1 }} key={index + 1}>
                                {screen}
                            </View>
                        ))}
                    </PagerView>
                )}
                {loading ? <Spinner visible={loading} /> : null}
            </ErrorManager>
        </RegistrationWorkflowContextProvider>
    );
};
