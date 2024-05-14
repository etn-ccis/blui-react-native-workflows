import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { Trans, useTranslation } from 'react-i18next';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';
import { IconFamily } from '@brightlayer-ui/react-native-components/core/__types__';

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
    const CheckCircleIcon: IconFamily = { family: 'material-community', name: 'check-circle', direction: 'ltr' };
    const Bold = ({ children }: { children: React.ReactNode }): JSX.Element => (
        <Text style={styles.boldText}>{children}</Text>
    );

    const {
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        WorkflowCardBodyProps,
        EmptyStateProps,
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
    const emptyStatesProps = {
        icon: CheckCircleIcon,
        title: `${t('bluiCommon:MESSAGES.WELCOME')}, ${firstName} ${lastName}!`,
        description: (
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
        ...EmptyStateProps,
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
            WorkflowCardBodyProps={workflowCardBodyProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            EmptyStateProps={emptyStatesProps}
            {...otherRegistrationSuccessScreenProps}
        />
    );
};
