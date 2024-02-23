import { ErrorManagerProps, SetPasswordProps } from '../../components';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type CreatePasswordScreenProps = WorkflowCardProps & {
    /**
     * @param {SetPasswordProps} PasswordProps - The props passed for SetPassword component
     */
    PasswordProps?: SetPasswordProps;

    /**
     * @param {ErrorManagerProps} errorDisplayConfig - The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
