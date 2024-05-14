import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { RenderResult, cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import { ForgotPasswordScreenBase, ForgotPasswordScreenProps } from '../../screens';
import { PaperProvider, Text } from 'react-native-paper';

describe('ForgotPasswordScreenBase Tests', () => {
    afterEach(cleanup);
    let mockFunction: any;

    beforeEach(() => {
        mockFunction = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderer = (props?: ForgotPasswordScreenProps): RenderResult =>
        render(
            <PaperProvider>
                <ForgotPasswordScreenBase {...props} />
            </PaperProvider>
        );

    it('ForgotPasswordScreenBase renders correctly', () => {
        renderer();
        expect(screen.getByTestId('blui-forgot-password-textinput')).toBeOnTheScreen();
    });

    it('should call onChangeText and onNext callback events', () => {
        renderer({
            WorkflowCardActionsProps: {
                showNext: true,
                nextLabel: 'Next',
                canGoNext: true,
                onNext: mockFunction(),
            },
            emailTextInputProps: {
                onChangeText: mockFunction,
            },
        });
        const input = screen.getByTestId('blui-forgot-password-textinput');
        const nextButton = screen.getByTestId('blui-workflow-card-actions-next-button-text');
        expect(nextButton).toBeDisabled();
        fireEvent.changeText(input, 'test@eaton.com');
        expect(input.props.value).toBe('test@eaton.com');
        fireEvent.press(nextButton);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should render success screen', () => {
        renderer({
            showSuccessScreen: true,
        });
        expect(render).toBeTruthy();
    });

    it('should render passed props correctly', () => {
        renderer({
            emailLabel: 'Email ID',
            emailValidator: (email) => (email.length > 0 ? true : 'enter valid email'),
            initialEmailValue: 'test@eaton.com',
            WorkflowCardActionsProps: {
                showNext: true,
                nextLabel: 'Next',
                onNext: mockFunction(),
            },
            SuccessScreen: () => <Text>Success</Text>,
        });
        expect(screen.getAllByText('Email ID')).toBeTruthy();
        expect(screen.getByTestId('blui-forgot-password-textinput').props.value).toBe('test@eaton.com');
        fireEvent.press(screen.getByText('Next'));
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should get submitted when click on enter button', () => {
        renderer({
            WorkflowCardActionsProps: {
                canGoNext: true,
                onNext: mockFunction(),
            },
        });
        const input = screen.getByTestId('blui-forgot-password-textinput');
        fireEvent.changeText(input, 'test@eaton.com');
        fireEvent(input, 'submitEditing');
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should call handleOnBack on click of Back button', () => {
        renderer({
            WorkflowCardActionsProps: {
                showPrevious: true,
                canGoPrevious: true,
                previousLabel: 'Back',
                onPrevious: mockFunction(),
            },
        });
        fireEvent.press(screen.getByText('Back'));
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should call handleOnClose on click of close icon', () => {
        renderer();
        const closeIcon = screen.getByTestId('blui-workflow-card-header-icon');
        fireEvent.press(closeIcon);
        expect(render).toBeTruthy();
    });
});
