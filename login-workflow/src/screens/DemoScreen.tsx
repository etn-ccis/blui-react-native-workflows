import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTranslation } from 'react-i18next';

export const DemoScreen: React.FC = () => {
    const { t } = useTranslation(['bluiRegistration', 'bluiCommon']);
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text variant="headlineSmall">App Level Translation</Text>
            <Text variant="bodyMedium">{`Registration Translations: ${t(
                'bluiRegistration:REGISTRATION.STEPS.CREATE_ACCOUNT'
            )}`}</Text>
            <Text variant="bodyMedium">{`Common Translations: ${t('bluiCommon:ACTIONS.OKAY')}`}</Text>
        </View>
    );
};
