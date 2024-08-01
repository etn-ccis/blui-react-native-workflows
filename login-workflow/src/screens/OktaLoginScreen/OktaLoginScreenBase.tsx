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
    selfRegisterWrapper: ViewStyle;
    contactSupportWrapper: ViewStyle;
    footerWrapper: ViewStyle;
    cyberSecurityBadgeWrapper: ViewStyle;
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
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginTop: isTablet ? 240: 60,
            marginBottom: isTablet ? 96 : 72,
        },
        loginButton: {
            width: '100%',
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
            marginTop: 40,
            alignContent: 'center',
            alignItems: 'center',
            marginBottom: isTablet ? 32 : 24,
        },
        footerWrapper: { display: 'flex', justifyContent: 'center' },
        cyberSecurityBadgeWrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 40,
        },
    });

/**
 * Component that renders a login screen that prompts user to login via Okta.
 *
 * @param {OktaLoginScreenProps} props - Props of Login Screen component
 *
 * @category Component
 */
export const OktaLoginScreenBase: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = (props) => {
    const {
        loginButtonLabel,
        onLogin,
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

                <View>
                {showSelfRegistration && (
                    <View style={defaultStyles.selfRegisterWrapper} testID={'blui-okta-login-self-register-wrapper'}>
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
                    <View style={defaultStyles.contactSupportWrapper} testID={'blui-okta-login-contact-support-wrapper'}>
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

                <View style={defaultStyles.footerWrapper}>{footer}</View>

                {showCyberSecurityBadge && (
                    <View
                        style={defaultStyles.cyberSecurityBadgeWrapper}
                        testID={'blui-okta-login-cyber-security-badge-wrapper'}
                    >
                        <Image
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
