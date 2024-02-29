# SuccessScreenBase

A component to use as a simple success screen for mini 1-step workflows (like Forgot Password). It renders a message, an icon, and a dismiss button.

## Usage

```tsx
import { SuccessScreenBase } from '@brightlayer-ui/react-native-auth-workflow';

...

<SuccessScreenBase />
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| icon | [`IconSource`](https://github.com/etn-ccis/blui-react-native-component-library/blob/master/docs/Icons.md#icon-object) | The icon to be displayed on the screen. |  |
| messageTitle | `string` | The title of the success message. |  |
| message | `string` | The success message to be displayed on the screen. |  |
| dismissButtonLabel | `string` | The label of the dismiss button. |  |
| canDismiss | `boolean / (()=>boolean)` | A boolean determining if the screen can be dismissed. |  |
| onDismiss | `() => void` | A function to be called when the screen is dismissed. |  |
| scrollMainContent | `boolean` | If true, the scroll view will be enabled for main content or else view will be enabled | false |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.
  