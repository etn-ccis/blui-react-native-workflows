import React from 'react';
import { cleanup, render, RenderResult, screen } from '@testing-library/react-native';
import { ErrorManager, ErrorManagerProps } from 'src/components';
import { Provider as PaperProvider } from 'react-native-paper';
import '@testing-library/react-native/extend-expect';

describe('ErrorManager Test', () => {
    const onClose = jest.fn();

    const defaultProps: ErrorManagerProps = {
        mode: 'dialog',
        title: 'Error Manager',
        error: 'Error Manager Message',
        onClose,
    };

    const renderer = (props = defaultProps): RenderResult =>
        render(
            <PaperProvider>
                <ErrorManager {...props} />
            </PaperProvider>
        );

    afterEach(cleanup);

    it('renders correctly', () => {
        renderer();
        expect(render).toBeTruthy();
    });

    it('should display title and error passed using props', () => {
        renderer();
        expect(screen.getByText('Error Manager')).toBeOnTheScreen();
        expect(screen.getByText('Error Manager Message')).toBeOnTheScreen();
    });

    it('should display error dialog as default mode', () => {
        renderer();
        expect(screen.getByTestId('blui-error-manager-basic-dialog')).toBeOnTheScreen();
    });
    it('should display error dialog as default mode', () => {
        const props = defaultProps;
        props.mode = 'message-box';
        renderer(props);
        expect(screen.getByTestId('blui-error-message-box-close-icon')).toBeOnTheScreen();
    });
});
