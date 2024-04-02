import React from 'react';
import '@testing-library/react-native/extend-expect';
import { cleanup, render, screen, RenderResult, fireEvent } from '@testing-library/react-native';
import { AuthContextProvider } from '../../contexts';
import { authContextProviderProps } from '../../testUtils';
import { ContactSupportScreen } from '../../screens/ContactScreen';
import { ContactSupportScreenProps } from 'src/screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
afterEach(cleanup);

describe('Contact Support Screen', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    const renderer = (props?: ContactSupportScreenProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <SafeAreaProvider>
                    <ContactSupportScreen {...props} />
                </SafeAreaProvider>
            </AuthContextProvider>
        );

    it('rendering the screen without any props', () => {
        renderer();
        expect(screen.getByText('Contact Us')).toBeOnTheScreen();
    });

    it('should display default content', () => {
        renderer();
        expect(screen.getByText('Contact Us')).toBeOnTheScreen();
        expect(screen.getByText('General Questions')).toBeOnTheScreen();
        expect(screen.getByText('something@email.com')).toBeOnTheScreen();
        expect(screen.getByText('Emergency Support')).toBeOnTheScreen();
        expect(screen.getByText('1-800-123-4567')).toBeOnTheScreen();
        expect(screen.getByText('Okay')).toBeOnTheScreen();
        expect(screen.getByText(/Okay/i)).toBeEnabled();
    });

    it('calls onNext when the Okay button is clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });

        const nextButton = screen.getByText('Okay');
        fireEvent.press(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });
});
