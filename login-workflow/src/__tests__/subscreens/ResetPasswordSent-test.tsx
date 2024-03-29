/**
 * @format
 */

import React from 'react';
import 'react-native';
import { ResetPasswordSent } from '../../subScreens/ResetPasswordSent';
import { cleanup } from '@testing-library/react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Nav
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

describe('ResetPasswordSent subScreen tested with enzyme', () => {
    afterEach(cleanup);
    function baseXML(): JSX.Element {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="ResetPasswordSent"
                        component={ResetPasswordSent}
                        options={(): { header: () => JSX.Element } => ({
                            header: (): JSX.Element => <></>,
                        })}
                        initialParams={{ email: 'some@email.com' }}
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
