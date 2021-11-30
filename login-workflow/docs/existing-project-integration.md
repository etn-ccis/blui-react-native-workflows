# Integrating Into an Existing Project

To start integrating this package into an existing application, you must first have an application. We recommend using the [Brightlayer UI CLI](https://www.npmjs.com/package/@brightlayer-ui/cli) to initialize your project.

#### Installation and Setup

Once you have a project, you can install this package via:

```shell
npm install --save @brightlayer-ui/react-native-auth-workflow
// or
yarn add @brightlayer-ui/react-native-auth-workflow
```

This package also has a number of peer dependency requirements that you will also need to install in your project. To install the latest version of all of these peer dependencies, run the following command in your project root:

```
npm install --save @brightlayer-ui/colors @brightlayer-ui/react-native-components @react-navigation/native @react-navigation/stack react react-i18next i18next react-native react-native-vector-icons react-native-paper date-fns react-native-pager-view @react-native-community/masked-view react-native-gesture-handler react-native-safe-area-context react-native-screens react-native-keyboard-aware-scroll-view react-native-webview@^10.0.0
// or
yarn add @brightlayer-ui/colors @brightlayer-ui/react-native-components @react-navigation/native @react-navigation/stack react react-i18next i18next react-native react-native-vector-icons react-native-paper date-fns react-native-pager-view @react-native-community/masked-view react-native-gesture-handler react-native-safe-area-context react-native-screens react-native-keyboard-aware-scroll-view react-native-webview@^10.0.0
```

> **NOTE:** we use version 10 of react-native-webview because of compatibility issues with version 11 on Android.

You will also need `@react-native-async-storage/async-storage` unless you plan to write your own local storage wrapper.

> If you are developing for iOS, don't forget to do a `pod install` in your /ios folder to finish linking these libraries.

#### Implement AuthUIActions and RegistrationUIActions

You need to implement the backend networking for all networking within react-native-auth-workflow. Your implementation will likely involve writing calls to your APIs and caching the returned data, as needed, depending on the requirements of your application. The example application has these actions mocked with calls to `sleep`.

1. Create a `/src` folder in your application if it does not already exist
2. Add an `/actions` folder inside the `src` directory.
3. Create two files in the new `actions` directory: `AuthUIActions.tsx` and `RegistrationUIActions.tsx`
    - The first file you created, `AuthUIActions.tsx`, will handle the implementation of the authentication related actions (such as login and forgot password).
    - The second file you created, `RegistrationActions.tsx`, will handle the implementation of the registration related actions (such as loading the EULA and registration by invitation).
    - You can copy these files directly from the [example](https://github.com/brightlayer-ui/react-native-workflows/tree/master/login-workflow/example) project as a starting point and then update the implementation details if you choose.
4. You might also want to copy over the `example/src/store` and `example/src/constants` folders from react-native-auth-workflow for the purposes of compiling with the mock `AuthUIActions` and `RegistrationUIActions` before you write your own implementation. (Note you will need to install `@react-native-async-storage/async-storage` if you use this `local-storage.ts`.)
5. Import the actions in your root app file (usually App.tsx):

```
import { ProjectAuthUIActions } from './src/actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './src/actions/RegistrationUIActions';
```

#### Setting Up the Application Structure

1. In the root app file (generally App.tsx), add the following imports to the top of the file:

    ```
    import {
        SecurityContextProvider,
        AuthNavigationContainer,
        AuthUIContextProvider,
        useSecurityActions,
    } from '@brightlayer-ui/react-native-auth-workflow';
    ```

2. Inside your root export, wrap your entire application as follows, where `<YourApp>` is your existing app structure XML:

```
<SecurityContextProvider>
    <AuthUIConfiguration>
        <AuthNavigationContainer /* initialState={initialState} ref={ref} */>
            <YourApp/>   <--- Your existing app
        </AuthNavigationContainer>
    </AuthUIConfiguration>
</SecurityContextProvider>
```

#### Configure AuthUIContextProvider

Create a functional component in your root app file that configures the options for the React Native Auth Workflow package. The component definition should look something like this:

```ts
export const AuthUIConfiguration = (props) => {
    const securityContextActions = useSecurityActions();
    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            showSelfRegistration={true}
            allowDebugMode={true}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            contactPhoneLink={'1-800-123-4567'}
            projectImage={require('./src/assets/images/some_image.png')}
        >
            {props.children}
        </AuthUIContextProvider>
    );
};
```

You can skip passing the `projectImage` property if you don't have one yet.

The various configuration options are explained in more detail in the [API](https://github.com/brightlayer-ui/react-native-workflows/tree/master/login-workflow/docs/API.md) documentation.

You can read more about customizing the `AuthUIContextProvider` in the [Customization Guide](https://github.com/brightlayer-ui/react-native-workflows/tree/master/login-workflow/docs/customization.md)

#### Setting Up Deep Links

There are certain screens in the React Native Auth Workflow that are only accessible from an email link. For these screens to work, you must configure your application to support deep linking. Follow the React Navigation v5 [Deep Link guide](https://reactnavigation.org/docs/deep-linking/) to configure your project for deep-link integration.

Once you have configured your application to support deep linking, you will need to configure the specific deep links for the React Native Auth Workflow package. A good way to start is to copy the `src/navigation` folder into your project from the example to get a sample implementation of the deep linking options and `resolveInitialState` method. You can read more about deep linking in the [Readme](https://github.com/brightlayer-ui/react-native-workflows/tree/master/login-workflow/README.md).

> NOTE: It is recommended to specify an [initialRouteName](https://reactnavigation.org/docs/stack-navigator/#initialroutename) for the LinkingOptions in DeepLinking.ts.

Once you have set up the deep links, you can complete the implementation of the `AuthNavigationContainer` in App.tsx:

1. Import the necessary linking modules
    ```ts
    import { useLinking } from '@react-navigation/native';
    import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';
    ```
2. Set up state for deep link handling in your root component before the return statement:

    ```tsx
    const ref = React.useRef();

    // Setup deep links. Check DeepLinking file for path to screen mapping
    const { getInitialState } = useLinking(ref, authLinkMapping);
    const [initialState, setInitialState] = React.useState();

    React.useEffect(() => {
        resolveInitialState(getInitialState, setInitialState);
    }, [getInitialState]);
    ```

You should now be able to run your app with the react-native-auth-workflow integrated. You should be presented with a login screen (any valid email address will allow you to log in). Once you log in, you'll see the rest of your application.
