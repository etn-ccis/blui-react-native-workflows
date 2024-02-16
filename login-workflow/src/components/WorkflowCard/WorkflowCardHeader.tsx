import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon } from '@brightlayer-ui/react-native-components';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from 'color';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { WorkflowCardHeaderProps } from './WorkflowCard.types';

const makeStyles = (
    theme: ExtendedTheme
): StyleSheet.NamedStyles<{
    Header: ViewStyle;
    title: ViewStyle;
    headerContent: ViewStyle;
}> =>
    StyleSheet.create({
        Header: {
            height: 60,
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
            return <Icon source={icon} color={iconColor || theme.colors.onPrimary} size={18} />;
        }
        return <Icon source={{ name: 'close' }} color={iconColor || theme.colors.onPrimary} size={24} />;
    };
    return (
        <View>
            {!isTablet && (
                <View style={{ backgroundColor: backgroundColor || theme.colors.primary, height: statusBarHeight }}>
                    <StatusBar
                        barStyle={
                            Color(backgroundColor || theme.colors.primary).isDark() ? 'light-content' : 'dark-content'
                        }
                    />
                </View>
            )}
            <View
                style={[{ backgroundColor: backgroundColor || theme.colors.primary }, defaultStyles.Header, style]}
                {...otherprops}
            >
                <TouchableOpacity testID="workflow-card-icon" onPress={onIconPress}>
                    {getIcon()}
                </TouchableOpacity>
                <View style={defaultStyles.headerContent}>
                    <Text
                        variant="titleLarge"
                        style={[{ color: textColor || theme.colors.onPrimary }, defaultStyles.title]}
                    >
                        {title}
                    </Text>
                    {subTitle && (
                        <Text variant="bodyLarge" style={[{ color: textColor || theme.colors.onPrimary }]}>
                            {subTitle}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};
