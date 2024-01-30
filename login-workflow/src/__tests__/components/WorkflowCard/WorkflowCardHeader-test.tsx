import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { WorkflowCardHeader, isLightColor } from 'src/components/WorkflowCard';
import renderer from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Or the appropriate library

describe('WorkflowCardHeader', () => {
    afterEach(cleanup);
    it('WorkflowCardHeader renders correctly', () => {
        const rendered = renderer
            .create(
                <SafeAreaProvider>
                    <WorkflowCardHeader title={'title'} onIconPress={jest.fn()} />
                </SafeAreaProvider>
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });
    it('WorkflowCardHeader renders correctly with custom icon', () => {
        const rendered = renderer
            .create(
                <SafeAreaProvider>
                    <WorkflowCardHeader title={'title'} onIconPress={jest.fn()} icon={{ name: 'close' }} />
                </SafeAreaProvider>
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });

    it('renders the title correctly', () => {
        const title = 'Test Title';
        const { getByText } = render(
            <SafeAreaProvider>
                {' '}
                <WorkflowCardHeader title={title} onIconPress={jest.fn()} />
            </SafeAreaProvider>
        );
        expect(getByText(title)).toBeTruthy();
    });

    it('calls onIconPress when the icon is pressed', () => {
        const onIconPress = jest.fn();
        const { getByTestId } = render(
            <SafeAreaProvider>
                <WorkflowCardHeader title="Test Title" onIconPress={onIconPress} />
            </SafeAreaProvider>
        );
        const icon = getByTestId('workflow-card-icon');
        fireEvent.press(icon);
        expect(onIconPress).toHaveBeenCalledTimes(1);
    });
});
describe('isLightColor function', () => {
    it('correctly identifies light colors', () => {
        const lightColor = '#B1DAFF';
        const isLight = isLightColor(lightColor);
        expect(isLight).toBe(true);
    });

    it('correctly identifies dark colors', () => {
        const darkColor = '#005EB8';
        const isLight = isLightColor(darkColor);

        expect(isLight).toBe(false);
    });
});
