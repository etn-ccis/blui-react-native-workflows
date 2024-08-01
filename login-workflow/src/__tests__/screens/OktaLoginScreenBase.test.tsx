// OktaLoginScreenBase.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { OktaLoginScreenBase } from 'src/screens';
import { View } from 'react-native';

describe('OktaLoginScreenBase', () => {
    test('renders Okta Login Screen Base component', () => {
        render(<OktaLoginScreenBase />);
        expect(<OktaLoginScreenBase />).toMatchSnapshot()
    });

    test('renders self-register button if selfRegisterButtonLabel is provided', () => {
        const { getByTestId } = render(<OktaLoginScreenBase showSelfRegistration={true} selfRegisterButtonLabel="Register now!" />);
        const registerButton = getByTestId('blui-okta-login-self-register-label');
        expect(registerButton).toBeTruthy();
        expect(registerButton.props.children).toBe('Register now!');
    });

    test('renders contact support section if showContactSupport is true', () => {
        const { getByTestId } = render(<OktaLoginScreenBase showContactSupport={true} />);
        const contactSupportWrapper = getByTestId('blui-okta-login-contact-support-wrapper');
        expect(contactSupportWrapper).toBeTruthy();
    });

    test('renders contact support label with correct text', () => {
        const { getByTestId } = render(<OktaLoginScreenBase showContactSupport={true} contactSupportLabel="Contact Support" />);
        const contactSupportLabel = getByTestId('blui-okta-login-contact-support-label');
        expect(contactSupportLabel).toBeTruthy();
        expect(contactSupportLabel.props.children).toBe('Contact Support');
    });

    test('calls handleContactSupport when contact support label is pressed', () => {
        const handleContactSupport = jest.fn();
        const { getByTestId } = render(<OktaLoginScreenBase showContactSupport={true} onContactSupport={handleContactSupport} />);
        const contactSupportLabel = getByTestId('blui-okta-login-contact-support-label');
        fireEvent.press(contactSupportLabel);
        expect(handleContactSupport).toHaveBeenCalled();
    });

    test('renders footer content', () => {
        const { getByTestId } = render(<OktaLoginScreenBase footer={<View>Footer Content</View>} />);
        const footerContent = getByTestId('blui-okta-login-footer');
        expect(footerContent).toBeTruthy();
        expect(footerContent.props.children).toMatchSnapshot('Footer Content');
    });

    test('renders cybersecurity badge if showCyberSecurityBadge is true', () => {
        const { getByTestId } = render(<OktaLoginScreenBase showCyberSecurityBadge={true} />);
        const cyberSecurityBadgeWrapper = getByTestId('blui-okta-login-cyber-security-badge-wrapper');
        expect(cyberSecurityBadgeWrapper).toBeTruthy();
    });

    test('renders cybersecurity badge image', () => {
        const imgSource = require('../../assets/images/cybersecurity_certified.png');
        const { queryByTestId } = render(<OktaLoginScreenBase showCyberSecurityBadge={true} />);
        const cyberSecurityBadgeImage = queryByTestId('blui-okta-login-cyber-security-badge-image');
        expect(cyberSecurityBadgeImage).toBeTruthy();
        expect(queryByTestId('blui-okta-login-cyber-security-badge-image')?.props.source).toBe(imgSource);
    });
});