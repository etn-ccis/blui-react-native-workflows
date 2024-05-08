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
import { useNavigation } from '@react-navigation/native';
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
const ExitToAppIcon: IconFamily = {
    family: 'material',
    name: 'exit-to-app',
    direction: 'ltr',
};
const LockIcon: IconFamily = {
    family: 'material',
    name: 'lock',
    direction: 'ltr',
};

type UserMenuExampleProps = {
    onToggleRTL: () => void;
    onToggleTheme: () => void;
};

export const UserMenuComponent: React.FC<UserMenuExampleProps> = (props) => {
    const { onToggleRTL, onToggleTheme } = props;
    const theme = useExtendedTheme();
    const { i18n, t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const app = useApp();
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
    };
    const changePassword = (): void => {
        navigation.navigate('ChangePassword');
    };
    const languageOptions = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'Chinese', value: 'zh' },
        { label: 'Portuguese', value: 'pt' },
    ];

    const menuItems: InfoListItemProps[] = [
        { title: t('USER_MENU.TOGGLE_RTL'), icon: SwapIcon, onPress: (): void => onToggleRTL() },
        {
            title: t('USER_MENU.TOGGLE_THEME'),
            icon: InvertColorsIcon,
            onPress: (): void => onToggleTheme(),
        },
        {
            title: t('USER_MENU.LANGUAGE'),
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
        { title: t('USER_MENU.CHANGE_PASSWORD'), icon: LockIcon, onPress: (): void => changePassword() },
        { title: t('USER_MENU.LOG_OUT'), icon: ExitToAppIcon, onPress: (): void => logout() },
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
