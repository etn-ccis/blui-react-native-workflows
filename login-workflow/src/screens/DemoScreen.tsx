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
                paddingTop: 50,
            }}
        >
            <Text>{`Registration Translations: ${t('bluiRegistration:REGISTRATION.STEPS.CREATE_ACCOUNT')}`}</Text>
            <Text>{`Common Translations: ${t('bluiCommon:ACTIONS.OKAY')}`}</Text>
        </View>
    );
};
