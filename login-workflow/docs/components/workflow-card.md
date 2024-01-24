# WorkflowCard

The WorkflowCard is a set of components that can be used to define custom screens within the workflows. Using these utility components will ensure that your custom screens match the style of the built-in screens for a seamless experience.

### WorkflowCardBody

This component is a simple wrapper that is used for layout. Your main screen contents should be children of this component.

The properties of the underlying React Native Paper [Card.Content](https://callstack.github.io/react-native-paper/docs/components/Card/CardContent) component are also available.

### WorkflowCardInstructions

| Prop Name | Type | Description | Default |
|---|---|---|---|
| instructions | `string \| JSX.Element` | The instructions to display in the card. |  |
| divider | `boolean` | If true, a dividing line will be displayed below the instruction text | `true` |

The properties of the underlying React Native Paper's [Text](https://callstack.github.io/react-native-paper/docs/components/Text/) component are also available.
