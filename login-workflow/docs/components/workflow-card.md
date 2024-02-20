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
| backgroundImage | [`ImageSourcePropType`](https://reactnative.dev/docs/image#imagesource)  | The background image to display behind the card.                          |         |

The properties of the underlying React Native [ImageBackground](https://reactnative.dev/docs/imagebackground#props) component are also available.

## WorkflowCardBody

This component is a simple wrapper that is used for layout. Your main screen contents should be children of this component.

The properties of the underlying React Native Paper [Card.Content](https://callstack.github.io/react-native-paper/docs/components/Card/CardContent) component are also available.

## WorkflowCardHeader


| Prop Name         | Type         | Description | Required | Default |
|---|---|---|---|---|
| title             | `string`     | text to display as title in header | Yes |  |
| backgroundColor   | `string`     | background color of header  | No | theme.colors.primary |
| textColor         | `string`     | text color of header  | No | theme.colors.onPrimary |
| iconColor         | `string`     | icon color of header  | No | theme.colors.onPrimary |
| icon              | `IconSource` | icon to be shown on left side of header | No | close |
| onIconPress       | `function`   | on press functionality for the icon | Yes |  |


The properties of the underlying React Native [View](https://reactnative.dev/docs/view) component are also available.

## WorkflowCardInstructions

| Prop Name    | Type                    | Description                                                           | Default |
| ------------ | ----------------------- | --------------------------------------------------------------------- | ------- |
| instructions | `string \| JSX.Element` | The instructions to display in the card.                              |         |
| divider      | `boolean`               | If true, a dividing line will be displayed below the instruction text | `true`  |

The properties of the underlying React Native Paper's [Text](https://callstack.github.io/react-native-paper/docs/components/Text/) component are also available.

### WorkflowCardActions

The WorkflowCardActions is used to configure the buttons that appear at the bottom of the card.

| Prop Name | Type | Description | Default |
|---|---|---|---|
| divider | `boolean` | If true, a dividing line will be displayed above the button panel | `true` |
| showPrevious | `boolean` | Indicates whether the previous button should be displayed | `true` |
| canGoPrevious | `boolean \| (() => boolean)` | A boolean or function that indicates whether the previous button should be enabled. | `true` |
| previousLabel | `string` | The label on the previous button |  |
| onPrevious |  `(data?: { [key: string]: any }) => void` | A function that is called when the previous button is clicked. |  |
| showNext | `boolean` | Indicates whether the next button should be displayed | `true` |
| canGoNext | `boolean \| (() => boolean)` | A boolean or function that indicates whether the next button should be enabled. | `true` |
| nextLabel | `string` | The label on the next button |  |
| onNext |  `(data?: { [key: string]: any }) => void` | A function that is called when the next button is clicked. |  |
| currentStep | `number` | Indicates the current step in a multi-step workflow | `0` |
| totalSteps | `number` | Indicates the total number of steps in the multi-step workflow | `5` |
| fullWidthButton | `boolean` | If true, buttons will expand to the full width of the panel (useful if you only have one button configured) | `false` |
| stepperVariant | `DotStepperVariant` | indicates which type of stepper indicator to use | `dots` |

Any other props will be provided to the root element ([**View**](https://reactnative.dev/docs/view)).

### WorkflowCardFinishState

The WorkflowCardFinishState component is used to render an [EmptyState](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--empty-state) component indicating completion of a user flow.

The WorkflowCardFinishState has the same props as an [EmptyState](https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--empty-state) component.

All props will be passed to the `<EmptyState>` component, except for style
which is applied to the root element