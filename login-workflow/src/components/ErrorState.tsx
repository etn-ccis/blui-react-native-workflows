/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Hooks
import { useLanguageLocale } from '@pxblue/react-auth-shared';

// Components
import { EmptyState, wrapIcon } from '@pxblue/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const ReportIcon = wrapIcon({ IconClass: MatIcon, name: 'report' });

/**
 * @ignore
 */
const makeContainerStyles = (): Record<string, any> =>
    StyleSheet.create({
        containerMargins: {
            marginHorizontal: 20,
        },
        spaceBetween: {
            flexGrow: 1,
            justifyContent: 'space-between',
        },
    });

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        sideBySideButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
        },
    });

/**
 * @param title  The title to show on the error state.
 * @param bodyText  The body text to show on the error state.
 * @param icon  (Optional) The icon to show at the top of the error state. Icon 'report' is used if none is specified.
 * @param onPress  The function to handle the on press action.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type ErrorStateProps = {
    title: string;
    bodyText: string | null;
    icon?: React.Component<{ size: number; color: string }>;
    onPress: Function;
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the content of the notice of completed account creation / password reset screen.
 *
 * @category Component
 */
export const ErrorState: React.FC<ErrorStateProps> = (props) => {
    const theme = useTheme(props.theme);
    const { title, bodyText, icon, onPress } = props;
    const { t } = useLanguageLocale();

    const containerStyles = makeContainerStyles();
    const styles = makeStyles();

    return (
        <SafeAreaView style={[containerStyles.spaceBetween, { backgroundColor: theme.colors.surface }]}>
            <View style={{ flex: 1 }}>
                <EmptyState
                    // @ts-ignore we need a new version of the component library that exposes the type for WrapIconProps
                    IconClass={icon ?? ReportIcon}
                    iconColor={theme.colors.error}
                    title={title ?? t('MESSAGES.FAILURE')}
                    description={bodyText !== null ? t(bodyText) : t('MESSAGES.REQUEST_ERROR')}
                />
            </View>

            <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                {/* 
                // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920 */}
                <Button
                    uppercase={false}
                    style={{ width: '100%', alignSelf: 'flex-end' }}
                    mode={'contained'}
                    onPress={(): void => {
                        onPress();
                    }}
                >
                    {t('ACTIONS.FINISH')}
                </Button>
            </View>
        </SafeAreaView>
    );
};
