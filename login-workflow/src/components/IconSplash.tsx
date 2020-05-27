/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = () =>
    StyleSheet.create({
        iconContainer: {
            flex: 1,
            justifyContent: 'center',
        },
    });

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = (theme: Theme, iconSize: number) =>
    StyleSheet.create({
        circleIconBackground: {
            marginTop: 20,
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize / 2,
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
    });

/**
 * @param icon  (Optional) Icon to use in the icon splash component. Icon 'vpn-key' used if not specified.
 * @param style  (Optional) Custom style to style the icon splash.
 * @param iconSize  (Optional) Size to use for the icon. Size of 90 is used if not specified.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type IconSplashProps = {
    icon?: string;
    style?: StyleProp<ViewStyle>;
    iconSize?: number;
    theme?: Theme;
};

/**
 * Renders a white icon on a blue circular background, as commonly used on flow success screens.
 *
 * @category Component
 */
export const IconSplash: React.FC<IconSplashProps> = (props) => {
    const { icon, iconSize = 90, style } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles(theme, iconSize);
    const containerStyles = makeContainerStyles();

    return (
        <View style={[containerStyles.iconContainer, style]}>
            <View style={styles.circleIconBackground}>
                <MatIcon name={icon ?? 'vpn-key'} size={iconSize * 0.55} color={theme.colors.surface} />
            </View>
        </View>
    );
};
