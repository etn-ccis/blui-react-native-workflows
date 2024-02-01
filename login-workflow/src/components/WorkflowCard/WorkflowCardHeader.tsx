import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { IconSource } from '@brightlayer-ui/react-native-components/core/__types__';
import { Icon } from '@brightlayer-ui/react-native-components';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { Text } from 'react-native-paper';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type WorkflowCardHeaderProps = Omit<ViewProps, 'children'> & {
    /**
     * Text to display as title in Header
     */
    title: string;
    /**
     * On press functionality for the icon
     */
    onIconPress: () => void;
    /**
     * The background color of Header
     * @default theme.colors.primary
     */
    backgroundColor?: string;
    /**
     * The text and icon color of Header
     * @default theme.colors.onPrimary
     */
    textColor?: string;
    /**
     * Icon to be shown on left side of Header
     * @default close
     */
    icon?: IconSource;
};

const makeStyles = (): StyleSheet.NamedStyles<{
    Header: ViewStyle;
    title: ViewStyle;
}> =>
    StyleSheet.create({
        Header: {
            height: 56,
            paddingHorizontal: 16,
            paddingVertical: 12,
            alignItems: 'center',
            flexDirection: 'row',
        },
        title: {
            marginLeft: 30,
            fontSize: 20,
        },
    });
/**
 * Component that renders the Header for the workflow card.
 *
 * @param {string} [title] - text to display as title in header
 * @param {string} [backgroundColor] - background color of header Default: theme.colors.primary
 * @param {string} [textColor] - text color and icon color of header Default: theme.colors.onPrimary
 * @param {IconSource} [icon] - icon to be shown on left side of header Default:close
 * @param {() => void} [onIconPress] - on press functionality for the icon
 *
 */
export const isLightColor = (color: string): boolean => {
    // Convert color to RGB
    const rgb = parseInt(color.replace('#', ''), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128;
};
export const WorkflowCardHeader: React.FC<WorkflowCardHeaderProps> = (props) => {
    const { title, backgroundColor, textColor, icon, style, onIconPress, ...otherprops } = props;
    const theme = useExtendedTheme();
    const defaultStyles = makeStyles();
    const isTablet = useScreenWidth();
    const insets = useSafeAreaInsets();
    const statusBarHeight = insets.top;
    const getIcon = (): JSX.Element | undefined => {
        if (icon) {
            return <Icon source={icon} color={textColor || theme.colors.onPrimary} size={18} />;
        }
        return <Icon source={{ name: 'close' }} color={textColor || theme.colors.onPrimary} size={24} />;
    };
    return (
        <View>
            {!isTablet && (
                <View style={{ backgroundColor: theme.colors.primary, height: statusBarHeight }}>
                    <StatusBar barStyle={isLightColor(theme.colors.primary) ? 'dark-content' : 'light-content'} />
                </View>
            )}
            <View
                style={[{ backgroundColor: backgroundColor || theme.colors.primary }, defaultStyles.Header, style]}
                {...otherprops}
            >
                <TouchableOpacity testID="workflow-card-icon" onPress={onIconPress}>
                    {getIcon()}
                </TouchableOpacity>
                <View>
                    <Text
                        variant="headlineSmall"
                        style={[{ color: textColor || theme.colors.onPrimary }, defaultStyles.title]}
                    >
                        {title}
                    </Text>
                </View>
            </View>
        </View>
    );
};
