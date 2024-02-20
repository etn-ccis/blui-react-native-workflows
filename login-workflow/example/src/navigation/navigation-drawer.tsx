import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup, NavItem } from '@brightlayer-ui/react-native-components';
import React, { useState, useCallback } from 'react';
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
        title: 'Registration Success Screen',
        itemID: 'RegistrationSuccessScreen',
        icon: { name: 'looks-one' },
    },
    {
        title: 'Workflow Card',
        itemID: 'WorkFlowCardExample',
        icon: { name: 'looks-two' },
    },
    {
        title: 'I18n',
        itemID: 'I18nExample',
        icon: { name: 'translate' },
    },
    {
        title: 'RegistrationContext',
        itemID: 'RegistratonContextExample',
        icon: { name: 'person' },
    },
    {
        title: 'Registration Provider',
        itemID: 'RegistrationProviderExample',
        icon: { name: 'app-registration' },
    },
    {
        title: 'VerifyCodeScreenBase',
        itemID: 'VerifyCodeScreenBaseExample',
        icon: { name: 'check' },
    },
    {
        title: 'Account Details Base Screen',
        itemID: 'AccountDetailsBaseExample',
        icon: { name: 'person' },
    },
];

export type NavDrawerProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NavigationDrawer'>;
};

export const NavigationDrawer: React.FC<NavDrawerProps> = ({ navigation }) => {
    const [selected, setSelected] = useState('Home');
    const selectItem = useCallback(
        (id: any) => {
            navigation.navigate(id);
            setSelected(id);
        },
        [navigation]
    );

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
