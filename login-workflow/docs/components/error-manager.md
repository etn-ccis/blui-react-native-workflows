# ErrorManager

Component that manages the display of error messages. Can be configured to display a dialog, a message box, or neither. This component must be used within an `AuthContextProvider` or a `RegistrationContextProvider` for default values to work.

<img width="400" alt="Error Dialog" src="../../media/error-dialog.png">
<img width="400" alt="Error Box" src="../../media/error-box.png">

## Usage
```tsx
import { ErrorManager } from '@brightlayer-ui/react-native-auth-workflow';

...

<ErrorManager>
    {/* When configured as a message-box, the box will appear before or after the elements passed as children */}
    {children} 
</ErrorManager>
```

## API

| Prop Name | Type | Description | Default |
|---|---|---|---|
| children | `ReactNode` | Message box errors will appear before or after content passed as children. |  |
| dialogConfig | `DialogConfigProps` | Configuration options for the dialog. See [DialogConfig Props](#dialogconfigprops) |  |
| error | `string` | Error text to display. If string is empty, the error will not be shown. |  |
| messageBoxConfig | `MessageBoxProps` | Configuration options for the message box. See [MessageBoxProps](#messageboxprops) |  |
| mode | `'dialog' \| 'message-box' \| 'none'` | Determines whether to display a dialog, a message box, or neither. | `'dialog'` |
| onClose | `() => void` | Function to call when the close/dismiss button is clicked. |  |
| title | `string` | Title text to display for error dialog and message box. If string is empty, the title will not be shown. | |

### DialogConfigProps

| Prop Name | Type | Description | Default |
|---|---|---|---|
| dismissLabel | `string` | Label to show in the close button. | `t('bluiCommon:ACTIONS.CLOSE') // "Close"` |
| style | `StyleProp<ViewStyle>` | Style overrides object |  |
| title | `string` | Text to show in the title of the dialog. | `t('bluiCommon:MESSAGES.ERROR') // "Error!"` |

### MessageBoxProps

| Prop Name | Type | Description | Default |
|---|---|---|---|
| backgroundColor | `string` | The background color of the message box. | `theme.colors.onError` |
| dismissible | `boolean` | Whether the message box can be dismissed. | `true` |
| fontColor | `string` | The font color of the text inside the message box. | `theme.colors.error` |
| position | `'top' \| 'bottom'` | Determines whether the message box should be displayed before or after children elements. | `'top'` |
| style | `StyleProp<ViewStyle>` | Style overrides object |  |
| title | `string` | Text to show in the title of the message-box. | `t('bluiCommon:MESSAGES.ERROR') // "Error!"` |
