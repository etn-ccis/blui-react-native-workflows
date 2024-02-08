# Registration Workflow Guide

The registration workflow includes screens related to user sign-up / registration including Create Account, Create Password, Account Details, etc.

## RegistrationWorkflowContext
The RegistrationWorkflowContext is responsible for managing the state of the individual screens/steps along with their collected data/inputs throughout the Registration Workflow.

## API

### RegistrationWorkflowContextProps

| Prop Name | Type | Description | Default |
|---|---|---|---|
| currentScreen | `number` | The current screen in the registration workflow |  |
| totalScreens | `number` | The language code specifying which language to use for the UI | `'en'` |
| nextScreen | `(data: IndividualScreenData) => void` | Update the data of the current screen while navigating to the next screen in the Registration Workflow Context. |  |
| previousScreen | `(data: IndividualScreenData) => void` | Update the data of the current screen while navigating to the previous screen in the Registration Workflow Context. |  |
| screenData | `ScreenData` | An object of data of all screens available in the Registration Workflow Context |  |
| updateScreenData | `(data: IndividualScreenData) => void` | Updates collected data/inputs throughout the Registration Workflow. |  |
| isInviteRegistration | `boolean` | Indicates whether this workflow is for invitation-based registration. |  |