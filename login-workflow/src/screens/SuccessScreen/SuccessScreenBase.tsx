import React from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import { SuccessScreenProps } from './types';
import { EmptyState } from '@brightlayer-ui/react-native-components';
import { View, StyleSheet, ViewStyle } from 'react-native';

const makeStyles = (): StyleSheet.NamedStyles<{
    emptyStateContainer: ViewStyle;
}> =>
    StyleSheet.create({
        emptyStateContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
    });

/**
 * Component that renders a success screen
 *
 * @param {SuccessScreenProps} props - Basic props of Success Screen component
 *
 * @category Component
 */

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const { icon, messageTitle = '', message = '', dismissButtonLabel = '', canDismiss, onDismiss , ...emptyStateProps} = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const bodyProps = props.WorkflowCardBodyProps || {};
    const styles = makeStyles();

    return (
        <WorkflowCard {...cardBaseProps}>
            {Object.keys(headerProps).length !== 0 && <WorkflowCardHeader {...headerProps} />}
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody scrollable={false} {...bodyProps}>
                <View style={[styles.emptyStateContainer]}>
                    <EmptyState icon={icon} title={messageTitle} description={message} {...emptyStateProps} />
                </View>
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
