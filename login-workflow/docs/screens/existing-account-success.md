# ExistingAccountSuccessScreen

A full screen component that renders a Success Screen for the accounts that already exists in the records

<img width="400" alt="Registration Success" src="../../media/screens/existing-account-success.png">

## Usage

```tsx
import { ExistingAccountSuccessScreen } from '@brightlayer-ui/react-native-auth-workflow';

...

<ExistingAccountSuccessScreen />
```

## API

| Prop Name          | Type              | Description                                                                         | Default |
| ------------------ | ----------------- | ----------------------------------------------------------------------------------- | ------- |
| canDismiss         | `boolean`         | A boolean determining if the screen can be dismissed.                               |         |
| dismissButtonLabel | `string`          | The label of the dismiss button.                                                    |         |
| EmptyStateProps    | `EmptyStateProps` | EmptyStateProps, which include properties such as icon, title, and description etc. |         |
| onDismiss          | `() => void`      | A function to be called when the screen is dismissed.                               |         |

Any other props will be provided to the <SuccessScreen> component (SuccessScreen).
