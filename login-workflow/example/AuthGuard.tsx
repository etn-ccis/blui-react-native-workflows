import React from 'react'
import { useNavigation } from '@react-navigation/native';

type AuthGuardProps = {
    fallbackUrl?: any;
    isAuthenticated?: boolean;
    children?: any;
    setFallbackScreen?: any;
};

export const AuthGuard: React.FC<AuthGuardProps> = (props) => {
    const {fallbackUrl, isAuthenticated, children = null} = props;
const navigation = useNavigation();

  if(!isAuthenticated) {
    navigation.navigate(fallbackUrl)
  }

  return children;
}
