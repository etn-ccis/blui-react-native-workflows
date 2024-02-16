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
    theme: ExtendedTheme,
    isTablet: boolean,
    backgroundColor?: string,
    textColor?: string
): StyleSheet.NamedStyles<{
    header: ViewStyle;
    mobileHeader: ViewStyle;
    tabletHeader: ViewStyle;
    headerContent: ViewStyle;
    headerText: ViewStyle;
}> =>
    StyleSheet.create({
        header: {
            height: 64,
            paddingHorizontal: 16,
            paddingVertical: 12,
            alignItems: 'center',
            flexDirection: 'row',
        },
        mobileHeader: {
            backgroundColor: backgroundColor || theme.colors.primaryContainer,
        },
        tabletHeader: {
            backgroundColor: backgroundColor || 'transparent',
        },
        headerContent: {
            marginLeft: 30,
            justifyContent: 'center',
            color: textColor || isTablet ? theme.colors.onSurface : theme.colors.onPrimaryContainer,
        },
        headerText: {
            color: textColor || isTablet ? theme.colors.onSurface : theme.colors.onPrimaryContainer,
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
    const { isTablet } = useScreenDimensions();
    const defaultStyles = makeStyles(theme, isTablet, backgroundColor, textColor);
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
                    isTablet ? defaultStyles.tabletHeader : defaultStyles.mobileHeader,
                    defaultStyles.header,
                    style,
                ]}
                {...otherprops}
            >
                <TouchableOpacity testID="workflow-card-icon" onPress={onIconPress}>
                    {getIcon()}
                </TouchableOpacity>
                <View style={defaultStyles.headerContent}>
                    <Text variant="titleLarge" style={[defaultStyles.headerText]}>
                        {title}
                    </Text>
                    {subTitle && (
                        <Text variant="bodyMedium" style={[defaultStyles.headerText]}>
                            {subTitle}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};
