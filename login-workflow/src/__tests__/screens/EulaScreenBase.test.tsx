import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import { SAMPLE_EULA } from '../../constants/index';
import { EulaScreenBase } from 'src/screens/EulaScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';

afterEach(cleanup);

describe('Eula Screen Base', () => {
    it('renders Text Eula content', () => {
        const rendered = renderer
            .create(
                <SafeAreaProvider>
                    <EulaScreenBase
                        eulaContent={SAMPLE_EULA}
                        checkboxLabel={'I have read and agree to the Terms & Conditions'}
                        onEulaAcceptedChange={(accepted: boolean): boolean => accepted}
                    />
                </SafeAreaProvider>
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });

    it('renders HTML Eula content', () => {
        const rendered = renderer
            .create(
                <SafeAreaProvider>
                    <EulaScreenBase
                        WorkflowCardHeaderProps={{ title: 'License Agreement' }}
                        eulaContent={`<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <title>Sample Static HTML with Paragraphs</title>
                  <style>
                    /* Add any desired styles for your paragraphs here, e.g., font, margin, etc. */
                  </style>
                </head>
                <body>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Nam libero justo, laoreet sit amet nulla nec, tincidunt auctor neque. Sed vel leo neque. Donec et odio dui. Curabitur non nisl aliquet, imperdiet magna vitae, pulvinar odio. Praesent id metus semper, fermentum odio eu, aliquam leo. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut in ante. Mauris sit amet diam eu nulla gravida ornare nec vitae elit. Curabitur non nisl aliquet, imperdiet magna vitae, pulvinar odio. Donec et odio dui.
                  </p>
                  <p>
                    Mauris viverra diam vitae est. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Proin gravida nibh vel velit auctor aliquam. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante blandit, a tincidunt tellus faucibus. Sed posuere consectetur est at lobortis. Pellentesque ornare sem lacinia quam venenatis vestibulum. Suspendisse potenti. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam.
                  </p>
                </body>
                </html>`}
                        html={true}
                        checkboxLabel={'I have read and agree to the Terms & Conditions'}
                        initialCheckboxValue={true}
                        onEulaAcceptedChange={(accepted: boolean): boolean => accepted}
                        WorkflowCardInstructionProps={{ instructions: 'Test Instructions' }}
                        WorkflowCardActionsProps={{
                            showNext: true,
                            nextLabel: 'Next',
                            canGoNext: true,
                            showPrevious: true,
                            previousLabel: 'Back',
                            canGoPrevious: true,
                            currentStep: 0,
                            totalSteps: 6,
                        }}
                    />
                </SafeAreaProvider>
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });

    it('renders Text Eula content', () => {
        const rendered = renderer
            .create(
                <SafeAreaProvider>
                    <EulaScreenBase
                        WorkflowCardHeaderProps={{ title: 'License Agreement' }}
                        eulaContent={SAMPLE_EULA}
                        checkboxLabel={'I have read and agree to the Terms & Conditions'}
                        checkboxProps={{ disabled: true }}
                        initialCheckboxValue={false}
                        onEulaAcceptedChange={(accepted: boolean): boolean => accepted}
                        WorkflowCardActionsProps={{
                            showNext: true,
                            nextLabel: 'Next',
                            canGoNext: true,
                            showPrevious: true,
                            previousLabel: 'Back',
                            canGoPrevious: true,
                            currentStep: 0,
                            totalSteps: 6,
                        }}
                    />
                </SafeAreaProvider>
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });

    it('check checkbox click with text eula content', () => {
        const checkboxfunction = jest.fn();
        const { getByTestId } = render(
            <SafeAreaProvider>
                <EulaScreenBase
                    WorkflowCardHeaderProps={{ title: 'License Agreement' }}
                    eulaContent={'Hello'}
                    checkboxLabel={'I have read and agree to the Terms & Conditions'}
                    initialCheckboxValue={false}
                    onEulaAcceptedChange={checkboxfunction}
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: 'Next',
                        canGoNext: true,
                        showPrevious: true,
                        previousLabel: 'Back',
                        canGoPrevious: true,
                        currentStep: 0,
                        totalSteps: 6,
                    }}
                />
            </SafeAreaProvider>
        );
        const scrollView = getByTestId('blui-eula-scroll-view');
        fireEvent.scroll(scrollView, {
            nativeEvent: {
                layoutMeasurement: { height: 100, width: 100 },
                contentOffset: { y: 50 },
                contentSize: { height: 100, width: 100 },
            },
        }); // Simulate scrolling

        const checkbox = getByTestId('blui-eula-checkbox');
        fireEvent.press(checkbox);
        expect(checkboxfunction).toHaveBeenCalledTimes(1);
    });
    it('check checkbox click with html eula content', () => {
        const checkboxfunction = jest.fn();
        const { getByTestId } = render(
            <SafeAreaProvider>
                <EulaScreenBase
                    WorkflowCardHeaderProps={{ title: 'License Agreement' }}
                    eulaContent={`<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <title>Sample Static HTML with Paragraphs</title>
                  <style>
                    /* Add any desired styles for your paragraphs here, e.g., font, margin, etc. */
                  </style>
                </head>
                <body>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Nam libero justo, laoreet sit amet nulla nec, tincidunt auctor neque. Sed vel leo neque. Donec et odio dui. Curabitur non nisl aliquet, imperdiet magna vitae, pulvinar odio. Praesent id metus semper, fermentum odio eu, aliquam leo. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut in ante. Mauris sit amet diam eu nulla gravida ornare nec vitae elit. Curabitur non nisl aliquet, imperdiet magna vitae, pulvinar odio. Donec et odio dui.
                  </p>
                  <p>
                    Mauris viverra diam vitae est. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Proin gravida nibh vel velit auctor aliquam. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante blandit, a tincidunt tellus faucibus. Sed posuere consectetur est at lobortis. Pellentesque ornare sem lacinia quam venenatis vestibulum. Suspendisse potenti. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam.
                  </p>
                </body>
                </html>`}
                    html={true}
                    checkboxLabel={'I have read and agree to the Terms & Conditions'}
                    initialCheckboxValue={false}
                    onEulaAcceptedChange={checkboxfunction}
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: 'Next',
                        canGoNext: true,
                        showPrevious: true,
                        previousLabel: 'Back',
                        canGoPrevious: true,
                        currentStep: 0,
                        totalSteps: 6,
                    }}
                />
            </SafeAreaProvider>
        );
        const scrollView = getByTestId('blui-eula-web-view');
        fireEvent.scroll(scrollView, {
            nativeEvent: {
                layoutMeasurement: { height: 100, width: 100 },
                contentOffset: { y: 50 },
                contentSize: { height: 100, width: 100 },
            },
        }); // Simulate scrolling

        const checkbox = getByTestId('blui-eula-checkbox');
        fireEvent.press(checkbox);
        expect(checkboxfunction).toHaveBeenCalledTimes(1);
    });
});
