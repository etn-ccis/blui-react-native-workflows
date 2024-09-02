import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { useAuthContext } from '../../contexts';
import { OktaLoginScreen } from 'src/screens';

// Mock the useAuthContext hook
jest.mock('../../contexts', () => ({
    useAuthContext: jest.fn(),
}));

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('OktaLoginScreen', () => {
    const mockNavigate = jest.fn();
    const mockRouteConfig = {
        FORGOT_PASSWORD: '/forgot-password',
        REGISTER_SELF: '/register-self',
        SUPPORT: '/support',
    };

    beforeEach(() => {
        (useAuthContext as jest.Mock).mockReturnValue({
            navigate: mockNavigate,
            routeConfig: mockRouteConfig,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should call navigate with FORGOT_PASSWORD route when forgot password is clicked', () => {
        render(<OktaLoginScreen />);
        fireEvent.press(screen.getByText('bluiCommon:LABELS.FORGOT_PASSWORD'));
        expect(mockNavigate).toHaveBeenCalledWith(mockRouteConfig.FORGOT_PASSWORD);
    });

    it('should call navigate with REGISTER_SELF route when self register is clicked', () => {
        render(<OktaLoginScreen />);
        fireEvent.press(screen.getByText('bluiCommon:ACTIONS.CREATE_ACCOUNT'));
        expect(mockNavigate).toHaveBeenCalledWith(mockRouteConfig.REGISTER_SELF);
    });

    it('should call navigate with SUPPORT route when contact support is clicked', () => {
        render(<OktaLoginScreen />);
        fireEvent.press(screen.getByText('bluiCommon:MESSAGES.CONTACT'));
        expect(mockNavigate).toHaveBeenCalledWith(mockRouteConfig.SUPPORT);
    });

    it('should render custom props correctly', () => {
        const customProps = {
            loginButtonLabel: 'Custom Login',
            forgotPasswordLabel: 'Custom Forgot Password',
            selfRegisterButtonLabel: 'Custom Register',
            contactSupportLabel: 'Custom Contact Support',
        };

        render(<OktaLoginScreen {...customProps} />);
        expect(screen.getByText('Custom Login').props.children).toBe('Custom Login');
        expect(screen.getByText('Custom Forgot Password').props.children).toBe('Custom Forgot Password');
        expect(screen.getByText('Custom Register').props.children).toBe('Custom Register');
        expect(screen.getByText('Custom Contact Support').props.children).toBe('Custom Contact Support');
    });
});
