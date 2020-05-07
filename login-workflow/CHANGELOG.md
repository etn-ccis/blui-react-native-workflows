# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v0.2.3
### Added

- iOS and Android icons
- Support for setting language based on device's locale
- More strong typing
- Script for example to use local code first, but if moved out of the folder it will use the node_module folder

### Fixed

- Next button state on first screen of self registration

### Changed

- Define tighter dependencies
- Prevent users who reach the email verification step in self registration from jumping back in the flow
- Email regex
- Use PX Blue Typography for most textual elements
- Significant documentation clarifications

## v0.2.1
### Added

- Deep link support
- TypeDoc code documentation generation and folder
- Additional testing of new components
- `yarn precommit` task for code validation, testing, code documentation generation, and licenses generation
- Documentation for mock actions within the examples folder

### Fixed

- Change Password keyboard overlaying text input
- Status bar colours across iOS and Android
- Enable state of EULA accept button when EULA is not loaded
- Resolved additional TODOs and FIXMEs throughout the code

### Changed

- Updated README with more specific integration information
- Refactored contexts for global authentication and registration states and actions
- Moved extra strings into the english.ts translations file and added TODOs for missing French translations

## v0.2.0
### Added
- Networking mocks for examples
- Error handling for all networking
- UI and unit tests
- Rename applications to AuthUIExample
- Embed ChangePassword in AuthNavigator
- Debug mode
- Ability to configure external options showSelfRegistration, allowDebugMode, contactEmail, contactPhone, projectImage at a high level
- Support for a wider array of screen sizes
- Packaging for NPM
- Validation tasks
- Ability to launch UI from a provided code

### Fixed
- UI fixes
- Images not loading in Android (React Native bug workaround)
- Handle Android back button
- Sentence case all buttons
- Linting and prettifying

### Changed
- Rearchitecture Android and iOS examples into seperate directory
- Refactor security context
- Replace promises with await/async pattern

## v0.1.0
### Added
- Initial beta release
