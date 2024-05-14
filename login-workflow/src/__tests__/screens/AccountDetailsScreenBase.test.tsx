import React from 'react';
import '@testing-library/react-native/extend-expect';
import { cleanup, render, RenderResult, screen } from '@testing-library/react-native';
import { AccountDetailsScreenBase, AccountDetailsScreenProps } from '../../screens/AccountDetailsScreen';
import { Provider as PaperProvider } from 'react-native-paper';

describe('AccountDetailsScreenBase Tests', () => {
    const renderer = (props?: AccountDetailsScreenProps): RenderResult =>
        render(
            <PaperProvider>
                <AccountDetailsScreenBase {...props} />
            </PaperProvider>
        );

    afterEach(cleanup);

    it('renders without crashing', () => {
        renderer();
    });

    it('should display the initial values', () => {
        renderer({
            firstNameLabel: 'First Name',
            lastNameLabel: 'Last Name',
            initialFirstName: 'Test First Name',
            initialLastName: 'Test Last Name',
        });

        expect(screen.getByTestId('blui-account-details-first-name')).toHaveDisplayValue('Test First Name');
        expect(screen.getByTestId('blui-account-details-last-name')).toHaveDisplayValue('Test Last Name');
    });
});
