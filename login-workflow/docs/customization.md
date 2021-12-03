# Customizing the Workflow

## Login Screen

The Login screen supports some simple customization (via the `AuthUIContextProvider`) to suit the needs of your application.

-   You can pass in a custom header that will appear above the login form using the `loginHeader` prop. By default, we render your `productImage`.
-   You can pass in custom content that will appear below the login button and above the registration links with any content you like (such as buttons for third-party login, etc.) using the `loginActions` prop.
-   You can pass in a custom footer that will appear below the login form and registration links with any content you like (such as links to Privacy Policy, Terms of Service, etc.) using the `loginFooter` prop.
-   You can customize the background of the login screen using the `background` prop including the color, tile image, etc.
-   You can disable and hide various aspects of the workflow using the following props: `enableInviteRegistration`, `enableResetPassword`, `showContactSupport`, `showCybersecurityBadge`, `showRememberMe`, `showSelfRegistration`.

For more details, read the [full API details](https://github.com/brightlayer-ui/react-auth-shared/tree/master/docs/API.md).

## Additional Routes

The authentication workflow hides your application content behind a private routing mechanism that does not allow unauthenticated users to access any parts of the application.

If there are routes / screens that you would like to be available without logging in (such as a Terms of Service page or a welcome screen), you need to provide these to the `AuthNavigationContainer` through the `extraRoutes` property. The content passed in here will be publicly accessible. You can also set the `initialRouteName` prop if you would like to load a different screen as the first screen of the workflow (e.g., a Welcome screen). Note that if you do this, you must provide a way to get from your custom screen to the 'Login' screen using the `navigation` prop.

```tsx
const Stack = createStackNavigator();
...
<AuthNavigationContainer
    extraRoutes={
        [
            <Stack.Screen key={'Welcome-Screen'} name="Welcome" component={Welcome} />,
            <Stack.Screen key={'Terms-Screen'} name="Terms" component={Terms} />
        ]
    }
    initialRouteName={'Welcome'}
>
    {/* Main Application Content */}
</AuthNavigationContainer>

```

For more details, read the [full API details](https://github.com/brightlayer-ui/react-auth-shared/tree/master/docs/API.md).

## Registration Details

By default, the user registration piece of the workflow will capture the minimum information that is required (i.e., First Name, Last Name, and email address).

Many applications will need to collect additional information about their users during registration. This can be achieved by passing in additional form components to the `AuthUIContextProvider` via the `customAccountDetails` prop.

### Syntax

The `customAccountDetails` prop takes an array of `CustomRegistrationForm`s describing components that you would like to insert into the registration flow (title, instructions, and form component).

The first form in the array will render below the default fields (first and last name). Subsequent forms will be rendered on new pages (one page per item in the array). If you do not want to render your custom elements below the default fields, you can pass `null` as the first item in the array.

```tsx
import { CustomDetailsScreen, CustomDetailsScreenTwo } from './path/to/file';
...
<AuthUIContextProvider
    customAccountDetails={[
        null,
        { component: CustomDetailsScreen},
        { title: 'Payment Info', instructions: 'Enter your credit card information below', component: CustomDetailsScreenTwo}
    ]}
/>
```

### Form Implementation

In order to work correctly, custom form components that you pass into the workflow must match the interface `ComponentType<AccountDetailsFormProps>`, meaning your component must accept and hook up the following three props:

-   `initialDetails` (_`CustomAccountDetails`_): this is an object of key-value pairs representing the custom data that your form captures. Each key is the name of one of your custom properties and the value is the value of that property. You must use these values to initialize your form fields on render.
-   `onDetailsChanged` (_`(details: CustomAccountDetails | null, valid: boolean) => void`_): this is a callback function that you must call whenever any of your custom properties change. You must include all your custom properties in the details object, even if some of them are unchanged. You must also include a `valid` argument that indicate whether the current values pass your required validation checks (if all fields are optional, you can simply pass `true`).
-   `onSubmit` (_`() => void`_): this function should be called when a user presses the Enter key in the final input of your custom form. This will trigger the workflow to progress to the next page without having to manually click the button.

You can see a sample implementation of the custom details forms in the `/example` project.

> **NOTE:** If you are using a useEffect hook to call the `onDetailsChanged` function, you must make sure NOT to include the `onDetailsChanged` prop in your list of dependencies. This will cause an infinite update loop.

### Custom Registration Success Screen

You can customize the success screen shown at the end of the Registration flows using the `registrationSuccessScreen` prop on the `AuthUIContextProvider`. This prop gives you access to the `navigation` object so you can direct the user to the login page or elsewhere in your application after finishing registration as well as a `registrationData` object that contains a user's `AccountDetailInformation` and email:

```tsx
registrationSuccessScreen={(navigation, registrationData) => <MySuccessScreen navigation={navigation} email={registrationData.email}/>
```

#### Account Already Exists

In the case when a user already has an existing account, a separate success screen is shown. You can customize this screen in the same way using the `accountAlreadyExistsScreen` prop on the `AuthUIContextProvider`. This prop gives you access to the `navigation` object so you can direct the user to the login page or elsewhere in your application after finishing registration:

```tsx
accountAlreadyExistsScreen={(navigation) => <MyAccountAlreadyExistsScreen navigation={navigation} />
```
