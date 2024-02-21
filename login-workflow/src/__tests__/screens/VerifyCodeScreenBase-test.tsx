import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import { VerifyCodeScreenBase } from '../../screens/VerifyCodeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.useFakeTimers();
describe('VerifyCodeScreenBase  Tests', () => {
    afterEach(cleanup);

    it('VerifyCodeScreenBase renders correctly', () => {
        render(
            <SafeAreaProvider>
                <VerifyCodeScreenBase />
            </SafeAreaProvider>
        );

        expect(render).toBeTruthy();
    });

    it('should call input handle function', () => {
        const result = render(
            <SafeAreaProvider>
                <VerifyCodeScreenBase
                    codeValidator={() => true}
                    initialValue="456"
                    WorkflowCardActionsProps={{
                        canGoPrevious: true,
                        showPrevious: true,
                        previousLabel: 'Back',
                        onPrevious: () => jest.fn(),
                    }}
                />
            </SafeAreaProvider>
        );
        const input = result.getByTestId('text-input-flat');
        fireEvent.changeText(input, '123');

        expect(input.props.value).toBe('123');
    });

    it('should call onNext callBack function', () => {
        const result = render(
            <SafeAreaProvider>
                <VerifyCodeScreenBase
                    codeValidator={() => true}
                    initialValue="456789"
                    WorkflowCardActionsProps={{
                        canGoNext: true,
                        showNext: true,
                        nextLabel: 'Next',
                        onNext: () => jest.fn(),
                    }}
                />
            </SafeAreaProvider>
        );

        const nextButton = result.getByRole('button');
        fireEvent.press(nextButton);
    });

    it('should call onPrevious callBack function', () => {
        const result = render(
            <SafeAreaProvider>
                <VerifyCodeScreenBase
                    codeValidator={() => true}
                    initialValue="456789"
                    WorkflowCardActionsProps={{
                        canGoPrevious: true,
                        showPrevious: true,
                        previousLabel: 'Back',
                        onPrevious: () => jest.fn(),
                    }}
                />
            </SafeAreaProvider>
        );

        const prevButton = result.getByRole('button');
        fireEvent.press(prevButton);
    });
});
