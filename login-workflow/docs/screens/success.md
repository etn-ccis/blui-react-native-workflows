# SuccessScreenBase

A component to use as a simple success screen for mini 1-step workflows (like Forgot Password). It renders a message, an icon, and a dismiss button.

<img width="400" alt="Success Screen" src="../../media/screens/success.png">

## Usage

```tsx
import { SuccessScreenBase } from '@brightlayer-ui/react-native-auth-workflow';

...

<SuccessScreenBase />
```

## API

| Prop Name          | Type                      | Description                                                                         | Default |
| ------------------ | ------------------------- | ----------------------------------------------------------------------------------- | ------- |
| canDismiss         | `boolean / (()=>boolean)` | A boolean determining if the screen can be dismissed.                               |         |
| dismissButtonLabel | `string`                  | The label of the dismiss button.                                                    |         |
| EmptyStateProps    | `EmptyStateProps`         | EmptyStateProps, which include properties such as icon, title, and description etc. |         |
| onDismiss          | `() => void`              | A function to be called when the screen is dismissed.                               |         |

This screen also extends the `WorkflowCardProps` type for updating the title, instructions, buttons, etc. See [Workflow Card](../components/workflow-card.md) for more details.
