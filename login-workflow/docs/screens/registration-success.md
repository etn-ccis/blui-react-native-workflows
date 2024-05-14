# RegistrationSuccessScreen

A full screen component that renders a success screen after completion of the registration process.

<img width="400" alt="Registration Success" src="../../media/screens/registration-success.png">

## Usage

```tsx
import { RegistrationSuccessScreen } from '@brightlayer-ui/react-native-auth-workflow';

...

<RegistrationSuccessScreen />
```

## API

| Prop Name          | Type              | Description                                                                         | Default |
| ------------------ | ----------------- | ----------------------------------------------------------------------------------- | ------- |
| canDismiss         | `boolean`         | A boolean determining if the screen can be dismissed.                               |         |
| dismissButtonLabel | `string`          | The label of the dismiss button.                                                    |         |
| EmptyStateProps    | `EmptyStateProps` | EmptyStateProps, which include properties such as icon, title, and description etc. |         |
| onDismiss          | `() => void`      | A function to be called when the screen is dismissed.                               |         |

Any other props will be provided to the `<SuccessScreen>` component ([**SuccessScreen**](./success.md)).
