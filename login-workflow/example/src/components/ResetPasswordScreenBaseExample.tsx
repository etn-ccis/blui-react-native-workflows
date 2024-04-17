import React from 'react';
import { ResetPasswordScreen } from '@brightlayer-ui/react-native-auth-workflow';

export const ResetPasswordScreenBaseExample: React.FC = () => {
    return (
        <ResetPasswordScreen
            accountParams={{
                code: '123',
                email: 'test@eaton.com',
            }}
        />
    );
};
