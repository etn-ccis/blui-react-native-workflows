import React from 'react';
import { cleanup, fireEvent, render, RenderResult, screen } from '@testing-library/react-native';
import { ErrorMessageBox } from 'src/components';
import { Provider as PaperProvider } from 'react-native-paper';
import '@testing-library/react-native/extend-expect';

describe('ErrorMessageBox Test', () => {
    const onClose = jest.fn();

    const defaultProps = {
        title: 'Error Title',
        errorMessage: 'Error Message',
        onClose,
    };

    const renderer = (props = defaultProps): RenderResult =>
        render(
            <PaperProvider>
                <ErrorMessageBox {...props} />
            </PaperProvider>
        );

    afterEach(cleanup);

    it('renders correctly', () => {
        renderer();
        expect(render).toBeTruthy();
    });

    it('should call onDismiss prop, when button is pressed', () => {
        renderer();
        expect(screen.getByTestId('error-message-box-close')).toBeOnTheScreen();
        fireEvent.press(screen.getByTestId('error-message-box-close'));
        expect(onClose).toHaveBeenCalled();
    });
});
