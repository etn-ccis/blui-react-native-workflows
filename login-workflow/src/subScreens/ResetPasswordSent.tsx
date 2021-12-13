/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Instruction } from '../components/Instruction';
import { useTheme } from 'react-native-paper';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { ToggleButton } from '../components/ToggleButton';

// Hooks
import { useNavigation, useRoute } from '@react-navigation/native';

// Shared Auth Logic
import {
    // Types
    ResetPasswordParams,
    // Hooks
    useLanguageLocale,
} from '@brightlayer-ui/react-auth-shared';

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
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
            marginHorizontal: 16,
        },
        iconContainer: {
            marginTop: 60,
            marginBottom: 16,
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
            paddingVertical: 8,
        },
    });

/**
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type ResetPasswordSentProps = {
    theme?: ReactNativePaper.Theme;
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
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ maxWidth: 600 }}>
                    <MatIcon
                        name={'mail-outline'}
                        style={containerStyles.iconContainer}
                        size={100}
                        color={theme.colors.placeholder}
                    />

                    <Instruction
                        text={t('blui:FORGOT_PASSWORD.LINK_SENT', {
                            replace: { email: email },
                        })}
                        style={containerStyles.containerMargins}
                        hasBottomBorder={false}
                    />
                </View>
            </View>

            <View style={[styles.wideButton, containerStyles.containerMargins]}>
                <View style={{ flex: 1 }}>
                    <ToggleButton text={t('blui:ACTIONS.DONE')} onPress={(): void => navigation.navigate('Login')} />
                </View>
            </View>
        </SafeAreaView>
    );
};
