/**
 * @format
 */

import React from 'react';
import 'react-native';
import { ContactSupport } from '../../screens/ContactSupport';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Nav
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

// Types
import { ContactParams } from '@brightlayer-ui/react-auth-shared';

describe('ContactSupport screen tested with enzyme', () => {
    function baseXML(): JSX.Element {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="ContactSupport"
                        component={ContactSupport}
                        initialParams={
                            {
                                contactEmail: 'exampleSupport@eaton.com',
                                contactPhone: '1-888-EXA-TEST',
                            } as ContactParams
                        }
                        options={(): { header: () => JSX.Element } => ({
                            header: (): JSX.Element => <></>,
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    it('renders correctly', () => {
        const rendered = renderer.create(baseXML()).toJSON();
        expect(rendered).toBeTruthy();
    });

    // it('snapshot', async () => {
    //     const component = mount(baseXML());
    //     expect(component).toMatchSnapshot();
    // });
});
