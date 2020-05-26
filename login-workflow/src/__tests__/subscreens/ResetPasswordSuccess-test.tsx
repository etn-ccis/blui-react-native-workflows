/**
 * @format
 */

import React from 'react';
import 'react-native';
import { ResetPasswordSuccess } from '../../subScreens/ResetPasswordSuccess';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Nav
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

describe('ResetPasswordSuccess subScreen tested with enzyme', () => {
    function baseXML(): JSX.Element {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="ResetPasswordSuccess"
                        component={ResetPasswordSuccess}
                        options={(): object => ({
                            // eslint-disable-next-line react/display-name
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
