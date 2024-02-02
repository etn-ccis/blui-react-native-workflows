import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTranslation } from 'react-i18next';

export const ChangePassword: React.FC = () => {
    const { t } = useTranslation(['bluiRegistration', 'bluiCommon']);
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>{`${t('bluiRegistration:REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS')}`}</Text>
            <Text>{`${t('bluiCommon:ACTIONS.OKAY')}`}</Text>
        </View>
    );
};
