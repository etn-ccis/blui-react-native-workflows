import React from 'react';
import { cleanup, render, RenderResult, screen } from '@testing-library/react-native';
import { AccountDetailsScreenBase, AccountDetailsScreenProps } from '../../screens';
import { Provider as PaperProvider } from 'react-native-paper';
import '@testing-library/react-native/extend-expect';

describe('AccountDetailsScreenBase tests', () => {
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

        expect(screen.getByTestId('firstName')).toHaveDisplayValue('Test First Name');
        expect(screen.getByTestId('lastName')).toHaveDisplayValue('Test Last Name');
    });
});
