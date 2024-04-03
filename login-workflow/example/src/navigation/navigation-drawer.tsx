import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup, NavItem } from '@brightlayer-ui/react-native-components';
import React, { useState, useCallback, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';
import { DrawerActions } from '@react-navigation/native';

export const navGroupItems: NavItem[] = [
    {
        title: 'Home Page',
        itemID: 'Home',
        icon: { name: 'home' },
    },
    {
        title: 'Registration Provider',
        itemID: 'RegistrationProviderExample',
        icon: { name: 'app-registration' },
    },
    {
        title: 'Auth Provider',
        itemID: 'AuthProviderExample',
        icon: { name: 'app-registration' },
    },
    {
        title: 'Contact Full Screen',
        itemID: 'ContactFullScreenExample',
        icon: { name: 'app-registration' },
    },
    {
        title: 'ResetPasswordScreenBase',
        itemID: 'ResetPasswordScreenBaseExample',
        icon: { name: 'lock' },
    },
    {
        title: 'ForgotPasswordScreenBase',
        itemID: 'ForgotPasswordScreenBaseExample',
        icon: { name: 'app-registration' },
    },
    {
        title: 'Contact',
        itemID: 'Contact',
        icon: { name: 'contact-page' },
    },
];

export type NavDrawerProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NavigationDrawer'>;
};

export const NavigationDrawer: React.FC<NavDrawerProps> = ({ navigation }) => {
    const [selected, setSelected] = useState('Home');
    const navigationState = navigation.getState();
    const selectItem = useCallback(
        (id: any) => {
            navigation.navigate(id);
        },
        [navigation]
    );

    useEffect(() => {
        const id = navGroupItems[navigationState.index].itemID;
        setSelected(id);
    }, [navigationState.index]);

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
