import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import { ExistingAccountSuccessScreen } from '../../screens/ExistingAccountSuccessScreen';
import { registrationContextProviderProps } from '../../testUtils';
import { RegistrationContextProvider } from '../../contexts';
import { SafeAreaProvider } from 'react-native-safe-area-context';

describe('ExistingAccountSuccessScreen Test', () => {
    afterEach(cleanup);
    const onDismiss = jest.fn();

    it('ExistingAccountSuccessScreen renders correctly', () => {
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <SafeAreaProvider>
                    <ExistingAccountSuccessScreen />
                </SafeAreaProvider>
            </RegistrationContextProvider>
        ).toJSON();
        expect(render).toBeTruthy();
    });

    it('should call onDismiss, when Dismiss button is pressed', () => {
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <SafeAreaProvider>
                    <ExistingAccountSuccessScreen
                        WorkflowCardActionsProps={{
                            nextLabel: 'Dismiss',
                            canGoNext: true,
                            showNext: true,
                            onNext: () => onDismiss(),
                        }}
                    />
                </SafeAreaProvider>
            </RegistrationContextProvider>
        );
        fireEvent.press(screen.getByText('Dismiss'));
        expect(onDismiss).toHaveBeenCalled();
    });
});
