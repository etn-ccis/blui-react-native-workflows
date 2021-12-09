# Language Support

This package supports translations to different languages using [i18next](https://www.i18next.com/) / [react-i18next](https://github.com/i18next/react-i18next). The workflow screens are currently available in:

-   English
-   French
-   Spanish
-   Simplified Chinese

## Changing the Language

When the app is loaded, you will need to set the language that will be used by the `i18next` object via the `changeLanguage` function:

```tsx
import { i18n } from '@brightlayer-ui/react-native-auth-workflow';
i18n.changeLanguage('fr'); // 'en', 'es', 'fr', 'zh'
```

> If you do not set the language when the application loads, the workflow will automatically select the language based on the device settings (unsupported languages will fall back to English).

## Adding Your Own Resources

If you intend to support multiple languages in your application, you will need to provide translations for all of the UI string resources used in your application (refer to the [documentation](https://www.i18next.com/overview/getting-started) for i18next for specific information on how to build translation files).

The Auth Workflow is configured with two separate namespaces for resources:

-   The `blui` namespace contains strings that are used internally in the workflow screens
-   The `app` namespace is where your app-specific UI strings are placed

> The `app` namespace is set as the default so that you do not need to prefix any of your resource IDs.
> To load your resources into the i18next object, you can call:

```tsx
import i18n from '@brightlayer-ui/react-native-auth-workflow';
i18n.addResourceBundle('en', 'app', { BUTTONLABEL: 'Change Language' });
i18n.addResourceBundle('es', 'app', { BUTTONLABEL: '¡Cambia el idioma!' });
i18n.addResourceBundle('fr', 'app', { BUTTONLABEL: 'Changez de Langue' });
```

> This will need to be called before the application renders so that the strings are available. If you cannot load these before the application renders, you will need to force the app to refresh after they are loaded to pick up the values.

### Using translations in your application

To use the appropriate translations in your application, you can use the `t` function or `<Trans>` components from [react-i18next](https://github.com/i18next/react-i18next).

## Overriding default resources

If you need to override any of the strings or translations used internally in the Auth Workflow, you can do so in a similar way by specifying the blui namespace and the appropriate resource ID:

```tsx
import i18n from '@brightlayer-ui/react-native-auth-workflow';
i18n.addResourceBundle('en', 'blui', { ACTIONS: { CREATE_ACCOUNT: 'Register now!' } }, true, true);
i18n.addResourceBundle('es', 'blui', { ACTIONS: { CREATE_ACCOUNT: '¡Regístrate ahora!' } }, true, true);
i18n.addResourceBundle('fr', 'blui', { ACTIONS: { CREATE_ACCOUNT: `S'inscrire maintenant!` } }, true, true);
```

> For a complete list of resource IDs available, refer to the documentation for [@brightlayer-ui/react-auth-shared](https://github.com/brightlayer-ui/react-auth-shared/blob/master/src/data/translations/english.ts).
