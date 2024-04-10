import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { Trans, useTranslation } from 'react-i18next';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';

const makeStyles = (): StyleSheet.NamedStyles<{
    boldText: TextStyle;
}> =>
    StyleSheet.create({
        boldText: {
            fontWeight: 'bold',
        },
    });

/**
 * Component that renders a success screen for when registration completes.
 *
 * @param {SuccessScreenProps} props - Props of SuccessScreen component
 *
 * @category Component
 */
export const RegistrationSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const { t } = useTranslation();
    const styles = makeStyles();
    const { navigate, routeConfig } = useRegistrationContext();
    const {
        screenData: {
            AccountDetails: { firstName, lastName },
            CreateAccount: { emailAddress: email },
            Other: {
                // @ts-ignore
                RegistrationSuccessScreen: { organizationName: organization },
            },
        },
        resetScreenData,
    } = useRegistrationWorkflowContext();

    const Bold = ({ children }: { children: React.ReactNode }): JSX.Element => (
        <Text style={styles.boldText}>{children}</Text>
    );

    const {
        icon = { family: 'material', name: 'check-circle' },
        messageTitle = `${t('bluiCommon:MESSAGES.WELCOME')}, ${firstName} ${lastName}!`,
        message = (
            <Text variant={'bodyMedium'}>
                <Trans
                    i18nKey={
                        email
                            ? 'bluiRegistration:REGISTRATION.SUCCESS_MESSAGE_ALT'
                            : 'bluiRegistration:REGISTRATION.SUCCESS_MESSAGE_ALT_WITHOUT_EMAIL_PROVIDED'
                    }
                    values={{ email, organization }}
                    components={{ boldTag: <Bold>{email}</Bold> }}
                >
                    <Text variant={'bodyMedium'}>
                        Your account has successfully been created with the email {email} belonging to the
                        {` ${String(organization)}`} org.
                    </Text>
                </Trans>
            </Text>
        ),
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        WorkflowCardBodyProps,
        ...otherRegistrationSuccessScreenProps
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.COMPLETE'),
        ...WorkflowCardHeaderProps,
        onIconPress: (): void => {
            navigate(routeConfig.LOGIN as string);
            resetScreenData();
        },
    };

    const workflowCardBodyProps = {
        scrollable: false,
        ...WorkflowCardBodyProps,
    };

    const workflowCardActionsProps = {
        nextLabel: t('bluiCommon:ACTIONS.FINISH'),
        showNext: true,
        canGoNext: canDismiss,
        fullWidthButton: true,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            onDismiss();
            resetScreenData();
            WorkflowCardActionsProps?.onNext?.();
        },
    };

    return (
        <SuccessScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            WorkflowCardBodyProps={workflowCardBodyProps}
            icon={icon}
            messageTitle={messageTitle}
            message={message}
            {...otherRegistrationSuccessScreenProps}
        />
    );
};
