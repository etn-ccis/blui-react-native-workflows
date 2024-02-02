# BasicDialog

Component that renders a basic dialog. This component provides a title, a body, and a close button.

## Usage

```tsx
import { BasicDialog } from '@brightlayer-ui/react-native-auth-workflow';

...

<BasicDialog 
  title="Notice!"
  body="This is an example notice"
  onDismiss={() => console.log('close')}  
/>
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| open | `boolean`  | Whether the dialog is open. |  |
| title | `string` | The title to display in the dialog. |  |
| body | `string` | The content to display in the body of the dialog |  |
| onDismiss | `() => void` | A function that is called when the close button is clicked. |  |
| dismissButtonText | `string` | The text to display in the close button. | `'Okay'` |

The properties of the underlying React Native Paper's [Dialog](https://callstack.github.io/react-native-paper/docs/components/Dialog/) component are also available.
