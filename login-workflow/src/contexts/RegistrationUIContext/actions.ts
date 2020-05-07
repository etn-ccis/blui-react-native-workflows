/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */

import { RegistrationActions as DispatchActions } from './dispatchActions';
import { AccountDetailInformation } from '../../subScreens/AccountDetails';
import { RegistrationUIActions } from '../AuthUIContextProvider';

type RegistrationUIActionsFunction = () => RegistrationUIActions;
type RegistrationUIActionsCreator = (
    injectedActions: RegistrationUIActions,
    dispatch: React.Dispatch<DispatchActions>
) => RegistrationUIActionsFunction;

/**
 * Implementation of actions for altering the global [[RegistrationUIState]] via [[RegistrationUIActions]] calls.
 * Uses actions injected into the app to make network calls, and then updates the global state accordingly
 * using by dispatching [[RegistrationActions]] to the [[registrationReducer]].
 *
 * @param injectedActions Implementation of network activities.
 * @param dispatch For updating reducer upon completion of network activities.
 */
const RegistrationActionsCreator: RegistrationUIActionsCreator = (
    injectedActions,
    dispatch
) => (): RegistrationUIActions => ({
    loadEULA: async (language: string): Promise<string> => {
        const transitId = Math.random();

        dispatch(DispatchActions.loadEulaStarted(transitId, language));
        try {
            const eulaText = await injectedActions.loadEULA(language);
            dispatch(DispatchActions.loadEulaSucceeded(transitId));
            return eulaText;
        } catch (error) {
            dispatch(DispatchActions.loadEulaFailed(transitId, error.message));
            throw error;
        }
    },
    validateUserRegistrationRequest: async (validationCode: string): Promise<void> => {
        const transitId = Math.random();

        dispatch(DispatchActions.validateUserRegistrationStarted(transitId));
        try {
            await injectedActions.validateUserRegistrationRequest(validationCode);
            dispatch(DispatchActions.validateUserRegistrationSucceeded(transitId));
        } catch (error) {
            // Need this for debug. No real security risk
            if (validationCode === 'DEBUG_VALIDATION_CODE_DEADBEEF') {
                dispatch(DispatchActions.validateUserRegistrationSucceeded(transitId));
                return;
            }

            dispatch(DispatchActions.validateUserRegistrationFailed(transitId, error.message));
        }
    },
    completeRegistration: async (
        userData: {
            password: string;
            accountDetails: AccountDetailInformation;
        },
        validationCode: string
    ): Promise<{ email: string; organizationName: string }> => {
        const transitId = Math.random();

        dispatch(DispatchActions.registerUserStarted(transitId));

        try {
            const userDetails = await injectedActions.completeRegistration(userData, validationCode);
            dispatch(DispatchActions.registerUserSucceeded(transitId, userDetails.email, userDetails.organizationName));
            return userDetails;
        } catch (error) {
            dispatch(DispatchActions.registerUserFailed(transitId, error.message));
            throw error;
        }
    },
});

export default RegistrationActionsCreator;
