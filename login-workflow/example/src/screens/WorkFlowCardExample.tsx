import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Header } from '@brightlayer-ui/react-native-components';
import {
    WorkflowCardBody,
    WorkflowCardInstructions,
    WorkflowCardActions,
    ErrorManager,
    useErrorManager,
} from '@brightlayer-ui/react-native-auth-workflow';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useThemeContext } from '../context/ThemeContext';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { UserMenuExample } from '../components/UserMenuExample';
import { toggleRTL } from './home';
import { useNavigation } from '@react-navigation/native';

const logIn = (): Promise<void> => {
    throw new Error('My Custom Error');
};

const WorkFlowCardExample: React.FC = () => {
    const theme = useExtendedTheme();
    const { theme: themeType, setTheme } = useThemeContext();
    const [errorFilledText, setErrorFilledText] = React.useState('Hello');
    const [hasError, setHasError] = React.useState(true);
    const { triggerError, errorManagerConfig } = useErrorManager();
    const navigation = useNavigation();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        onClose: (): void => {
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const onNext = useCallback(async (): Promise<void> => {
        try {
            await logIn();
        } catch (_error) {
            triggerError(_error as Error);
        }
    }, [triggerError]);

    return (
        <>
            <Header
                title={'Workflow Card Example'}
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
            <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
                <ScrollView>
                    <WorkflowCardInstructions instructions={'Test Instructions'} />
                    <WorkflowCardBody>
                        <ErrorManager {...errorDisplayConfig}>
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
                            <Button onPress={(): void => void onNext()}>Click for error</Button>
                        </ErrorManager>
                    </WorkflowCardBody>
                </ScrollView>
                <WorkflowCardActions showPrevious showNext previousLabel="Back" nextLabel="Next" />
            </SafeAreaView>
        </>
    );
};

export default WorkFlowCardExample;
