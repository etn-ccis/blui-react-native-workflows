import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { WorkflowCardHeader } from 'src/components/WorkflowCard';
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
                    <WorkflowCardHeader
                        title={'title'}
                        backgroundColor="#fff"
                        onIconPress={jest.fn()}
                        icon={{ name: 'close' }}
                    />
                </SafeAreaProvider>
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });

    it('renders the title and subtitle correctly', () => {
        const title = 'Test Title';
        const subtitle = 'subtitle';
        const { getByText } = render(
            <SafeAreaProvider>
                {' '}
                <WorkflowCardHeader title={title} subTitle={subtitle} onIconPress={jest.fn()} />
            </SafeAreaProvider>
        );
        expect(getByText(title)).toBeTruthy();
        expect(getByText(subtitle)).toBeTruthy();
    });

    it('calls onIconPress when the icon is pressed', () => {
        const onIconPress = jest.fn();
        const { getByTestId } = render(
            <SafeAreaProvider>
                <WorkflowCardHeader title="Test Title" onIconPress={onIconPress} />
            </SafeAreaProvider>
        );
        const icon = getByTestId('blui-workflow-card-header-icon');
        fireEvent.press(icon);
        expect(onIconPress).toHaveBeenCalledTimes(1);
    });
});
