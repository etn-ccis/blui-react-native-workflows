import React from 'react';
import { cleanup, fireEvent, render, RenderResult, screen } from '@testing-library/react-native';
import { BasicDialog, BasicDialogProps } from 'src/components';
import { Provider as PaperProvider } from 'react-native-paper';
import '@testing-library/react-native/extend-expect';

describe('BasicDialog Test', () => {
    const renderer = (props?: BasicDialogProps): RenderResult =>
        render(
            <PaperProvider>
                <BasicDialog {...props} />
            </PaperProvider>
        );

    afterEach(cleanup);
    const onDismiss = jest.fn();

    it('renders correctly', () => {
        renderer();
        expect(render).toBeTruthy();
    });

    it('should display the passed props', () => {
        renderer({ open: true, title: 'Dialog Title' });
        expect(screen.getByText('Dialog Title')).toBeOnTheScreen();
    });

    it('should call onDismiss prop, when button is pressed', () => {
        renderer({ open: true, title: 'Dialog Title', onDismiss });
        expect(screen.getByText('Okay')).toBeOnTheScreen();
        fireEvent.press(screen.getByText('Okay'));
        expect(onDismiss).toHaveBeenCalled();
    });
});
