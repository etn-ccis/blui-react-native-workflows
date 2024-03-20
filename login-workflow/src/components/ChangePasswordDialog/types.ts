import { TextInputProps } from 'react-native-paper';
import { SuccessScreenProps } from '../../screens';
import { SetPasswordProps } from '../SetPassword';
import { WorkflowCardProps } from '../WorkflowCard';
import { ErrorManagerProps } from '../Error';

export type ChangePasswordDialogSlots = {
    SuccessScreen?: (props?: SuccessScreenProps) => JSX.Element;
};

export type ChangePasswordDialogSlotsProps = {
    SuccessScreen?: SuccessScreenProps;
};

export type ChangePasswordDialogProps = WorkflowCardProps & { PasswordProps?: SetPasswordProps } & {
    /**
     * The label to display for the current password field
     */
    currentPasswordLabel?: string;

    /**
     * Function called when the current password field changes
     * @param {string} currentPassword - the updated value from the currentPassword field
     * @returns void
     */
    currentPasswordChange?: (currentPassword: string) => void;

    /**
     * Configure whether the next button is enabled or disabled.
     */
    enableButton?: boolean | (() => boolean);

    /**
     * Function called when the button is clicked on success screen
     * @returns void
     */
    onFinish?: () => void;

    /**
     * The props to pass to the current password field.
     * See React Native Paper [TextInputProps API](https://callstack.github.io/react-native-paper/docs/components/TextInput/) for more details.
     */
    currentPasswordTextInputProps?: TextInputProps;

    /**
     * Used to determine whether to show a success screen after the form is submitted
     */
    showSuccessScreen?: boolean;

    /**
     * Used for ChangePasswordDialog SuccessScreen
     */
    slots?: ChangePasswordDialogSlots;

    /**
     * Applied to slot from SuccessScreen
     */
    slotProps?: ChangePasswordDialogSlotsProps;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
