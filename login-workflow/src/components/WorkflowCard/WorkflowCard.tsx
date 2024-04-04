import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Card, CardProps } from 'react-native-paper';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner } from '../Spinner';
import { WorkflowCardBaseProps } from './WorkflowCard.types';
import { WorkflowCardHeader } from './WorkflowCardHeader';

const defaultImage = require('../../assets/images/background.png');

const MAX_CARD_HEIGHT = 730;
const MAX_CARD_WIDTH = 450;

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
            borderRadius: theme.roundness * 6,
            overflow: 'hidden',
        },
    });

function hasWorkflowCardHeaderRecursive(children: any): boolean {
    return React.Children.toArray(children).some((child) => (child as JSX.Element).type === WorkflowCardHeader);
}

/**
 * Component that renders the workflow card that is used for all screen components.
 *
 * @param {WorkflowCardBaseProps} props - Props of WorkflowCardBase component
 *
 * @category Component
 */
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
                    borderRadius: isTablet ? theme.roundness * 6 : 0,
                }}
                contentStyle={[
                    isTablet ? styles.tablet : styles.mobile,
                    {
                        backgroundColor: theme.colors.surfaceContainer,
                        paddingTop: !isTablet && !hasWorkflowCardHeader ? insets.top : 0,
                        position: 'relative',
                    },
                ]}
            >
                {children}
                {loading && <Spinner visible={loading} />}
            </Card>
        </ImageBackground>
    );
};
