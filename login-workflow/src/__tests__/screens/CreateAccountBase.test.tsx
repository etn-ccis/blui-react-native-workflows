import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';
import { CreateAccountScreenBase } from '../../screens/CreateAccountScreen';
jest.useFakeTimers();

afterEach(cleanup);

describe('Create Account Base', () => {
    it('renders correctly', () => {
        const rendered = renderer
            .create(
                <SafeAreaProvider>
                    <CreateAccountScreenBase />
                </SafeAreaProvider>
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });
    it('renders correctly with props', () => {
        const rendered = renderer
            .create(
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
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });
    it(' email textinput onchange works correctly', () => {
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

        const Input = getByTestId('email-textinput');
        fireEvent.changeText(Input, 'email@test.com');
        expect(updateInput).toHaveBeenCalledTimes(1);
    });
});
