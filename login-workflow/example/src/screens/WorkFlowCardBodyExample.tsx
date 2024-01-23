import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Header } from '@brightlayer-ui/react-native-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { WorkflowCardBody } from '@brightlayer-ui/react-native-auth-workflow';
import { HelperText, TextInput } from 'react-native-paper';
import { useThemeContext } from '../context/ThemeContext';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { UserMenuExample } from '../components/UserMenuExample';
import { toggleRTL } from './home';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'WorkFlowCardBodyExample'>;
};

const WorkFlowCardBodyExample: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useExtendedTheme();
    const { theme: themeType, setTheme } = useThemeContext();
    const [errorFilledText, setErrorFilledText] = React.useState('Hello');
    const [hasError, setHasError] = React.useState(true);

    return (
        <>
            <Header
                title={'Workflow Card Body Example'}
                icon={{ name: 'menu' }}
                onIconPress={(): void => {
                    navigation.openDrawer();
                }}
                actionItems={[
                    {
                        icon: { name: 'more' },
                        onPress: (): void => {},
                        component: (
                            <UserMenuExample
                                onToggleRTL={toggleRTL}
                                onToggleTheme={(): void => setTheme(themeType === 'light' ? 'dark' : 'light')}
                            />
                        ),
                    },
                ]}
            />
            <SafeAreaView  style={{backgroundColor: theme.colors.background, flex: 1}}>
                <ScrollView>
                    <WorkflowCardBody>
                        <TextInput
                            label="TextInput"
                            mode="flat"
                            left={<TextInput.Icon icon="email" />}
                            right={<TextInput.Icon icon="menu-down" />}
                            value={errorFilledText}
                            underlineColor={theme.colors.surface}
                            onChangeText={(value: string): void => {
                                setErrorFilledText(value);
                                setHasError(value.length > 4);
                            }}
                            error={hasError}
                        />
                        <HelperText type="error" visible={hasError} style={{ marginBottom: 8 }}>
                            Error Message
                        </HelperText>
                    </WorkflowCardBody>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default WorkFlowCardBodyExample;