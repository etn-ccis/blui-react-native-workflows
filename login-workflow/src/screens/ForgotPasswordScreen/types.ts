import { TextInputProps } from 'react-native-paper';
import { ErrorManagerProps, WorkflowCardProps } from '../../components';

export type ForgotPasswordScreenProps = WorkflowCardProps & {
    emailLabel?: string;
    initialEmailValue?: string;
    emailValidator?: (email: string) => boolean | string;
    successScreen: JSX.Element; // new prop instead of slot
    contactPhone?: string;
    responseTime?: string;
    description?: (responseTime: string) => React.ReactNode;
    showSuccessScreen?: boolean;
    errorDisplayConfig?: ErrorManagerProps;
    emailTextInputFieldProps?: TextInputProps;
};
