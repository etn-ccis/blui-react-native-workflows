# EulaScreen

A screen that displaysthe UI for an End User License Agreement and a checkbox to confirm that they have read and agree to the terms.

![EULA](../../media/screens/eula.png)

## Usage

```tsx
import { RegistrationContextProvider, EulaScreen } from '@brightlayer-ui/react-native-auth-workflow';

...
    <RegistrationContextProvider {...props}>
    <EulaScreen />
</RegistrationContextProvider>
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| eulaContent | `string \| JSX.Element` | The content to render for the EULA. Can be a plain string or HTML. | |
| checkboxLabel | `string` | The text to render for the acceptance checkbox. |  |
| checkboxProps | `CheckboxProps` | Props to spread to the React Native Paper [CheckboxItem](https://callstack.github.io/react-native-paper/docs/components/Checkbox/CheckboxItem) component |  |
| html | `boolean` | True if the EULA should be rendered as HTML, false for plain text | `false` |
| initialCheckboxValue | `boolean` | Used to pre-populate the checked/unchecked checkbox when the screen loads. | `false` |
| onEulaAcceptedChange | `(accepted: boolean) => void` | Called when the acceptance checkbox clicked. |  |
| errorDisplayConfig | `ErrorManagerProps` | See [Error Management](../../components/error-manager.md) |  |
| onRefetch | `() => void` | Function to refetch Eula content |  |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../../components/workflow-card.md) for more details.