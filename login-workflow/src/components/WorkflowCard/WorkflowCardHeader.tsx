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
            paddingHorizontal: isTablet ? 24 : 16,
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
            marginLeft: 16,
            justifyContent: 'center',
            color: textColor || (isTablet ? theme.colors.onSurface : theme.colors.onPrimaryContainer),
        },
        headerText: {
            color: textColor || (isTablet ? theme.colors.onSurface : theme.colors.onPrimaryContainer),
        },
    });

/**
 * Component that renders the Header for the workflow card.
 *
 * @param {WorkflowCardHeaderProps} props - Props of WorkflowCardHeader component
 *
 * @category Component
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
            return <Icon source={icon} color={iconColor || theme.colors.onSurface} size={24} />;
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
            {isTablet && (
                <StatusBar barStyle={Color(theme.colors.primary).isDark() ? 'light-content' : 'dark-content'} />
            )}
            <View
                style={[
                    isTablet ? defaultStyles.tabletHeader : defaultStyles.mobileHeader,
                    defaultStyles.header,
                    style,
                ]}
                {...otherprops}
            >
                <TouchableOpacity testID="blui-workflow-card-header-icon" onPress={onIconPress}>
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
