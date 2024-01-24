import React from 'react';
import { View, ViewProps } from 'react-native';
import { Card, CardActionsProps, CardTitleProps } from 'react-native-paper';
import { WorkflowCardInstructionProps } from './WorkflowCardInstructions';
// import { useScreenWidth } from '../../hooks/useScreenWidth';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

type WorkflowCardBaseProps = ViewProps & {
    loading?: boolean;
    backgroundImage?: string;
};

type WorkflowCardHeaderProps = CardTitleProps;

type WorkflowCardActionsProps = CardActionsProps;

export type WorkflowCardProps = {
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};

export const WorkflowCard: React.FC<WorkflowCardBaseProps> = (props) => {
    const { children, ...otherViewProps } = props;
    const theme = useExtendedTheme();
    // const isTablet = useScreenWidth();

    return (
        <View
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: theme.colors.background,
                // backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${defaultBackgroundImage})`,
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            {...otherViewProps}
        >
            <Card
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}
            >
                {children}
            </Card>
        </View>
    );
};
