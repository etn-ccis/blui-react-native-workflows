import React from 'react';
import { ImageBackground, ImageBackgroundProps, StyleSheet } from 'react-native';
import { Card, CardActionsProps, CardProps, CardTitleProps } from 'react-native-paper';
import { WorkflowCardInstructionProps } from './WorkflowCardInstructions';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner } from '../Spinner';
import defaultImage from '../../assets/images/background.png';
import { WorkflowCardHeader } from './WorkflowCardHeader';

// const MAX_CARD_HEIGHT = 730;
// const MAX_CARD_WIDTH = 450;
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
    backgroundImage?: string;
};

const makeStyles = (
    insets: EdgeInsets
): StyleSheet.NamedStyles<{
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
            height: 730,
            width: 450,
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
    return React.Children.toArray(children).some((child) => {
        // @todo replace with WorkflowCardHeader once it's created
        if (child.type === WorkflowCardHeader) {
            return true; // Found it!
        } else if (React.isValidElement(child)) {
            // Recursively check children of this element
            return hasWorkflowCardHeaderRecursive(child.props.children);
        }
        return false;
    });
}

export const WorkflowCard: React.FC<WorkflowCardBaseProps> = (props) => {
    const { loading, backgroundImage, children, style, ...otherImageProps } = props;
    const theme = useExtendedTheme();
    const { isTablet } = useScreenDimensions();

    const hasWorkflowCardHeader = hasWorkflowCardHeaderRecursive(children);
    const insets = useSafeAreaInsets();
    const styles = makeStyles(insets);

    return (
        <ImageBackground
            source={backgroundImage ? backgroundImage : defaultImage}
            resizeMode="repeat"
            style={[
                {
                    flex: 1,
                    // height: '100%',
                    // width: '100%',
                    justifyContent: 'center',
                    alignItems: isTablet ? 'center' : 'stretch',
                    paddingTop: !isTablet && !hasWorkflowCardHeader ? insets.top : 0,
                    // paddingBottom: isTablet ? 0 : insets.bottom,
                    backgroundColor: theme.colors.primary,
                },
                ...(Array.isArray(style) ? style : [style]),
            ]}
            {...otherImageProps}
        >
            <Card
                style={
                    {
                        // maxHeight: '100%',
                        // maxWidth: '100%',
                        // flex: 1,
                        // maxHeight: isTablet ? 730 : 'none',
                        // maxWidth: isTablet ? 450 : 'none',
                        // display: 'flex',
                    }
                }
                contentStyle={[
                    isTablet ? styles.tablet : styles.mobile,
                    {
                        backgroundColor: 'pink',
                        // height: height - insets.top -insets.bottom > 730 ? 730 : '100%',//isTablet ? 730 : '100%',
                        // width: width > 450 ? 450 : '100%',//isTablet ? 450 : '100%',
                        // maxHeight: '100%',//isTablet ? 730 : 'none',
                        // maxWidth: '100%',//isTablet ? 450 : 'none',
                        // display: 'flex',
                        // borderRadius: isTablet ? theme.roundness : 0,
                        // paddingBottom: isTablet ? 0 : insets.bottom,
                        // backgroundColor: 'pink'
                    },
                ]}
            >
                {loading ? <Spinner visible={loading} /> : children}
            </Card>
        </ImageBackground>
    );
};
