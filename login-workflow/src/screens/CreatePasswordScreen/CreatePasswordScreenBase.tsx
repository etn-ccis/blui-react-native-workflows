import React from 'react';
import {
    ErrorManager,
    SetPassword,
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
} from '../../components';
import { CreatePasswordScreenProps } from './types';

/**
 * Component that displays text fields to create a new user's password.
 *
 * @param {CreatePasswordScreenProps} props - props for Create Password Screen Base component.
 *
 * @category Component
 */
export const CreatePasswordScreenBase: React.FC<CreatePasswordScreenProps> = (props) => {
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const cardBodyProps = props.WorkflowCardBodyProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };
    const { errorDisplayConfig } = props;

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody {...cardBodyProps}>
                <ErrorManager {...errorDisplayConfig}>
                    <SetPassword {...passwordProps} />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} />
        </WorkflowCard>
    );
};
