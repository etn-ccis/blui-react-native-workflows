import { useCallback, useState } from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';

type EulaScreenProps = {
    /**
     * Used to pre-populate the checked/unchecked checkbox when the screen loads
     * @default false
     */
    initialCheckboxValue?: boolean;
};

export const EulaScreen: React.FC<EulaScreenProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const {
        nextScreen,
        previousScreen,
        screenData,
        currentScreen,
        totalScreens,
        isInviteRegistration,
        updateScreenData,
    } = regWorkflow;
    const { initialCheckboxValue, ...otherEulaScreenProps } = props;

    // const eulaAccepted = initialCheckboxValue ? initialCheckboxValue : screenData.Eula.accepted;
    const [eulaAccepted, setEulaAccepted] = useState(
        initialCheckboxValue ? initialCheckboxValue : screenData.Eula.accepted
    );
    // const [isLoading, setIsLoading] = useState(true);
    // const [eulaData, setEulaData] = useState<string | JSX.Element>();
    // const [eulaFetchError, setEulaFetchError] = useState(false);

    // const loadAndCacheEula = useCallback(async (): Promise<void> => {
    //     setIsLoading(true);
    //     if (!eulaContent) {
    //         setEulaData(t('bluiRegistration:REGISTRATION.EULA.LOADING'));
    //         try {
    //             const eulaText = await actions?.loadEula?.(language);
    //             setEulaData(eulaText);
    //             setIsLoading(false);
    //         } catch (_error) {
    //             triggerError(_error as Error);
    //             setEulaFetchError(true);
    //             setIsLoading(false);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     } else {
    //         setIsLoading(false);
    //         setEulaData(eulaContent);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [eulaContent, t, actions, language]);

    const onNext = useCallback(async (): Promise<void> => {
        void nextScreen({
            screenId: 'Eula',
            values: { accepted: screenData.Eula.accepted },
            isAccountExist: false,
        });
    }, [nextScreen, isInviteRegistration, screenData, updateScreenData]);

    const onPrevious = useCallback((): void => {
        previousScreen({
            screenId: 'Eula',
            values: { accepted: eulaAccepted },
        });
    }, [previousScreen, eulaAccepted]);

    const updateEulaAcceptedStatus = useCallback(
        (accepted: boolean): void => {
            screenData.Eula = { ...screenData, accepted };
            // props?.onEulaAcceptedChange?.(accepted);
            setEulaAccepted(accepted);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [screenData]
    );

    // const {
    //     checkboxProps = { ...props.checkboxProps, disabled: eulaFetchError },
    //     onRefetch = (): void => {
    //         setEulaFetchError(false);
    //         void loadAndCacheEula();
    //     },
    // } = props;

    // const workflowCardHeaderProps = {
    //     title: t('bluiRegistration:REGISTRATION.STEPS.LICENSE'),
    //     ...WorkflowCardHeaderProps,
    // };

    // const workflowCardActionsProps = {
    //     showNext: true,
    //     nextLabel: t('bluiCommon:ACTIONS.NEXT'),
    //     canGoNext: true,
    //     showPrevious: true,
    //     previousLabel: t('bluiCommon:ACTIONS.BACK'),
    //     canGoPrevious: true,
    //     currentStep: currentScreen,
    //     totalSteps: totalScreens,
    //     ...WorkflowCardActionsProps,
    //     onNext: (): void => {
    //         void onNext();
    //         WorkflowCardActionsProps?.onNext?.();
    //     },
    //     onPrevious: (): void => {
    //         void onPrevious();
    //         WorkflowCardActionsProps?.onPrevious?.();
    //     },
    // };

    return <Text>Eula Screen</Text>;
};
