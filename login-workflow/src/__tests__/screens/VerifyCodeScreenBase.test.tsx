import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import { VerifyCodeScreenBase } from '../../screens/VerifyCodeScreen';
import { PaperProvider } from 'react-native-paper';

describe('VerifyCodeScreenBase  Tests', () => {
    afterEach(cleanup);
    let mockOnPrevious: any;

    beforeEach(() => {
        mockOnPrevious = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('VerifyCodeScreenBase renders correctly', () => {
        render(
            <PaperProvider>
                <VerifyCodeScreenBase />
            </PaperProvider>
        );
        expect(screen.getByTestId('blui-verify-code-text-input')).toBeOnTheScreen();
    });

    it('should call input handle function', () => {
        render(
            <PaperProvider>
                <VerifyCodeScreenBase />
            </PaperProvider>
        );
        const input = screen.getByTestId('blui-verify-code-text-input');
        fireEvent.changeText(input, '123');
        expect(input.props.value).toBe('123');
    });

    it('should call onNext callBack function', () => {
        render(
            <PaperProvider>
                <VerifyCodeScreenBase
                    codeValidator={() => true}
                    initialValue="456789"
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: 'Next',
                        onNext: () => jest.fn(),
                    }}
                />
            </PaperProvider>
        );
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeEnabled();
        fireEvent.press(nextButton);
    });

    it('should call onPrevious callBack function', () => {
        render(
            <PaperProvider>
                <VerifyCodeScreenBase
                    codeValidator={() => true}
                    initialValue="456789"
                    WorkflowCardActionsProps={{
                        showPrevious: true,
                        previousLabel: 'Back',
                        onPrevious: mockOnPrevious(),
                    }}
                />
            </PaperProvider>
        );
        const prevButton = screen.getByText('Back');
        fireEvent.press(prevButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });
});
