/* eslint-disable @typescript-eslint/camelcase */
const resources = {
    translation: {
        ACTIONS: {
            FINISH: 'Finish',
            NEXT: 'Next',
            BACK: 'Back',
            OKAY: 'Okay',
            DONE: 'Done',
            CONTINUE: 'Continue',
            LOG_IN: 'Log In',
            LOG_OUT: 'Log Out',
            CLICK_BUTTON: 'Click the button',
            UPDATE_REDUX: 'Click the button to update the redux store value!',
            CHANGE_LANGUAGE: 'Change Language here!',
            GO_HOME: 'Go to Home',
            GO_TEST: 'Go to Test Page',
            RESEND: 'Resend',
            UPDATE: 'Update',
            REMEMBER: 'Remember Me',
        },
        LABELS: {
            EMAIL: 'Email Address',
            PASSWORD: 'Password',
            CURRENT_PASSWORD: 'Current Password',
            NEW_PASSWORD: 'New Password',
            FORGOT_PASSWORD: 'Forgot your password?',
            NEED_ACCOUNT: 'Need an account?',
            VIEW_ALL_EVENTS: 'View All {{count}} Events',
        },
        MESSAGES: {
            EMAIL_SENT: 'Email Sent',
            WELCOME: 'Welcome',
            WELCOME_PROJECT: 'Welcome to {{project}}',
            LOGIN_MESSAGE: "You are 'logged' in",
            CONGRATS: 'Congratulations!',
            CONTACT: 'Contact an Eaton Support Representative',
            ERROR: 'Error!',
            EMAIL_ENTRY_ERROR: 'Please enter a valid email',
            SUCCESS: 'Success',
            FAILURE: 'Failure',
            LOADING: 'Loading...',
            REQUEST_ERROR: 'Sorry, there was a problem sending your request.',
        },
        REGISTRATION: {
            EULA: {
                LOADING: 'Loading End User License Agreement...',
                AGREE_TERMS: 'I have read and agree to the Terms & Conditions',
            },
            STEPS: {
                CREATE_ACCOUNT: 'Create an Account',
                VERIFY_EMAIL: 'Verify Email',
                LICENSE: 'License Agreement',
                PASSWORD: 'Create Password',
                ACCOUNT_DETAILS: 'Account Details',
                COMPLETE: 'Account Created!',
            },
            INSTRUCTIONS: {
                ACCOUNT_DETAILS: 'Enter your details below to complete account creation.',
            },
            SUCCESS_MESSAGE:
                'Your account has been successfully created with the email <b>{{email}}</b>.\n\nYour account has already been added to the <b>{{organization}}</b> organization.\n\nPress continue below to continue.',
            FAILURE_MESSAGE: 'We were unable to complete your registration. Press continue below to continue.',
            UNKNOWN_EMAIL: 'Unknown Email',
            UNKNOWN_ORGANIZATION: 'Unknown Organization',
        },
        SELF_REGISTRATION: {
            VERIFY_EMAIL: {
                MESSAGE:
                    'A verification code has been sent to the email address you provided. Click the link or enter the code below to continue. This code is valid for 30 minutes.',
                RESEND: 'Resend Verification Email',
                VERIFICATION: 'Verification Code',
            },
        },
        FORGOT_PASSWORD: {
            ERROR: 'Could not reset your password at this time.',
            INSTRUCTIONS:
                'Please enter the account email associated with the account.\n\n' +
                'If this email has an account with Eaton, you will receive a response within <b>one business day</b>.\n\n' +
                'For urgent account issues, please call {{phone}}.',
            RESET_CODE_ERROR: 'There was an error with your reset code. ',
            LINK_SENT: 'A link to reset your password has been sent to <b>{{email}}</b>.',
        },
        LOGIN: {
            INVALID_CREDENTIALS: 'Your username/password combination is not recognized.',
            GENERIC_ERROR: 'Your request could not be processed at this time.',
        },
        FORMS: {
            FIRST_NAME: 'First Name',
            LAST_NAME: 'Last Name',
            PHONE_NUMBER: 'Phone Number',
            PASSWORD: 'Password',
            CONFIRM_PASSWORD: 'Confirm Password',
            PASS_MATCH_ERROR: 'Passwords do not match',
            TOGGLE_PASSWORD_VISIBILITY: 'Toggle password visibility',
            RESET_PASSWORD: 'Reset Password',
        },
        PASSWORD_REQUIREMENTS: {
            LENGTH: '8-16 Characters',
            NUMBERS: 'One number',
            UPPER: 'One uppercase letter',
            LOWER: 'One lowercase letter',
            SPECIAL: 'One special character',
        },
        PASSWORD_RESET: {
            SUCCESS_MESSAGE: 'Your password was successfully reset.',
            FAILURE_MESSAGE: 'Your password was unable to be reset. Please try again later.',
        },
        USER_SETTINGS: {
            NAME: 'Name',
            EMAIL: 'Email',
            PHONE_NUMBER: 'Phone Number',
            PASSWORD: 'Password',
            EMAIL_NOTIFICATION: 'Email Notification',
            ENABLED: 'Enabled',
            ORGANIZATION: 'Organization',
            ORGANIZATION_NAME: 'Organization Name',
            ADDRESS: 'Address',
            CHANGE_PASSWORD: 'Change Password',
            ACCOUNT: 'Account',
        },
        COUNTER: 'The value is: {{count}}',
        HEADER: {
            FORGOT_PASSWORD: 'Forgot Password',
        },
        ERROR_MESSAGES: {
            '2002': 'User registration link is already redeemed.',
            '9003': 'Requested operation cannot be performed, please contact your administrator',
        },
        CHANGE_PASSWORD: {
            PASSWORD_CHANGED: 'Password Changed',
            PASSWORD: 'Change Password',
            SUCCESS_MESSAGE:
                "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.",
            EMAIL_CONFIRM_MESSAGE: 'We have sent a confirmation email to <b>{{email}}</b>',
            PASSWORD_INFO:
                'Password must be between 8 and 16 characters long and contain at least three of the following character types: Lowercase Letters, Upper Case Letters, Digits or Special Characters.',
            OLD_PASSWORD: 'Old Password',
            ERROR_MESSAGE:
                'Your information did not match our records. Please re- enter your information to try again.',
            PROBLEM_OCCURRED: 'A problem occurred:',
            CONFIRM_NEW_PASSWORD: 'Confirm New Password',
            CANCEL: 'Cancel',
            UPDATE: 'Update',
        },
        SETTINGS: {
            TITLE: 'Settings',
        },
        LEGAL: {
            TITLE: 'Legal',
            TERMSANDCONDITIONS: 'Terms and Conditions',
            EULA: 'End User License Agreement',
            OPENSOURCELICENSES: 'Open Source Licenses',
        },
        USER_MENU: {
            LOG_OUT: 'Log Out',
            CONTACT_US: 'Contact Us',
            ACCOUNT_SETTING: 'Account Settings',
        },
        CONTACT_SUPPORT: {
            GENERAL_QUESTIONS: 'General Questions',
            SUPPORT_MESSAGE: 'For email questions, feedback, or support please email us at ',
            EMERGENCY_SUPPORT: 'Emergency Support',
            TECHNICAL_ASSISTANCE: 'For 24/7 technical support, please call ',
        },
    },
};
export default resources;
