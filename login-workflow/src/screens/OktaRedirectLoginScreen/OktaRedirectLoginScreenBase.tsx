import React from 'react';
import { OktaLoginScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { Image, View, StyleSheet, ViewStyle } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    container: ViewStyle;
    projectImageWrapper: ViewStyle;
    loginButtonWrapper: ViewStyle;
    loginButton: ViewStyle;
    forgotPasswordWrapper: ViewStyle;
    selfRegisterWrapper: ViewStyle;
    contactSupportWrapper: ViewStyle;
    footerWrapper: ViewStyle;
    cyberSecurityBadgeWrapper: ViewStyle;
    bottomBodyWrapper: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
        },
        projectImageWrapper: {
            display: 'flex',
            maxWidth: '100%',
            marginBottom: isTablet ? 24 : 16,
        },
        loginButtonWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginTop: isTablet ? 72 : 60,
            marginBottom: isTablet ? 80 : 72,
        },
        loginButton: {
            width: '100%',
        },
        bottomBodyWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            flex: 1,
        },
        forgotPasswordWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginBottom: isTablet ? 32 : 24,
        },
        selfRegisterWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 16,
            alignContent: 'center',
            marginBottom: isTablet ? 32 : 24,
        },
        contactSupportWrapper: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: 8,
            alignContent: 'center',
            alignItems: 'center',
            marginBottom: isTablet ? 52 : 24,
        },
        footerWrapper: { display: 'flex', justifyContent: 'center' },
        cyberSecurityBadgeWrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 8,
        },
    });

/**
 * Component that renders a login screen that prompts user to login via Okta.
 *
 * @param {OktaLoginScreenProps} props - Props of Login Screen component
 *
 * @category Component
 */
export const OktaRedirectLoginScreenBase: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = (props) => {
    const {
        loginButtonLabel,
        onLogin,
        showForgotPassword,
        forgotPasswordLabel,
        onForgotPassword,
        showSelfRegistration,
        selfRegisterButtonLabel,
        selfRegisterInstructions,
        onSelfRegister,
        showContactSupport,
        contactSupportLabel,
        onContactSupport,
        showCyberSecurityBadge,
        cyberSecurityBadgeSize,
        projectImage,
        header,
        footer,
        ...otherProps
    } = props;

    const theme = useExtendedTheme();
    const { isTablet } = useScreenDimensions();

    const defaultStyles = makeStyles(isTablet);

    const handleSelfRegister = (): void => {
        if (onSelfRegister) onSelfRegister();
    };

    const handleContactSupport = (): void => {
        if (onContactSupport) onContactSupport();
    };

    const handleLoginWrapper = async (): Promise<void> => {
        if (onLogin) await onLogin();
    };

    // Synchronous wrapper for the asynchronous handleLogin function
    const handleLogin = (): void => {
        handleLoginWrapper().catch((error) => {
            console.error('Login failed:', error);
        });
    };

    const handleForgotPassword = (): void => {
        if (onForgotPassword) onForgotPassword();
    };

    return (
        <WorkflowCard testID="blui-okta-login-workflow-card" {...otherProps}>
            <WorkflowCardBody>
                {header}
                <View style={defaultStyles.projectImageWrapper} testID="blui-okta-login-project-image-wrapper">
                    {projectImage}
                </View>

                <View
                    style={[defaultStyles.loginButtonWrapper, { width: '100%' }]}
                    testID={'blui-okta-login-login-button-wrapper'}
                >
                    <Button
                        testID={'blui-okta-login-login-button'}
                        onPress={handleLogin}
                        disabled={!onLogin}
                        mode="contained"
                        style={defaultStyles.loginButton}
                    >
                        {loginButtonLabel || 'Sign In with Okta'}
                    </Button>
                </View>

                <View style={defaultStyles.bottomBodyWrapper} testID={'blui-okta-login-bottom-body-wrapper'}>
                    {showForgotPassword && (
                        <View
                            style={defaultStyles.forgotPasswordWrapper}
                            testID={'blui-okta-login-forgot-password-wrapper'}
                        >
                            <Text
                                variant="labelLarge"
                                style={{ color: theme.colors.primary }}
                                onPress={handleForgotPassword}
                                testID={'blui-login-forgot-password-label'}
                            >
                                {forgotPasswordLabel || 'Forgot your password?'}
                            </Text>
                        </View>
                    )}

                    {showSelfRegistration && (
                        <View
                            style={defaultStyles.selfRegisterWrapper}
                            testID={'blui-okta-login-self-register-wrapper'}
                        >
                            <Text variant="bodyMedium" testID={'blui-okta-login-self-register-instruction-label'}>
                                {selfRegisterInstructions || 'Need an account?'}
                            </Text>
                            <Text
                                variant="labelLarge"
                                style={{ color: theme.colors.primary }}
                                onPress={handleSelfRegister}
                                testID={'blui-okta-login-self-register-label'}
                            >
                                {selfRegisterButtonLabel || 'Register now!'}
                            </Text>
                        </View>
                    )}

                    {showContactSupport && (
                        <View
                            style={defaultStyles.contactSupportWrapper}
                            testID={'blui-okta-login-contact-support-wrapper'}
                        >
                            <Text
                                variant="labelLarge"
                                style={{ color: theme.colors.primary }}
                                onPress={handleContactSupport}
                                testID={'blui-okta-login-contact-support-label'}
                            >
                                {contactSupportLabel || 'Contact Support'}
                            </Text>
                        </View>
                    )}

                    <View testID={'blui-okta-login-footer'} style={defaultStyles.footerWrapper}>
                        {footer}
                    </View>

                    {showCyberSecurityBadge && (
                        <View
                            style={defaultStyles.cyberSecurityBadgeWrapper}
                            testID={'blui-okta-login-cyber-security-badge-wrapper'}
                        >
                            <Image
                                testID={'blui-okta-login-cyber-security-badge-image'}
                                style={{ ...cyberSecurityBadgeSize }}
                                resizeMode="contain"
                                source={require('../../assets/images/cybersecurity_certified.png')}
                            />
                        </View>
                    )}
                </View>
            </WorkflowCardBody>
        </WorkflowCard>
    );
};
