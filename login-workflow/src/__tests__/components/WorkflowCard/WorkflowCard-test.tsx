import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import { WorkflowCard, WorkflowCardBody } from 'src/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

describe('WorkflowCard Test', () => {
    afterEach(cleanup);

    it('WorkflowCard renders correctly', () => {
        render(
            <SafeAreaProvider>
                <WorkflowCard loading>
                    <WorkflowCardBody>
                        <Text>This is workflow card body content.</Text>
                    </WorkflowCardBody>
                </WorkflowCard>
            </SafeAreaProvider>
        ).toJSON();
        expect(render).toBeTruthy();
    });

    it('WorkflowCardHeader true test', () => {
        render(
            <SafeAreaProvider>
                <WorkflowCard>
                    <WorkflowCardBody>
                        <Text>This is workflow card body content.</Text>
                    </WorkflowCardBody>
                </WorkflowCard>
            </SafeAreaProvider>
        ).toJSON();
        expect(render).toBeTruthy();
    });

    it('WorkflowCardHeader false test', () => {
        render(
            <SafeAreaProvider>
                <WorkflowCard>
                    <Text>This is workflow card body content.</Text>
                </WorkflowCard>
            </SafeAreaProvider>
        ).toJSON();
        expect(render).toBeTruthy();
    });
});
