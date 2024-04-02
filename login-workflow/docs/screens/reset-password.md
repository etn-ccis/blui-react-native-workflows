# ResetPasswordScreen

A screen that allows a user to reset their password. The ResetPasswordScreen must be used within an `AuthContextProvider`.

<img width="400" alt="Reset Password" src="../../media/screens/reset-password.png">

## Usage

```tsx
import { AuthContextProvider, ResetPasswordScreen } from '@brightlayer-ui/react-native-auth-workflow';
...

<AuthContextProvider {...props}>
    <ResetPasswordScreen />
</AuthContextProvider>
```

## API

| Prop Name          | Type                                         | Description                                                     | Default                 |
| ------------------ | -------------------------------------------- | --------------------------------------------------------------- | ----------------------- |
| errorDisplayConfig | `ErrorManagerProps`                          | See [Error Management](../error-management.md)                  |                         |
| PasswordProps      | `SetPasswordProps`                           | See [Set Password](../components/set-password.md)               |                         |
| showSuccessScreen  | `boolean`                                    | If true, a success screen will appear after submitting the form | `true`                  |
| SuccessScreen      | `(props: SuccessScreenProps) => JSX.Element` | Prop to pass SuccessScreen component                            | `<SuccessScreenBase />` |
| SuccessScreenProps | `SuccessScreenProps`                         | props applied to Success Screen component                       |                         |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.
