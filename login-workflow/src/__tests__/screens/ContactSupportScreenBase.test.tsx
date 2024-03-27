import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react-native';
import { ContactSupportScreenBase } from '../../screens/ContactScreen/ContactSupportScreenBase';
import { Icon, Text, Provider as PaperProvider } from 'react-native-paper';
import '@testing-library/react-native/extend-expect';

afterEach(cleanup);

describe('ContactSupportScreenBase tests', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    it('renders without crashing', () => {
        render(
            <PaperProvider>
                <ContactSupportScreenBase
                    WorkflowCardHeaderProps={{ title: 'Test Contact Us' }}
                    icon={<Icon size={24} source="contacts" />}
                    emailSupportTitle="General Questions"
                    phoneSupportTitle="Emergency Support"
                    contactEmail="something@email.com"
                    contactPhone="1-800-123-4567"
                    dismissButtonLabel="Okay"
                    emailSupportContent={(contactEmail: string): JSX.Element => (
                        <Text>
                            {'For questions, feedback, or support please email us at '}
                            <Text>{contactEmail}</Text>
                            {`.`}
                        </Text>
                    )}
                    phoneSupportContent={(phone: string): JSX.Element => (
                        <Text>
                            {'For technical support, please call '}
                            <Text>{phone}</Text>
                            {`.`}
                        </Text>
                    )}
                    WorkflowCardActionsProps={{
                        nextLabel: 'Okay',
                        showNext: true,
                        canGoNext: true,
                        onNext: (): void => {},
                        fullWidthButton: true,
                    }}
                />
            </PaperProvider>
        );
        expect(screen.getByText('Test Contact Us')).toBeOnTheScreen();
        expect(screen.getByText('General Questions')).toBeOnTheScreen();
        expect(screen.getByText('something@email.com')).toBeOnTheScreen();
        expect(screen.getByText('Emergency Support')).toBeOnTheScreen();
        expect(screen.getByText('1-800-123-4567')).toBeOnTheScreen();
        expect(screen.getByText('Okay')).toBeOnTheScreen();
        expect(screen.getByText(/Okay/i)).toBeEnabled();
    });
    it('calls onNext when the Okay button is clicked', () => {
        const { getByText } = render(
            <PaperProvider>
                <ContactSupportScreenBase
                    WorkflowCardActionsProps={{
                        onNext: mockOnNext(),
                        showNext: true,
                        nextLabel: 'Okay',
                    }}
                />
            </PaperProvider>
        );

        const nextButton = getByText('Okay');
        fireEvent.press(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });
});
