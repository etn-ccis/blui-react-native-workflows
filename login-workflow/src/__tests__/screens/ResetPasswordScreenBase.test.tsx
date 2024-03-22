import React from 'react';
import { cleanup, render, RenderResult, screen } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
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
        expect(screen.getByTestId('workflow-card-action-divider')).toBeOnTheScreen();
    });
});
