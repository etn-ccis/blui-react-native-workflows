import { TextInputProps } from 'react-native-paper';
import { ErrorManagerProps, WorkflowCardProps } from '../../components';

export type ForgotPasswordScreenProps = WorkflowCardProps & {
    /**
     * label for the textfield
     */
    emailLabel?: string;

    /**
     * used to pre-populate the email input field
     */
    initialEmailValue?: string;

    /**
     * used to test the input for valid formatting
     * @param {string} email - validate format via EMAIL_REGEX
     * @returns boolean | string
     */
    emailValidator?: (email: string) => boolean | string;

    /**
     * used to pass Success Screen component
     */
    successScreen: JSX.Element;

    /**
     * used to display contact phone number
     */
    contactPhone?: string;

    /**
     * used to display response time
     */
    responseTime?: string;

    /**
     * used to update the instruction
     * @param {string} responseTime - will add the response time in instructions through desciption function
     * @returns React.ReactNode
     */
    description?: (responseTime: string) => React.ReactNode;

    /**
     * used to determine whether to show a success screen after the form is submitted
     */
    showSuccessScreen?: boolean;

    /**
     * used to configure how errors are rendered
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * The props to pass to the email field.
     * See [RNP's TextInputProps API](https://callstack.github.io/react-native-paper/docs/components/TextInput/#props) for more details.
     */
    emailTextInputProps?: TextInputProps;
};
