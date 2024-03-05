import { TextInputProps } from 'react-native-paper';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type AccountDetailsScreenProps = WorkflowCardProps & {
    /**
     * The label for the first name text field
     */
    firstNameLabel?: string;

    /**
     * The initial value for the first name text field
     */
    initialFirstName?: string;

    /**
     * @param {(firstName:string)=>boolean|string} firstNameValidator - The function that validates the first name text field
     * @returns boolean | string
     */
    firstNameValidator?: (firstName: string) => boolean | string;

    /**
     * The props to pass to the first name field.
     * See [React Native Paper's TextInputProps API](https://callstack.github.io/react-native-paper/docs/components/TextInput/#props) for more details.
     */
    firstNameTextInputProps?: TextInputProps;

    /**
     * The label for the last name text field
     */
    lastNameLabel?: string;

    /**
     * The initial value for the last name text field
     */
    initialLastName?: string;

    /**
     * @param {(lastName:string)=>boolean|string} lastNameValidator - The function that validates the last name text field
     * @returns boolean | string
     */
    lastNameValidator?: (lastName: string) => boolean | string;

    /**
     * The props to pass to the last name field.
     * See [React Native Paper's TextInputProps API](https://callstack.github.io/react-native-paper/docs/components/TextInput/#props) for more details.
     */
    lastNameTextInputProps?: TextInputProps;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
