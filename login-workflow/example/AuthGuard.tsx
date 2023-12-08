import React from 'react'
import { useNavigation, StackActions } from '@react-navigation/native';
import { useApp } from './Guard/GuardContextProvider';

type AuthGuardProps = {
    fallbackUrl?: any;
    isAuthenticated?: boolean;
    children?: any;
    setFallbackScreen?: any;
};

export const AuthGuard: React.FC<AuthGuardProps> = (props) => {
    const {fallbackUrl, isAuthenticated, children = null, setFallbackScreen} = props;
    const popAction = StackActions.pop(1);
const navigation = useNavigation();

  if(!isAuthenticated) {
    // setFallbackScreen(fallbackUrl)
    navigation.navigate(fallbackUrl)
  }
  else {
    navigation.dispatch(popAction)
  }

  return children;
}
