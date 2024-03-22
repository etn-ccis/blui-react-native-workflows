import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { RenderResult, cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import { ForgotPasswordScreenBase, ForgotPasswordScreenProps } from '../../screens';
import { PaperProvider } from 'react-native-paper';
jest.useFakeTimers();

describe('ForgotPasswordScreenBase Tests', () => {
    afterEach(cleanup);

    const renderer = (props?: ForgotPasswordScreenProps): RenderResult =>
        render(
            <PaperProvider>
                <ForgotPasswordScreenBase successScreen={<></>} {...props} />
            </PaperProvider>
        );

    it('ForgotPasswordScreenBase renders correctly', () => {
        renderer();
        expect(screen.getByTestId('text-input-flat')).toBeOnTheScreen();
    });

    it('should call onChangeText callback event', () => {
        renderer();
        const input = screen.getByTestId('text-input-flat');
        fireEvent.changeText(input, 'test@eaton.com');
    });
});
