import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup, NavItem } from '@brightlayer-ui/react-native-components';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';
import { DrawerActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { IconFamily } from '@brightlayer-ui/react-native-components/core/__types__';

export type NavDrawerProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NavigationDrawer'>;
};

export const NavigationDrawer: React.FC<NavDrawerProps> = ({ navigation }) => {
    const [selected, setSelected] = useState('Home');
    const { t } = useTranslation();
    const navigationState = navigation.getState();
    const Homepage: IconFamily = { family: 'material', name: 'home', direction: 'ltr' };
    const Dashboard: IconFamily = { family: 'material', name: 'dashboard', direction: 'ltr' };
    const Notifications: IconFamily = { family: 'material', name: 'notifications', direction: 'ltr' };
    const selectItem = useCallback(
        (id: any) => {
            navigation.navigate(id);
            setSelected(id);
        },
        [navigation]
    );

    const navGroupItems = useMemo(
        (): NavItem[] => [
            {
                title: `${t('TOOLBAR_MENU.HOME_PAGE')}`,
                itemID: 'Homepage',
                icon: Homepage,
            },
            {
                title: `${t('DRAWER_MENU.DASHBOARD')}`,
                itemID: 'Dashboard',
                icon: Dashboard,
            },
            {
                title: `${t('DRAWER_MENU.LOCATIONS')}`,
                itemID: 'Locations',
                icon: Notifications,
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(() => {
        const id = navGroupItems[navigationState.index]?.itemID;
        if (id) {
            setSelected(id);
        }
    }, [navigationState.index, navGroupItems]);

    return (
        <Drawer activeItem={selected} onItemSelect={(id: string): void => selectItem(id)}>
            <DrawerHeader
                title={'Brightlayer UI'}
                subtitle={'React Native Project'}
                icon={{ name: 'menu' }}
                onIconPress={(): void => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                }}
            />
            <DrawerBody>
                <DrawerNavGroup items={navGroupItems} hidePadding={false} />
            </DrawerBody>
        </Drawer>
    );
};
