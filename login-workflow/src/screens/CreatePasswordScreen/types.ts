import { ErrorManagerProps, SetPasswordProps } from '../../components';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type CreatePasswordScreenProps = WorkflowCardProps & {
    /**
     * The props passed for SetPassword component
     */
    PasswordProps?: SetPasswordProps;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
