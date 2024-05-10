import React from 'react';
import { cleanup, render, RenderResult, screen } from '@testing-library/react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import '@testing-library/react-native/extend-expect';
import { ResetPasswordScreenBase, ResetPasswordScreenProps } from '../../screens';
jest.useFakeTimers();

describe('ResetPasswordScreenBase tests', () => {
    const renderer = (props?: ResetPasswordScreenProps): RenderResult =>
        render(
            <PaperProvider>
                <ResetPasswordScreenBase {...props} />
            </PaperProvider>
        );

    afterEach(cleanup);

    let mockFunction: any;

    beforeEach(() => {
        mockFunction = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        renderer({
            WorkflowCardHeaderProps: {
                title: 'Reset Password',
            },
        });
        expect(screen.getByText('Reset Password')).toBeTruthy();
    });

    it('should render success screen', () => {
        renderer({
            showSuccessScreen: true,
        });
        expect(screen.getByTestId('blui-workflow-card-action-divider')).toBeOnTheScreen();
    });

    it('should render passed props correctly', () => {
        renderer({
            PasswordProps: {
                onPasswordChange: mockFunction(),
                newPasswordLabel: 'New Password',
                initialNewPasswordValue: 'New',
                confirmPasswordLabel: 'Confirm New Password',
                initialConfirmPasswordValue: 'Confirm New',
                passwordNotMatchError: 'wrong entries',
            },
        });
        expect(screen.getAllByText('New Password')).toBeTruthy();
        expect(screen.getByTestId('blui-set-password-password-text-field').props.value).toBe('New');
        expect(screen.getAllByText('Confirm New Password')).toBeTruthy();
        expect(screen.getByTestId('blui-set-password-confirm-password-text-field').props.value).toBe('Confirm New');
        expect(screen.getByText('wrong entries')).toBeOnTheScreen();
    });

    it('should render success screen', () => {
        renderer({
            showSuccessScreen: true,
            SuccessScreen: () => <Text>Test</Text>,
        });
        expect(screen.getByText('Test')).toBeOnTheScreen();
    });
});
