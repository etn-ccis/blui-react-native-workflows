# CreatePasswordScreen

A screen that displays text fields to create a new user's password. The CreatePasswordScreen must be used within a `RegistrationContextProvider`.

<img width="400" alt="Create Password" src="../../media/screens/create-password.png">

## Usage

```tsx
import { RegistrationContextProvider, CreatePasswordScreen } from '@brightlayer-ui/react-native-auth-workflow';

...

<RegistrationContextProvider {...props}>
    <CreatePasswordScreen />
</RegistrationContextProvider>
```

## API

| Prop Name          | Type                | Description                                       | Default |
| ------------------ | ------------------- | ------------------------------------------------- | ------- |
| errorDisplayConfig | `ErrorManagerProps` | See [Error Management](../error-management.md)    |         |
| PasswordProps      | `SetPasswordProps`  | See [Set Password](../components/set-password.md) |         |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.
