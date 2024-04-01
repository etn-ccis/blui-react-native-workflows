/**
 * @packageDocumentation
 * @module RegistrationWorkflowContext
 */

export type ScreenData = {
    /**
     * @param {object} Eula - Contains data to indicate Eula is accepted or not.
     *
     */
    Eula: { accepted: boolean };
    /**
     * @param {object} CreateAccount - Stores email address of Create Account Screen.
     *
     */
    CreateAccount: { emailAddress: string };
    /**
     * @param {object} VerifyCode - Stores code of Verify Code Screen.
     *
     */
    VerifyCode: { code: string };
    /**
     * @param {object} CreatePassword - Stores password and confirmPassword of Create Password Screen.
     *
     */
    CreatePassword: { password: string; confirmPassword: string };
    /**
     * @param {object} AccountDetails - Stores firstName and lastName and extra fields of Account Details Screen.
     *
     */
    AccountDetails: { firstName: string; lastName: string; extra?: { [key: string]: boolean | string | number } };
    /**
     * @param {object} Other - Stores data of custom screen.
     *
     */
    Other?: { [key: string]: { [key: string]: boolean | string | number } };
};

export type IndividualScreenData =
    | { screenId: 'Eula'; values: ScreenData['Eula']; isAccountExist?: boolean }
    | { screenId: 'CreateAccount'; values: ScreenData['CreateAccount']; isAccountExist?: boolean }
    | { screenId: 'VerifyCode'; values: ScreenData['VerifyCode']; isAccountExist?: boolean }
    | { screenId: 'CreatePassword'; values: ScreenData['CreatePassword']; isAccountExist?: boolean }
    | { screenId: 'AccountDetails'; values: ScreenData['AccountDetails']; isAccountExist?: boolean }
    | { screenId: string; values: { [key: string]: boolean | string | number }; isAccountExist?: boolean };

export type RegistrationWorkflowContextProps = {
    /**
     * @param {number} currentScreen - The current screen in the registration workflow.
     *
     */
    currentScreen: number;
    /**
     * @param {number} totalScreens - The total number of screens in the registration workflow.
     *
     */
    totalScreens: number;
    /**
     * @param {IndividualScreenData} nextScreen - Update the data of the current screen while navigating to the next screen in the Registration Workflow Context.
     * @returns Promise<void> | undefined
     */
    nextScreen: (data: IndividualScreenData) => Promise<void> | undefined;
    /**
     * @param {IndividualScreenData} previousScreen - Update the data of the current screen while navigating to the previous screen in the Registration Workflow Context.
     * @returns Promise<void>
     */
    previousScreen: (data: IndividualScreenData) => void;
    /**
     * @returns {void} - Reset collected data/inputs of Registration Workflow.
     */
    resetScreenData: () => void;
    /**
     * @param {ScreenData} screenData - An object of data of all screens available in the Registration Workflow Context.
     *
     */
    screenData: ScreenData;
    /**
     * @param {IndividualScreenData} updateScreenData - Updates collected data/inputs throughout the Registration Workflow.
     */
    updateScreenData: (data: IndividualScreenData) => void;
    /**
     * @param {boolean} isInviteRegistration - Indicates whether this workflow is for invitation-based registration.
     */
    isInviteRegistration?: boolean;
};
