import React from 'react';
import { ResetPasswordScreenProps } from './types';
import {
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardBody,
    WorkflowCardInstructions,
    SetPassword,
    WorkflowCardActions,
    ErrorManager,
} from '../../components';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';

/**
 * Component that renders a ResetPassword screen that allows a user to reset their password and shows a success message upon a successful password reset..
 *
 * @param {ResetPasswordScreenProps} props - props for Reset Password Screen Base component.
 *
 * @category Component
 *
 */

export const ResetPasswordScreenBase: React.FC<ResetPasswordScreenProps> = (props) => {
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };
    const { showSuccessScreen, SuccessScreen, successScreenProps, errorDisplayConfig } = props;

    const getSuccessScreen = (
        _props: SuccessScreenProps,
        _successScreen?: (props: SuccessScreenProps) => JSX.Element
    ): JSX.Element => (_successScreen ? _successScreen(_props) : <SuccessScreenBase {..._props} />);

    return (
        <>
            {showSuccessScreen ? (
                getSuccessScreen(successScreenProps ?? {}, SuccessScreen)
            ) : (
                <WorkflowCard {...cardBaseProps}>
                    <WorkflowCardHeader {...headerProps} />
                    <WorkflowCardInstructions {...instructionsProps} divider />
                    <WorkflowCardBody>
                        <ErrorManager {...errorDisplayConfig}>
                            <SetPassword {...passwordProps} />
                        </ErrorManager>
                    </WorkflowCardBody>
                    <WorkflowCardActions {...actionsProps} divider />
                </WorkflowCard>
            )}
        </>
    );
};
