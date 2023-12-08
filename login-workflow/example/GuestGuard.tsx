import React from 'react'

type GuestGuardProps = {
    fallbackScreen?: any;
    isAuthenticated?: boolean;
    children?: any;
};

export const GuestGuard: React.FC<GuestGuardProps> = (props) => {
    const {fallbackScreen, isAuthenticated, children = null} = props;

  if(isAuthenticated) {
    return fallbackScreen
  }
  return children;
}
