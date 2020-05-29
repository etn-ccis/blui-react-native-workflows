/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Instruction } from '../components/Instruction';
import { Theme, useTheme } from 'react-native-paper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { ToggleButton } from '../components/ToggleButton';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import { useNavigation, useRoute } from '@react-navigation/native';

// Types
import { ResetPasswordParams } from '../types/ResetPasswordParams';

/**
 * @ignore
 */
const makeContainerStyles = (theme: Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
            flex: 1,
            justifyContent: 'space-between',
        },
        mainContainer: {
            flex: 1,
        },
        containerMargins: {
            marginHorizontal: 20,
        },
        iconContainer: {
            marginTop: 60,
            marginBottom: 20,
            alignSelf: 'center',
        },
    });

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        wideButton: {
            height: 60,
            paddingVertical: 10,
        },
    });

/**
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type ResetPasswordSentProps = {
    theme?: Theme;
};

/**
 * Renders the screen with the reset password sent message.
 *
 * @category Component
 */
export const ResetPasswordSent: React.FC<ResetPasswordSentProps> = (props) => {
    const theme = useTheme(props.theme);
    const { t } = useLanguageLocale();
    const navigation = useNavigation();
    const route = useRoute();

    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    const routeParams = route.params as ResetPasswordParams;
    const email = routeParams?.email ?? '';

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <View>
                <MatIcon
                    name={'mail-outline'}
                    style={containerStyles.iconContainer}
                    size={100}
                    color={theme.colors.placeholder}
                />

                <Instruction
                    text={t('FORGOT_PASSWORD.LINK_SENT', {
                        replace: { email: email },
                    })}
                    style={containerStyles.containerMargins}
                    hasBottomBorder={false}
                />
            </View>

            <View style={[styles.wideButton, containerStyles.containerMargins]}>
                <View style={{ flex: 1 }}>
                    <ToggleButton text={t('ACTIONS.DONE')} onPress={(): void => navigation.navigate('Login')} />
                </View>
            </View>
        </SafeAreaView>
    );
};
