import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import { SuccessScreenBase } from '../../screens/SuccessScreen/SuccessScreenBase';
import { Provider as PaperProvider } from 'react-native-paper';

describe('SuccessScreenBase Test', () => {
    afterEach(cleanup);
    const onDismiss = jest.fn();

    it('SuccessScreenBase renders correctly', () => {
        render(
            <PaperProvider>
                <SuccessScreenBase />
            </PaperProvider>
        ).toJSON();
        expect(render).toBeTruthy();
    });

    it('should call onDismiss, when Dismiss button is pressed', () => {
        render(
            <PaperProvider>
                <SuccessScreenBase
                    WorkflowCardActionsProps={{
                        nextLabel: 'Dismiss',
                        canGoNext: true,
                        showNext: true,
                        onNext: () => onDismiss(),
                    }}
                />
            </PaperProvider>
        );
        fireEvent.press(screen.getByText('Dismiss'));
        expect(onDismiss).toHaveBeenCalled();
    });
});
