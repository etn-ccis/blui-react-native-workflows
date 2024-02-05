import React from 'react';
import { ImageBackground, ImageBackgroundProps, ImageSourcePropType, StyleSheet } from 'react-native';
import { Card, CardActionsProps, CardProps, CardTitleProps } from 'react-native-paper';
import { WorkflowCardInstructionProps } from './WorkflowCardInstructions';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner } from '../Spinner';
import defaultImage from '../../assets/images/background.png';
import { WorkflowCardHeader } from './WorkflowCardHeader';

const MAX_CARD_HEIGHT = 730;
const MAX_CARD_WIDTH = 450;
/**
 * Component that renders the workflow card that is used for all screen components.
 *
 * @param loading boolean value for isLoading
 * @param backgroundImage to display card background
 *
 * @category Component
 */
export type WorkflowCardBaseProps = ImageBackgroundProps & {
    /**
     * If true, a blocking progress spinner will be displayed over the card
     */
    loading?: boolean;
    /**
     * A custom background to render behind the card
     */
    backgroundImage?: ImageSourcePropType;
};

const makeStyles = ({
    insets,
    theme,
}: {
    insets: EdgeInsets;
    theme: ExtendedTheme;
}): StyleSheet.NamedStyles<{
    mobile: CardProps['style'];
    tablet: CardProps['style'];
}> =>
    StyleSheet.create({
        mobile: {
            paddingBottom: insets.bottom,
            height: '100%',
            width: '100%',
            borderRadius: 0,
        },
        tablet: {
            height: MAX_CARD_HEIGHT,
            width: MAX_CARD_WIDTH,
            borderRadius: theme.roundness * 2,
            overflow: 'hidden',
        },
    });

export type WorkflowCardHeaderProps = CardTitleProps;

export type WorkflowCardActionsProps = CardActionsProps;

export type WorkflowCardProps = {
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};

function hasWorkflowCardHeaderRecursive(children: any): boolean {
    return React.Children.toArray(children).some((child) => (child as JSX.Element).type === WorkflowCardHeader);
}

export const WorkflowCard: React.FC<WorkflowCardBaseProps> = (props) => {
    const { loading, backgroundImage, children, style, ...otherImageProps } = props;
    const theme = useExtendedTheme();
    const { isTablet, width, height } = useScreenDimensions();

    const hasWorkflowCardHeader = hasWorkflowCardHeaderRecursive(children);
    const insets = useSafeAreaInsets();
    const styles = makeStyles({ insets, theme });

    return (
        <ImageBackground
            source={backgroundImage ? backgroundImage : defaultImage}
            resizeMode="repeat"
            style={[
                {
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: isTablet ? 'center' : 'stretch',
                    backgroundColor: theme.colors.primary,
                },
                ...(Array.isArray(style) ? style : [style]),
            ]}
            {...otherImageProps}
        >
            <Card
                style={{
                    maxHeight: height,
                    maxWidth: width,
                }}
                contentStyle={[
                    isTablet ? styles.tablet : styles.mobile,
                    {
                        backgroundColor: theme.colors.surface,
                        paddingTop: !isTablet && !hasWorkflowCardHeader ? insets.top : 0,
                    },
                ]}
            >
                {loading ? <Spinner visible={loading} /> : children}
            </Card>
        </ImageBackground>
    );
};
