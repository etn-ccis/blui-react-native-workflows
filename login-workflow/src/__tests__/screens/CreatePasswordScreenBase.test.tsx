import React from 'react';
import { CreatePasswordScreenBase } from '../../screens';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.useFakeTimers();

describe('Create Password Screen Base tests', () => {
    it('should render correctly', () => {
        render(
            <SafeAreaProvider>
                <CreatePasswordScreenBase />
            </SafeAreaProvider>
        );

        expect(render).toBeTruthy();
    });
});
