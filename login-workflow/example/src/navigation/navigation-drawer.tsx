import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerNavGroup,
    IconFamily,
    NavItem,
} from '@brightlayer-ui/react-native-components';
import React, { useState, useCallback } from 'react';
import * as Colors from '@brightlayer-ui/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';

const Menu: IconFamily = { name: 'menu', direction: 'ltr' };
const Home: IconFamily = { name: 'home', direction: 'ltr' };
const LooksOne: IconFamily = { name: 'looks-one', direction: 'ltr' };
const LooksTwo: IconFamily = { name: 'looks-two', direction: 'ltr' };

export const navGroupItems: NavItem[] = [
    {
        title: 'Home Page',
        itemID: 'Home',
        icon: Home,
    },
    {
        title: 'Page One',
        itemID: 'PageOne',
        icon: LooksOne,
    },
    {
        title: 'Page Two',
        itemID: 'PageTwo',
        icon: LooksTwo,
    },
];

export type NavDrawerProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NavigationDrawer'>;
};

export const NavigationDrawer: React.FC<NavDrawerProps> = ({ navigation }) => {
    const [selected, setSelected] = useState('Home');
    const selectItem = useCallback(
        (id) => {
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
                fontColor={Colors.white[50]}
                icon={Menu}
                onIconPress={(): void => {
                    // @ts-ignore
                    navigation.closeDrawer();
                }}
            />
            <DrawerBody>
                <DrawerNavGroup items={navGroupItems} hidePadding={false} />
            </DrawerBody>
        </Drawer>
    );
};
