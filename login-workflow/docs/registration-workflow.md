# Registration Workflow Guide

The registration workflow includes screens related to user sign-up / registration including Create Account, Create Password, Account Details, etc.

## RegistrationWorkflowContext
The RegistrationWorkflowContext is responsible for managing the state of the individual screens/steps along with their collected data/inputs throughout the Registration Workflow.

## API

### ScreenData
| Prop Name | Type | Description | Default |
|---|---|---|---|
| Eula | `{ accepted: boolean }` | Contains data to indicate Eula is accepted or not. |  |
| CreateAccount | `{ emailAddress: string }` | Stores email address of Create Account Screen. |  |
| VerifyCode | `{ code: string }` | Stores code of Verify Code Screen. |  |
| CreatePassword | `{ password: string; confirmPassword: string }` | Stores password and confirmPassword of Create Password Screen. |  |
| AccountDetails | `{ firstName: string; lastName: string ; extra?: { [key: string]: any }` | An object of data of all screens available in the Registration Workflow Context |  |
| Other | `{ [key: string]: { [key: string]: any } }` | Stores data of custom screen. |  |

### RegistrationWorkflowContextProps

| Prop Name | Type | Description | Default |
|---|---|---|---|
| currentScreen | `number` | The current screen in the registration workflow |  |
| totalScreens | `number` | The total number of screens in the registration workflow. |  |
| nextScreen | `(data: IndividualScreenData) => void` | Update the data of the current screen while navigating to the next screen in the Registration Workflow Context. |  |
| previousScreen | `(data: IndividualScreenData) => void` | Update the data of the current screen while navigating to the previous screen in the Registration Workflow Context. |  |
| screenData | `ScreenData` | An object of data of all screens available in the Registration Workflow Context. Check [ScreenData](#ScreenData) for more details. |  |
| updateScreenData | `(data: IndividualScreenData) => void` | Updates collected data/inputs throughout the Registration Workflow. |  |
| isInviteRegistration | `boolean` | Indicates whether this workflow is for invitation-based registration. |  |