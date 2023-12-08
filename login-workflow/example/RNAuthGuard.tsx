import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

type RNAuthGuardProps = {
    fallbackScreen?: any;
    isAuthenticated?: boolean;
    // children?: any;
    fallbackScreenName?: any;
    component?: any;
};

const Stack = createStackNavigator();

export const RNAuthGuard: React.FC<React.PropsWithChildren<RNAuthGuardProps>> = (props) => {
    const {fallbackScreen, isAuthenticated, fallbackScreenName, children} = props;

//   if(!isAuthenticated) {
//     return <Stack.Screen name={fallbackScreenName} component={fallbackScreen} />
//   }
  return children;
}
