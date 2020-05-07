/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';

// Components
import { View, StyleSheet, SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { Instruction } from './Instruction';

// Styles
import * as Colors from '@pxblue/colors';
import { Theme, withTheme } from '@pxblue/react-native-components';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = () =>
    StyleSheet.create({
        containerMargins: {
            marginHorizontal: 20,
        },
        spaceBetween: {
            flexGrow: 1,
            justifyContent: 'space-between',
        },
        iconContainer: {
            marginTop: 80,
            marginBottom: 30,
        },
    });

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = (theme: Theme) =>
    StyleSheet.create({
        sideBySideButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
        },
        headerText: {
            fontWeight: 'bold',
            fontSize: theme.sizes.large,
            color: Colors.black['800'],
            textAlign: 'center',
        },
        bodyText: {
            fontSize: theme.sizes.medium,
            color: Colors.gray['500'],
            textAlign: 'center',
        },
    });

/**
 * @param title  The title to show on the error state.
 * @param bodyText  The body text to show on the error state.
 * @param icon  (Optional) The icon to show at the top of the error state. Icon 'report' is used if none is specified.
 * @param onPress  The function to handle the on press action.
 */
type ErrorStateProps = {
    title: string;
    bodyText: string | null;
    icon?: string;
    onPress: Function;
};

/**
 * Renders the content of the notice of completed account creation / password reset screen.
 *
 * @category Component
 */
function ErrorState(props: ErrorStateProps & { theme: any }): JSX.Element {
    const { theme } = props;
    const { t } = useLanguageLocale();

    const containerStyles = makeContainerStyles();
    const styles = makeStyles(theme);

    return (
        <SafeAreaView style={[containerStyles.spaceBetween, { backgroundColor: 'white' }]}>
            <View>
                <Icon
                    name={props.icon ?? 'report'}
                    containerStyle={containerStyles.iconContainer}
                    size={70}
                    color={Colors.red['500']}
                />
                <Text style={[containerStyles.containerMargins, styles.headerText]}>Failure</Text>
                <Instruction
                    text={props.bodyText ?? t('MESSAGES.REQUEST_ERROR')}
                    style={[containerStyles.containerMargins, styles.bodyText as StyleProp<ViewStyle>]}
                    hasBottomBorder={false}
                />
            </View>

            <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                <Button
                    uppercase={false}
                    style={{ width: '100%', alignSelf: 'flex-end' }}
                    mode={'contained'}
                    onPress={(): void => {
                        props.onPress();
                    }}
                >
                    {t('ACTIONS.FINISH')}
                </Button>
            </View>
        </SafeAreaView>
    );
}

export default withTheme(ErrorState);
