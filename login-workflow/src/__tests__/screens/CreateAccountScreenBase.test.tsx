import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { cleanup, render, fireEvent, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CreateAccountScreenBase } from '../../screens/CreateAccountScreen';

afterEach(cleanup);

describe('Create Account Base', () => {
    it('renders correctly', () => {
        render(
            <SafeAreaProvider>
                <CreateAccountScreenBase />
            </SafeAreaProvider>
        );
        expect(screen.getByTestId('blui-create-account-email-text-input')).toBeOnTheScreen();
    });

    it('renders correctly with props', () => {
        render(
            <SafeAreaProvider>
                <CreateAccountScreenBase
                    WorkflowCardInstructionProps={{ instructions: 'Test Instructions' }}
                    initialValue="a"
                    emailValidator={(email: string): boolean | string => {
                        if (email?.length > 6) {
                            return true;
                        }
                        return 'Please enter a valid email';
                    }}
                />
            </SafeAreaProvider>
        );
        expect(screen.getByText('Please enter a valid email')).toBeOnTheScreen();
    });

    it('email textinput onchange works correctly', () => {
        const updateInput = jest.fn();
        const { getByTestId } = render(
            <SafeAreaProvider>
                <CreateAccountScreenBase
                    WorkflowCardInstructionProps={{ instructions: 'Test Instructions' }}
                    initialValue="a"
                    emailValidator={(email: string): boolean | string => {
                        if (email?.length > 6) {
                            return true;
                        }
                        return 'Please enter a valid email';
                    }}
                    emailTextFieldProps={{ onChangeText: updateInput }}
                />
            </SafeAreaProvider>
        );

        const Input = getByTestId('blui-create-account-email-text-input');
        fireEvent.changeText(Input, 'email@test.com');
        expect(updateInput).toHaveBeenCalledTimes(1);
    });
});
