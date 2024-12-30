export default {
    oidc: {
        clientId: process.env.OKTA_CLIENT_ID,
        redirectUri: process.env.OKTA_REDIRECT_URI,
        endSessionRedirectUri: process.env.OKTA_LOGOUT_REDIRECT_URI,
        discoveryUri: process.env.OKTA_ISSUER,
        scopes: ['openid', 'profile', 'offline_access', 'groups'],
        requireHardwareBackedKeyStore: false,
    },
};
