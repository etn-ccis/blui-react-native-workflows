# React Native Auth UI #

[![@etn-sst/react-native-auth-ui package in Components feed in Azure Artifacts](https://feeds.dev.azure.com/etn-sst/522ba214-f560-465b-9c35-da1396524fdd/_apis/public/Packaging/Feeds/ea659b01-3c7c-4772-83bd-060ccc12bfe2/Packages/813ed6c4-8e40-4fc2-a4ff-92c7ef3a4630/Badge)](https://dev.azure.com/etn-sst/Washington/_packaging?_a=package&feed=ea659b01-3c7c-4772-83bd-060ccc12bfe2&package=813ed6c4-8e40-4fc2-a4ff-92c7ef3a4630&preferRelease=true)

[![Dev Build Status](https://dev.azure.com/etn-sst/Washington/_apis/build/status/Component-Validation?branchName=dev)](https://dev.azure.com/etn-sst/Washington/_build/latest?definitionId=10&branchName=dev)

The React Native Authentication UI Component provides a consistant authentication and registraton experience across Eaton mobile applications. 

**iOS**

![Login iOS](/media/login_ios.png) ![Home iOS](/media/home_ios.png) ![Password iOS](/media/pass_ios.png)

**Android**

![Login Android](/media/login_android.png) ![Home Android](/media/home_android.png) ![Password Android](/media/pass_android.png)

## User Interface ##

The **React Native Auth UI** provides iOS and Android support for Login, Forgot Password, Contact Information, Self Registration, Registration by Invitation, and Change Password.

Integrating the user interface into your application is as easy as providing the API calls for the various authentication and registration actions performed by the user. The `AuthNavigationContainer` automatically handles the presentation of the non-secure (pre-authorization) and secure (custom application) portions of a mobile application. 

---

## 1. Setup and configuration ##

### Scenario 1 (recommended): Integration into an existing React Native project ###

We recommend using the PX Blue CLI or React CLI to initalize your project. Follow these instructions to integrate React Native Auth UI into an existing React Native project.

#### Initial setup ####

Follow these [instructions](https://dev.azure.com/etn-sst/Washington/_packaging?_a=package&feed=Components&package=%40etn-sst%2Freact-native-auth-ui&protocolType=Npm) to connect to the @etn-sst/react-native-auth-ui feed and run `yarn add @etn-sst/react-native-auth-ui` to install the package. (Pass `@<version>` to specify a particular version to install).

You will see "unmet peer dependencies" errors after you run `yarn` in the parent directory. You need to install all the peer dependencies required by react-native-auth-ui:
> TODO: Add a copy/paste blurb with all of the peerDependencies

```
"@pxblue/colors": "^1.0.13",
"@pxblue/react-native-components": "^2.0.2",
"@pxblue/react-native-themes": "^4.0.0",
"@react-navigation/native": "^5.1.1",
"@react-navigation/stack": "^5.2.3",
"react": "*",
"react-i18next": "^11.3.4",
"i18next": "^19.3.4",
"react-native": "^0.61.5",
"react-native-vector-icons": "*",
"react-native-elements": "^1.2.7",
"react-native-paper": "^3.7.0",
"date-fns": "^2.11.1",
"@react-native-community/viewpager": "^3.3.0",
"@react-native-community/masked-view": "^0.1.7",
"react-native-gesture-handler": "^1.6.1",
"react-native-safe-area-context": "^0.7.3",
"react-native-screens": "^2.4.0",
"react-native-keyboard-aware-scroll-view": "0.9.1"
```

You may also want to use `"@react-native-community/async-storage": "^1.9.0"` if you copy over and use `store/local-strage.ts` in a later step, as it requires AsyncStorage.

Don't forget to do a `pod install` in your iOS folder.

#### Implement AuthUIActions and RegistrationUIActions ####

You need to implement the backend networking for all networking within react-native-auth-ui. 

Your implementation will likely involve writing calls to your APIs and caching the returned data, as needed, depending on the requirements of your application.

1. Create a folder called `actions` inside your root directory.
2. Create two empty files in the `actions` directory called `<proj>AuthUIActions.tsx` and `<proj>RegistrationUIActions.tsx`, where `<proj>` is the name of your project.
3. Fill in the implementation details for the two files you already created in the `actions` directory. 
    - The first file you created, `<proj>AuthUIActions.tsx`, will handle the implementation of the authentication related actions (such as login and forgot pasword).
        - The easiest way to create this file will be to copy the example mock implementation within the react-native-auth-ui repository. This is found in `examples/src/actions/MockAuthUIActions.ts`. Copy and paste the file's contents into your `<proj>AuthUIActions.tsx` file. You will likely want to rename the occurrences of `MockAuthUIActions` to `<proj>AuthUIActions`.         
    - The second file you created, `<proj>RegistrationActions.tsx`, will handle the implementation of the registration related actions (such as loading the EULA and registration by invitation).
        - The easiest way to create this file will be to copy the example mock implementation within the react-native-auth-ui repository. This is found in `examples/src/actions/MockRegistrationUIActions`. Copy and paste the file's contents into your `<proj>RegistrationActions.tsx` file. You will likely want to rename the occurrences of `MockRegistrationUIActions` to `<proj>RegistrationUIActions`.
4. You may also wish to copy over the `examples/src/store` and `examples/src/constants` folders from react-native-auth-ui for the purposes of compiling with the mock `MockAuthUIActions` and `MockRegistrationUIActions` before you write your own implementation. (Note you will need some dependencies if you use this `local-storage.ts`. Run `yarn add @react-native-community/async-storage`.)
4. Import these two actions files inside your root app file (generally App.tsx):

```
import <proj>AuthUIActions from './src/actions/<proj>AuthUIActions';
import <proj>RegistrationUIActions from './src/actions/<proj>RegistrationUIActions';
```

#### Root application structure ####

1. In the root app file (generally App.tsx), add the following imports to the top of the file:

    ```
    import {
        SecurityContextProvider,
        AuthNavigationContainer,
        AuthUIContextProvider,
        useSecurityActions,
    } from '@etn-sst/react-native-auth-ui';
    ```
2. Inside your default export, wrap your entire application as follows, where `<your_app_xml>` is your existing app structure XML:

```
<SecurityContextProvider>
    <AuthUIConfiguration>
        <AuthNavigationContainer>
            <your_app_xml>   <--- Your existing app
        </AuthNavigationContainer>
    </AuthUIConfiguration>
</SecurityContextProvider>
``` 

#### Set AuthUIContextProvider options ####

1. Create a function called `AuthUIConfiguration` in your root app file which specifies your configuration options for the React Native Auth UI component. The function should look something like this, where `<proj>` refers to a prefix with your project's name:

```
export function AuthUIConfiguration(props: { children: JSX.Element }): JSX.Element {
    const securityContextActions = useSecurityActions();

    return (
        <AuthUIContextProvider
            authActions={<proj>AuthUIActions(securityContextActions)}
            registrationActions={<proj>RegistrationUIActions}
            showSelfRegistration={true}
            allowDebugMode={true}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            projectImage={require('./src/assets/images/some_image.png')}
        >
            {props.children}
        </AuthUIContextProvider>
    );
}
```
You can skip passing the `projectImage` property if you don't have one yet.

Explanations of the various configuration options can be found in the generated code documentation in the `docs` folder.

#### Set up Deep Linking ####

Currently, your have not implemented deep linking, so the XML in your root app file is not correct for `AuthNavigationContainer`.

1. Copy the `examples/src/navigation` folder into your project for an example implementation of the deep linking options and the `resolveInitialState` method.
2. Make sure to install your peer dependencies (e.g. `yarn add @react-navigation/native` to add react navigation to your project).
3. Set up state for deep link handling in your App.tsx file before the XML return:
```
import { useLinking } from '@react-navigation/native';
import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';

...

const ref = React.useRef();

// Setup deep links. Check DeepLinking file for path to screen mapping
const { getInitialState } = useLinking(ref, authLinkMapping);
const [initialState, setInitialState] = React.useState();
React.useEffect(() => {
    resolveInitialState(getInitialState, setInitialState);
}, [getInitialState]);
```

Now you should be able to run your app with react-native-auth-ui integrated.

### Scenario 2: From the example project ###

If you don't have an existing React Native project and would like an example as a springboard, consider using the provided example project in the `examples` folder.

#### Copy the examples folder ####

Clone or download this repo and then copy out the `examples` folder. Navigate into this folder and run `yarn` to install the required dependencies. The `.npmrc` file allows you to download the `react-native-auth-ui` dependency from the Azure DevOps feed. Follow these [instructions](https://dev.azure.com/etn-sst/Washington/_packaging?_a=package&feed=Components&package=%40etn-sst%2Freact-native-auth-ui&protocolType=Npm) to connect to the @etn-sst/react-native-auth-ui feed.

#### Rename the example project ####

Now you can rename your copied `examples` folder to whatever you'd like to call your project. You can update the relevant project-related configuration options in the `package.json` file. It is recommended you use something like [react-native-rename](https://www.npmjs.com/package/react-native-rename) to rename the project as there are numerous iOS and Android project files that must be updated.

#### Set AuthUIContextProvider options ####

You should also open the root app file (`App.tsx`) and adjust the configuration options of the `AuthUIContextProvider` as necessary for the React Native Auth UI component. Explanations of the various configuration options can be found in the generated code documentation for [AuthUiContextProviderProps](/docs/modules/authuicontextprovider.html#authuicontextproviderprops) in the `docs` folder. For example, you will probably want to create a brand logo image (`projectImage`) for your app. 

#### Implement the actions ####

In the example project, all network calls are mocked with sleeps. The EULA is also a static sample file.

Provide real implementation details within the `examples/src/actions/MockAuthUIActions.tsx` and `examples/src/actions/MockRegistrationUIActions.tsx` files, which are currently mocking network behaviour. Most likely, your implementation will involve making calls to an API and using local storage to retain information as needed by your application (such as the user's name and email).

You may also want to take this time to rename those two files, prefixing "AuthUIActions" and "RegistrationUIActions" with the name of your project. Make sure you update your imports if so.

---

## 2. Security state ##

After setup, you are now able to access various security actions and state from within your application. Importing `useSecurityActions` and `useSecurityState` allows you use these hooks as follows:

```
import {useSecurityActions, useSecurityState } from '@etn-sst/react-native-auth-ui';

const securityActions = useSecurityActions();
const securityState = useSecurityState();
```

The `securityActions` allows you to access actions related to user authentication and deauthentication. You can call `securityActions.onUserNotAuthenticated();` to unauthenticate from the application.

The `securityState` allows you to access state related to security, such as the currently authenticated user's email (`securityState.email`).

More information about React Native Auth UI's exported objects can found in the generated code documentation in the `docs` folder.

---

## 3. Deep Linking ##

### Setup ###

There are certain screens in the React Native Auth UI that are only accessible from an email link. For these screens, deep linking is required. Follow the React Navigation v5 [Deep Link guide](https://reactnavigation.org/docs/deep-linking/) to configure your project for deep-link integration. (The example project is already properly configured in `src/navigation/DeepLinking.ts`).

See the file at `examples/src/navigation/DeepLinking.ts` for an example on how to set up deep linking in your project.

### Handled screens and parameters ###

The following is a list of the screens and their parameters which a deep link may launch to:

- `login`: the login screen.
- `PasswordResetInitiation`: the first screen of the Password Reset flow.
- `PasswordResetCompletion`: the later half of the Password Reset flow, takes parameter `verifyCode`.
- `RegistrationInvite`: the Registration via Invitation flow, takes parameter `validationCode`.
- `Registration`: the later half of the Self Registration flow, takes parameter: `verificationCode`.
- `SupportContact`: the Contact Support screen.

### Testing Deep Links ###

- Test iOS simulator with `xcrun simctl openurl booted authui://invite/8k27jshInvite234Code`
- Test Android with `adb shell am start -W -a android.intent.action.VIEW -d "authui://invite/8k27jshInvite234Code" com.shiverware.eaton.authui`
- Test on device from browser `authui://invite/8k27jshInvite234Code`

Note that the `authui://` prefix is set by your application, as in the file at `examples/src/navigation/DeepLinking.ts`.

---

## 4. Building ##

**Note:** Building is NOT required for using module since this is an NPM package. However, if you are contributing, please follow this section on how to build the module.

### Installation ###

Run `yarn boostrap` in the top level directory to install dependencies. This will install dependencies for this project, as well as for the example projects.

### Running ###

iOS: `yarn ios` in the top-level directory (this also install pods)

Android: `yarn android` in the top-level directory

Both these commands choose a default simulator or emulator.

#### Running on a Specific Simulator ####

##### iOS #####

- Run `yarn ios --simulator="DEVICE_NAME"` (Replace DEVICE_NAME with the exact name of the simulator or device as you see it in Xcode, e.g. "iPhone 11 Pro").

##### Android #####
- Make sure your desired emulator is already running. Then run `adb devices` to get a list of the identifiers for the available emulators. Next, run `yarn react-native run-android --deviceId=DEVICE_ID` (Replace DEVICE_ID with the exact ID of the device, e.g. "emulator-5554").

For additional information (like how to run on a real device), [read the React Native documentation](https://reactnative.dev/docs/running-on-device).

---

## 5. Updating React Native Auth UI ##

You can update the `@etn-sst/react-native-auth-ui` dependency by running `yarn upgrade @etn-sst/react-native-auth-ui`.

---

## 6. Developing ##

If you want to continue development of this package, you can generate development documentation by running `yarn docs` (which uses [TypeDoc](http://typedoc.org/) to generate a code documentation suite in `/docs`). You can run `yarn docs:open` to then open the generated documentation to learn more about this project.

Prior to commiting, make sure to run `yarn precommit`. This will run the various validation scripts and generate new documentation and licenses. 

---

## 7. Publishing ##

Update the version numbers and then run `npm publish`. Afterward, create a commit and a tag with your version number prefixed by "v", e.g. `v0.1.0`.

---

## 8. More Information ##

For more information about the specifics of the React Native Auth UI package, please refer to the generated code documentation in the `docs` folder.
