import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { CreatePasswordScreenBase } from '../../screens';
import { render, screen } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
jest.useFakeTimers();

describe('CreatePasswordScreenBase Tests', () => {
    it('should render correctly', () => {
        render(
            <PaperProvider>
                <CreatePasswordScreenBase />
            </PaperProvider>
        );

        expect(screen.getByTestId('password')).toBeOnTheScreen();
        expect(screen.getByTestId('confirm')).toBeOnTheScreen();
    });
});
