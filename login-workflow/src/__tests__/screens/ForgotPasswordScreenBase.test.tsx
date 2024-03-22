import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { RenderResult, cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import { ForgotPasswordScreenBase, ForgotPasswordScreenProps } from '../../screens';
import { PaperProvider } from 'react-native-paper';

describe('ForgotPasswordScreenBase Tests', () => {
    afterEach(cleanup);
    let mockOnNext: any;

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderer = (props?: ForgotPasswordScreenProps): RenderResult =>
        render(
            <PaperProvider>
                <ForgotPasswordScreenBase {...props} />
            </PaperProvider>
        );

    it('ForgotPasswordScreenBase renders correctly', () => {
        renderer();
        expect(screen.getByTestId('text-input-flat')).toBeOnTheScreen();
    });

    it('should call onChangeText and onNext callback events', () => {
        renderer({
            WorkflowCardActionsProps: {
                showNext: true,
                nextLabel: 'Next',
                onNext: mockOnNext(),
            },
        });

        const input = screen.getByTestId('text-input-flat');
        const nextButton = screen.getByText('Next');
        fireEvent.changeText(input, 'test@eaton.com');
        expect(nextButton).toBeEnabled();
        fireEvent.press(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should render success screen', () => {
        renderer({
            showSuccessScreen: true,
        });
        expect(render).toBeTruthy();
    });
});
