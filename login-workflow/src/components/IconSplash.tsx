/**
 * @packageDocumentation
 * @module Components
 */

import Color from 'color';
import React from 'react';
import * as Colors from '@brightlayer-ui/colors';

// Components
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

/**
 * @ignore
 */
const makeContainerStyles = (): Record<string, any> =>
    StyleSheet.create({
        iconContainer: {
            flex: 1,
            justifyContent: 'center',
        },
    });

/**
 * @ignore
 */
const makeStyles = (theme: ReactNativePaper.Theme, iconSize: number): Record<string, any> =>
    StyleSheet.create({
        circleIconBackground: {
            marginTop: 16,
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize / 2,
            backgroundColor: theme.colors.primaryBase || theme.colors.primary,
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
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders a white icon on a blue circular background, as commonly used on flow success screens.
 *
 * @category Component
 */
export const IconSplash: React.FC<IconSplashProps> = (props) => {
    const { icon, iconSize = 70, style } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles(theme, iconSize);
    const containerStyles = makeContainerStyles();
    const iconColor = Color(theme.colors.primaryBase || theme.colors.primary).isDark()
        ? Colors.white[50]
        : Colors.black[500];

    return (
        <View style={[containerStyles.iconContainer, style]}>
            <View style={styles.circleIconBackground}>
                <MatIcon name={icon ?? 'vpn-key'} size={iconSize * 0.55} color={iconColor} />
            </View>
        </View>
    );
};
