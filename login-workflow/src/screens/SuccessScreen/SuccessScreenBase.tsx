import React from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import { SuccessScreenProps } from './types';
import { WorkflowCardFinishState } from '../../components';

/**
 * Component that renders a success screen
 *
 * @param {SuccessScreenProps} props - Basic props of Success Screen component
 *
 * @category Component
 */

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const { icon, messageTitle = '', message = '', dismissButtonLabel = '', canDismiss, onDismiss } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody>
                <WorkflowCardFinishState icon={icon} title={messageTitle} description={message} />
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                nextLabel={dismissButtonLabel || actionsProps.nextLabel}
                canGoNext={canDismiss || actionsProps.canGoNext}
                onNext={(): void => {
                    if (onDismiss) onDismiss();
                    if (actionsProps.onNext) actionsProps.onNext();
                }}
            />
        </WorkflowCard>
    );
};
