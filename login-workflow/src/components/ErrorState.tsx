/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';

// Components
import { EmptyState, wrapIcon } from '@pxblue/react-native-components';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Theme, useTheme } from 'react-native-paper';

const ReportIcon = wrapIcon({ IconClass: MatIcon, name: 'report' });

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
    });

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
    StyleSheet.create({
        sideBySideButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
        },
    });

/**
 * @param title  The title to show on the error state.
 * @param bodyText  The body text to show on the error state.
 * @param icon  (Optional) The icon to show at the top of the error state. Icon 'report' is used if none is specified.
 * @param onPress  The function to handle the on press action.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type ErrorStateProps = {
    title: string;
    bodyText: string | null;
    icon?: string;
    onPress: Function;
    theme?: Theme;
};

/**
 * Renders the content of the notice of completed account creation / password reset screen.
 *
 * @category Component
 */
export const ErrorState: React.FC<ErrorStateProps> = (props) => {
    const theme = useTheme(props.theme);
    const { t } = useLanguageLocale();

    const containerStyles = makeContainerStyles();
    const styles = makeStyles();

    return (
        <SafeAreaView style={[containerStyles.spaceBetween, { backgroundColor: 'white' }]}>
            <View style={{ flex: 1 }}>
                <EmptyState
                    IconClass={ReportIcon}
                    iconColor={theme.colors.error}
                    title={'Failure'} // TODO: translate me
                    description={props.bodyText ?? t('MESSAGES.REQUEST_ERROR')}
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
};
