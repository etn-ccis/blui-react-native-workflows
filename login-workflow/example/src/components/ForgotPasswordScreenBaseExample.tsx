import React from 'react';
import { ForgotPasswordScreenBase, ForgotPasswordScreenProps } from '@brightlayer-ui/react-native-auth-workflow';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

export const ForgotPasswordScreenBaseExample: React.FC<ForgotPasswordScreenProps> = () => {
    return (
        <ForgotPasswordScreenBase
            WorkflowCardHeaderProps={{
                title: 'Forgot Password Screen Base',
            }}
            WorkflowCardInstructionProps={{
                instructions: 'Enter your email id for password reset',
            }}
            emailTextInputFieldProps={{
                label: 'Email id',
            }}
            successScreen={
                <View>
                    <Text>Success</Text>
                </View>
            }
        />
    );
};
