# Language Support

This package supports translations to different languages using [i18next](https://www.i18next.com/) / [react-i18next](https://github.com/i18next/react-i18next). Out of the box, the workflow screens are available in:

-   English
-   French
-   Portuguese
-   Spanish
-   Simplified Chinese

## Add Custom Language

If you would like to support a language other than the ones supported by the workflow, you can, but you will need to provide the translations for all of the strings that are needed by the workflow screens. If you do not, the workflow screens will default to showing English.

The example below shows how to do this for a few keys, but you will need to provide all of the keys in your actual implementation (refer to the links at the bottom of the page for a list of all of the keys that must be provided).

```tsx
// Common Keys shared by Auth and Registration workflows
const commonWorkflowKorean =  {
    translation: {
        ACTIONS: {
            NEXT: '다음',
        },
    },
}
// Registration Workflow Keys
const registrationWorkflowKorean = {
    translation: {
        REGISTRATION: {
            EULA: {
                LOADING: '최종 사용자 라이선스 계약 로드 중...',
            },
        },
    },
};

// Create your application i18n instance
export const i18nAppInstance = i18next.createInstance(
    {
        ...
        resources: {
            ...
            kr: {
                // provide your app-side translation in your app namespace
                app: {
                    ...AppDictionaries.korean.translation,
                },
                bluiRegistration: {
                    ...registrationWorkflowKorean.translation,
                },
                bluiCommon: {
                    ...commonWorkflowKorean.translation,
                },
            },
        },
    },
);
```

You will then need to pass this i18n instance through the `i18n` prop on the `AuthContextProvider` and / or `RegistrationContextProvider` wrappers.

> For a complete list of resource IDs available, refer to the documentation for
[Registration Workflow](../src/contexts/RegistrationContext/RegistrationDictionaries/english.ts).
[Common translations](../src/contexts/SharedDictionaries/english.ts).