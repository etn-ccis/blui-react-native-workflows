# WorkflowCard

The WorkflowCard is a set of components that can be used to define custom screens within the workflows. Using these utility components will ensure that your custom screens match the style of the built-in screens for a seamless experience.

### Usage

```tsx
import {
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardBody,
    WorkflowCardInstructions,
    WorkflowCardActions,
} from '@brightlayer-ui/react-native-auth-workflow';

<WorkflowCard {...cardBaseProps}>
    <WorkflowCardHeader {...headerProps} />
    <WorkflowCardInstructions {...instructionsProps} />
    <WorkflowCardBody>{/* Your Screen Contents */}</WorkflowCardBody>
    <WorkflowCardActions {...actionsProps} />
</WorkflowCard>;
```

### API

| Prop Name                    | Type                           | Description                                                                 | Default |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------- | ------- |
| WorkflowCardBaseProps        | `WorkflowCardBaseProps`        | See [WorkflowCardBase](#workflowcardbaseprops) for more details.            |         |
| WorkflowCardHeaderProps      | `WorkflowCardHeaderProps`      | See [WorkflowCardHeader](#workflowcardheader) for more details.             |         |
| WorkflowCardInstructionProps | `WorkflowCardInstructionProps` | See [WorkflowCardInstructions](#workflowcardinstructions) for more details. |         |
| WorkflowCardActionsProps     | `WorkflowCardActionsProps`     | See [WorkflowCardActions](#workflowcardactions) for more details.           |         |

### WorkflowCardBaseProps

| Prop Name       | Type      | Description                                                               | Default |
| --------------- | --------- | ------------------------------------------------------------------------- | ------- |
| loading         | `boolean` | A boolean that indicates whether the loading spinner should be displayed. | `false` |
| backgroundImage | `string`  | The background image to display behind the card.                          |         |

The properties of the underlying React Native [View](https://reactnative.dev/docs/view#props) component are also available.

## WorkflowCardBody

This component is a simple wrapper that is used for layout. Your main screen contents should be children of this component.

The properties of the underlying React Native Paper [Card.Content](https://callstack.github.io/react-native-paper/docs/components/Card/CardContent) component are also available.

## WorkflowCardInstructions

| Prop Name    | Type                    | Description                                                           | Default |
| ------------ | ----------------------- | --------------------------------------------------------------------- | ------- |
| instructions | `string \| JSX.Element` | The instructions to display in the card.                              |         |
| divider      | `boolean`               | If true, a dividing line will be displayed below the instruction text | `true`  |

The properties of the underlying React Native Paper's [Text](https://callstack.github.io/react-native-paper/docs/components/Text/) component are also available.
