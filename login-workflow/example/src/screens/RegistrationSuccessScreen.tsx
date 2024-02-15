import React from 'react';
import { SuccessScreenBase, SuccessScreenProps } from '@brightlayer-ui/react-native-auth-workflow';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
/**
 * Component that renders a success screen for when registration completes.
 *
 * @param icon the icon to be displayed on the screen
 * @param messageTitle title of the success message
 * @param message success message to be displayed on the screen
 * @param onDismiss function to call when user clicks button
 * @param canDismiss function to call when the dismiss button is clicked
 *
 * @category Component
 */

export const RegistrationSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const {
        icon = <MatIcon size={80} name="check-circle" />,
        messageTitle = 'Welcome John Doe',
        message = 'Your account has been successfully created with the email example@example.com.\n\nYour account has already been added to the Acme Co. organization.',
        canDismiss = true,
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        ...otherRegistrationSuccessScreenProps
    } = props;

    const workflowCardHeaderProps = {
        title: 'Success',
        ...WorkflowCardHeaderProps,
    };

    const workflowCardActionsProps = {
        nextLabel: 'Done',
        showNext: true,
        canGoNext: canDismiss,
        fullWidthButton: true,
        ...WorkflowCardActionsProps,
    };

    return (
        <SuccessScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            icon={icon}
            messageTitle={messageTitle}
            message={message}
            {...otherRegistrationSuccessScreenProps}
        />
    );
};
