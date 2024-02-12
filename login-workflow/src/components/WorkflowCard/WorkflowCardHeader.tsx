import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { IconSource } from '@brightlayer-ui/react-native-components/core/__types__';
import { Icon } from '@brightlayer-ui/react-native-components';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from 'color';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

export type WorkflowCardHeaderProps = Omit<ViewProps, 'children'> & {
    /**
     * Text to display as title in Header
     */
    title: string;
    /**
     * Text to display as subtitle in Header
     */
    subTitle?: string;
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
     * The text color of Header
     * @default theme.colors.onPrimary
     */
    textColor?: string;
    /**
     * The icon color of Header
     * @default theme.colors.onPrimary
     */
    iconColor?: string;
    /**
     * Icon to be shown on left side of Header
     * @default close
     */
    icon?: IconSource;
};

const makeStyles = (
    theme: ExtendedTheme
): StyleSheet.NamedStyles<{
    Header: ViewStyle;
    title: ViewStyle;
    headerContent: ViewStyle;
}> =>
    StyleSheet.create({
        Header: {
            height: 64,
            paddingHorizontal: 16,
            paddingVertical: 12,
            alignItems: 'center',
            flexDirection: 'row',
        },
        title: {
            fontFamily: theme.fonts.labelLarge.fontFamily,
        },
        headerContent: {
            marginLeft: 30,
            justifyContent: 'center',
        },
    });
/**
 * Component that renders the Header for the workflow card.
 *
 * @param {string} [title] - text to display as title in header
 * @param {string} [subTitle] - text to display as subtitle in header
 * @param {string} [backgroundColor] - background color of header Default: theme.colors.primary
 * @param {string} [textColor] - text color of header Default: theme.colors.onPrimary
 * @param {string} [iconColor] - icon color of header Default: theme.colors.onPrimary
 * @param {IconSource} [icon] - icon to be shown on left side of header Default:close
 * @param {() => void} [onIconPress] - on press functionality for the icon
 *
 */
export const WorkflowCardHeader: React.FC<WorkflowCardHeaderProps> = (props) => {
    const { title, subTitle, backgroundColor, textColor, iconColor, icon, style, onIconPress, ...otherprops } = props;
    const theme = useExtendedTheme();
    const defaultStyles = makeStyles(theme);
    const { isTablet } = useScreenDimensions();
    const insets = useSafeAreaInsets();
    const statusBarHeight = insets.top;
    const getIcon = (): JSX.Element | undefined => {
        if (icon) {
            return <Icon source={icon} color={iconColor || theme.colors.onSurface} size={18} />;
        }
        return <Icon source={{ name: 'close' }} color={iconColor || theme.colors.onSurface} size={24} />;
    };
    return (
        <View>
            {!isTablet && (
                <View
                    style={{
                        backgroundColor: backgroundColor || theme.colors.primaryContainer,
                        height: statusBarHeight,
                    }}
                >
                    <StatusBar
                        barStyle={
                            Color(backgroundColor || theme.colors.primaryContainer).isDark()
                                ? 'light-content'
                                : 'dark-content'
                        }
                    />
                </View>
            )}
            <View
                style={[
                    { backgroundColor: backgroundColor || theme.colors.primaryContainer },
                    defaultStyles.Header,
                    style,
                ]}
                {...otherprops}
            >
                <TouchableOpacity testID="workflow-card-icon" onPress={onIconPress}>
                    {getIcon()}
                </TouchableOpacity>
                <View style={defaultStyles.headerContent}>
                    <Text
                        variant="titleLarge"
                        style={[{ color: textColor || theme.colors.onPrimaryContainer }, defaultStyles.title]}
                    >
                        {title}
                    </Text>
                    {subTitle && (
                        <Text variant="bodyMedium" style={[{ color: textColor || theme.colors.onPrimaryContainer }]}>
                            {subTitle}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};
