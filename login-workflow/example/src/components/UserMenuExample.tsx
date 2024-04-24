import { InfoListItemProps, UserMenu } from '@brightlayer-ui/react-native-components';
import React from 'react';
import { Avatar } from 'react-native-paper';
import * as BLUIColors from '@brightlayer-ui/colors';
import { IconFamily } from '@brightlayer-ui/react-native-components/core/__types__';
import SelectDropdown from 'react-native-select-dropdown';
import { useTranslation } from 'react-i18next';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { useApp } from '../contexts/AppContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStorage } from '../store/local-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SwapIcon: IconFamily = {
    family: 'material',
    name: 'swap-horiz',
    direction: 'ltr',
};
const InvertColorsIcon: IconFamily = {
    family: 'material',
    name: 'invert-colors',
    direction: 'ltr',
};
const CancelIcon: IconFamily = {
    family: 'material',
    name: 'cancel',
    direction: 'ltr',
};

type UserMenuExampleProps = {
    onToggleRTL: () => void;
    onToggleTheme: () => void;
};

export const UserMenuExample: React.FC<UserMenuExampleProps> = (props) => {
    const { onToggleRTL, onToggleTheme } = props;
    const theme = useExtendedTheme();
    const { i18n } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const app = useApp();
    const route = useRoute().name;
    const handleLanguageChange = async (newLanguage: string): Promise<any> => {
        app.setLanguage(newLanguage);
        void i18n.changeLanguage(newLanguage);
        try {
            await AsyncStorage.setItem('userLanguage', newLanguage);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error setting new language:', error);
        }
    };
    const logout = (): void => {
        LocalStorage.clearAuthCredentials();
        app.onUserNotAuthenticated();
        app.setAuthenticated(false);
        app.setLoginData({ email: '', rememberMe: false });
        navigation.navigate('AuthProviderExample', { screen: 'Login' });
    };
    const changePassword = (): void => {
        navigation.navigate('ChangePassword', { previousScreen: route });
    };
    const languageOptions = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'Chinese', value: 'zh' },
        { label: 'Portuguese', value: 'pt' },
    ];

    const menuItems: InfoListItemProps[] = [
        { title: 'Toggle RTL', icon: SwapIcon, onPress: (): void => onToggleRTL() },
        {
            title: 'Toggle Theme',
            icon: InvertColorsIcon,
            onPress: (): void => onToggleTheme(),
        },
        {
            title: 'Language',
            icon: { name: 'translate' },
            rightComponent: (
                <SelectDropdown
                    defaultValue={languageOptions.find((option) => option.value === i18n.language)}
                    // eslint-disable-next-line
                    onSelect={(item) => handleLanguageChange(item.value)}
                    data={languageOptions}
                    buttonStyle={{ backgroundColor: theme.colors.background }}
                    buttonTextStyle={{ color: theme.colors.primary }}
                    rowTextForSelection={(item) => item.label}
                    buttonTextAfterSelection={() => {
                        const selectedLabel = languageOptions.find((option) => option.value === i18n.language)?.label;
                        return selectedLabel || 'Select Language';
                    }}
                />
            ),
        },
        { title: 'Change Password', icon: CancelIcon, onPress: (): void => changePassword() },
        { title: 'Logout', icon: CancelIcon, onPress: (): void => logout() },
    ];

    return (
        <UserMenu
            menuTitle={'John Smith'}
            menuSubtitle={'Account Manager'}
            menuItems={menuItems}
            avatar={
                <Avatar.Icon
                    icon="account-circle"
                    size={40}
                    color={BLUIColors.primary[50]}
                    style={{ backgroundColor: BLUIColors.primary[80] }}
                />
            }
        />
    );
};
