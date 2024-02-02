import React from 'react';
import { ImageBackground, ImageSourcePropType, View, ViewProps } from 'react-native';
import { Card, CardActionsProps, CardTitleProps } from 'react-native-paper';
import { WorkflowCardInstructionProps } from './WorkflowCardInstructions';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WorkflowCardBody } from './WorkflowCardBody';
import { Spinner } from '../Spinner';
import defaultImage from '../../assets/images/background.png';

/**
 * Component that renders the workflow card that is used for all screen components.
 *
 * @param loading boolean value for isLoading
 * @param backgroundImage to display card background
 *
 * @category Component
 */
export type WorkflowCardBaseProps = ViewProps & {
    /**
     * If true, a blocking progress spinner will be displayed over the card
     */
    loading?: boolean;
    /**
     * A custom background to render behind the card
     */
    backgroundImage?: ImageSourcePropType;
};

export type WorkflowCardHeaderProps = CardTitleProps;

export type WorkflowCardActionsProps = CardActionsProps;

export type WorkflowCardProps = {
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};

function hasWorkflowCardHeaderRecursive(children: any): boolean {
    return React.Children.toArray(children).some((child) => {
        // @todo replace with WorkflowCardHeader once it's created
        if (child.type === WorkflowCardBody) {
            return true; // Found it!
        } else if (React.isValidElement(child)) {
            // Recursively check children of this element
            return hasWorkflowCardHeaderRecursive(child.props.children);
        }
        return false;
    });
}

export const WorkflowCard: React.FC<WorkflowCardBaseProps> = (props) => {
    const { loading, backgroundImage, children, ...otherViewProps } = props;
    const theme = useExtendedTheme();
    const isTablet = useScreenWidth();

    const hasWorkflowCardHeader = hasWorkflowCardHeaderRecursive(children);

    const insets = useSafeAreaInsets();
    const statusBarHeight = isTablet ? 0 : hasWorkflowCardHeader ? 0 : insets.top;

    return (
        <View
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flex: 1,
                backgroundColor: theme.colors.background,
            }}
            {...otherViewProps}
        >
            <ImageBackground
                source={backgroundImage ? backgroundImage : defaultImage}
                resizeMode="cover"
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: statusBarHeight,
                    paddingBottom: isTablet ? insets.bottom : 0,
                }}
            >
                <Card
                    contentStyle={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        maxHeight: isTablet ? 730 : 'none',
                        maxWidth: isTablet ? 450 : 'none',
                    }}
                    style={{
                        borderRadius: isTablet ? 4 : 0,
                        paddingBottom: isTablet ? 0 : insets.bottom,
                    }}
                >
                    {loading ? <Spinner visible={loading} /> : children}
                </Card>
            </ImageBackground>
        </View>
    );
};
