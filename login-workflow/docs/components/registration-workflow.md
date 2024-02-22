# RegistrationWorkflow

A multi-step registration workflow that guides a user through the process of registering a new account. The RegistrationWorkflow must be used within a `RegistrationContextProvider` .

## Usage

```tsx
import { RegistrationWorkflow } from '@brightlayer-ui/react-native-auth-workflow';

...

// Default appearance and behaviors
<RegistrationWorkflow />

// If you want to customize the workflow in any way, you must pass children
<RegistrationWorkflow>
  {/* your registration screens here */}
</RegistrationWorkflow>
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| initialScreenIndex | `number` | The initial screen index to start the registration workflow from. | `0` |
| successScreen | `JSX.Element` | Success screen to render when a new account is successfully created |  |
| existingAccountSuccessScreen | `JSX.Element` | Success screen to render when an existing account is successfully registered |  |
| isInviteRegistration | `boolean` | Indicated whether this workflow is for invitation-based registration. If true, several of the default screens will be skipped | `false` |
| errorDisplayConfig | `ErrorManagerProps` | See [Error Management](../error-management.md) |  |
| initialRegistrationParams | `{code?: string;email?: string;}` | Set initial values for VerifyCode and Create Account Screen |  |
| children | `ReactNode[]` | The screens to render within the registration workflow (only required if you are making customizations) | Eula, CreateAccount, VerifyCode, CreatePassword, AccountDetails |
