import React from 'react';
import {
    ErrorManager,
    SetPassword,
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components';
import { CreatePasswordScreenProps } from './types';

export const CreatePasswordScreenBase: React.FC<CreatePasswordScreenProps> = (props) => {
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };
    const { errorDisplayConfig } = props;

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader onIconPress={actionsProps.onPrevious} {...headerProps} />
            <WorkflowCardInstructions {...instructionsProps} />
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <SetPassword {...passwordProps} />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} />
        </WorkflowCard>
    );
};