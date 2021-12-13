import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerNavGroup,
    NavItem,
    wrapIcon,
} from '@brightlayer-ui/react-native-components';
import React, { useState, useCallback } from 'react';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '@brightlayer-ui/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';

const Menu = wrapIcon({ IconClass: MatIcon, name: 'menu', flip: false });
const Home = wrapIcon({ IconClass: MatIcon, name: 'home', flip: false });
const LooksOne = wrapIcon({ IconClass: MatIcon, name: 'looks-one', flip: false });
const LooksTwo = wrapIcon({ IconClass: MatIcon, name: 'looks-two', flip: false });

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
                icon={{
                    icon: Menu,
                    onPress: (): void => {
                        // @ts-ignore
                        navigation.closeDrawer();
                    },
                }}
            />
            <DrawerBody>
                <DrawerNavGroup items={navGroupItems} hidePadding={false} />
            </DrawerBody>
        </Drawer>
    );
};
