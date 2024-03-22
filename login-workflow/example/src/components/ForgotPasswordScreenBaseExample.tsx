import React from 'react';
import { ForgotPasswordScreenBase, ForgotPasswordScreenProps } from '@brightlayer-ui/react-native-auth-workflow';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

export const ForgotPasswordScreenBaseExample: React.FC<ForgotPasswordScreenProps> = () => (
    <ForgotPasswordScreenBase
        WorkflowCardHeaderProps={{
            title: 'Forgot Password',
        }}
        WorkflowCardInstructionProps={{
            instructions: 'Please enter the email address associated with the account',
        }}
        emailTextInputFieldProps={{
            label: 'Email Address',
        }}
        successScreen={
            <View>
                <Text>Success</Text>
            </View>
        }
        WorkflowCardActionsProps={{
            showPrevious: true,
            previousLabel: 'Back',
            showNext: true,
            nextLabel: 'Next',
        }}
    />
);
