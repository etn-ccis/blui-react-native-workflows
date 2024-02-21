# CreateAccountScreen

A screen that displays a text field to collect the user's email address. The CreateAccountScreen must be used within a `RegistrationContextProvider`.


## Usage

```tsx
import { RegistrationContextProvider, CreateAccountScreen } from '@brightlayer-ui/react-native-auth-workflow';

...

<RegistrationContextProvider {...props}>
    <CreateAccountScreen />
</RegistrationContextProvider>
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| emailLabel | `string` | Text to display as the label for the email text field. | `Email Address` |
| initialValue | `string` | The initial value for the email text field. |  |
| emailValidator | `(email: string) => boolean \| string` | A function that validates the email text field input. | checks against valid email regex |
| emailTextFieldProps | `TextFieldProps` | Props to pass to the MUI [TextInput](https://callstack.github.io/react-native-paper/docs/components/TextInput/) component. |  |
| errorDisplayConfig | `ErrorManagerProps` | See [Error Management](../components/error-manager.md) |  |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.