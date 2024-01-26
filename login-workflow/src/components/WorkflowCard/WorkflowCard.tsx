import React from 'react';
import { ImageBackground, SafeAreaView, ViewProps } from 'react-native';
import { Card, CardActionsProps, CardTitleProps } from 'react-native-paper';
import { WorkflowCardInstructionProps } from './WorkflowCardInstructions';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

/**
 * Component that renders the workflow card that is used for all screen components.
 *
 * @param loading boolean value for isLoading
 * @param backgroundImage to display card background
 *
 * @category Component
 */

type WorkflowCardBaseProps = ViewProps & {
    /**
     * If true, a blocking progress spinner will be displayed over the card
     */
    loading?: boolean;
    /**
     * A custom background to render behind the card
     */
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
    const isTablet = useScreenWidth();

    const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

    return (
        <SafeAreaView
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: theme.colors.background,
                display: 'flex',
                flex: 1,
            }}
            {...otherViewProps}
        >
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <Card
                    style={{
                        height: isTablet ? 730 : '100%',
                        width: isTablet ? 450 : '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    }}
                >
                    {children}
                </Card>
            </ImageBackground>
        </SafeAreaView>
    );
};
