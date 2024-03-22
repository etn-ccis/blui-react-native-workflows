import { ErrorManagerProps } from '../../components/Error';
import { SetPasswordProps } from '../../components/SetPassword/types';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type ResetPasswordScreenProps = Omit<WorkflowCardProps, 'currentStep | totalSteps'> & {
    /**
     * The props that will be passed to the SetPassword component
     */
    PasswordProps?: SetPasswordProps;

    /**
     * Boolean that determines whether to show the success screen or not
     */
    showSuccessScreen?: boolean;

    /**
     * used to pass Success Screen component
     */
    successScreen?: JSX.Element;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
