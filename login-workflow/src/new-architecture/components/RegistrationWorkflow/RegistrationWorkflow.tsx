import React, { useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { DemoScreen } from 'src/new-architecture/screens';

export const RegistrationWorflow: React.FC<React.PropsWithChildren<any>> = (props) => {
    const { children = [DemoScreen, <Text>Hello 2</Text>, DemoScreen] } = props;
    const screens = [...(Array.isArray(children) ? children : [children])];
    // const totalScreens = screens.length;
    const [currentScreen, setCurrentScreen] = useState(0);

    return (
        <>
            <SafeAreaView>
                <View>
                    <>
                        {/* {screens[currentScreen]} */}
                        <View style={{ display: 'flex' }}>
                            <Button onPress={() => setCurrentScreen(currentScreen - 1)}>Back</Button>
                            <Button onPress={() => setCurrentScreen(currentScreen + 1)}>Next</Button>
                        </View>
                    </>
                </View>
            </SafeAreaView>
        </>
    );
};
