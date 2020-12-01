/**
 * @packageDocumentation
 * @module Components
 */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        background: {
            flexDirection: 'row',
        },
        circle: {
            height: 8,
            width: 8,
            borderRadius: 20,
            marginRight: 8,
            overflow: 'hidden',
            backgroundColor: Colors.gray['100'],
        },
        filled: {
            position: 'absolute',
            height: 8,
            width: 8,
            borderRadius: 20,
            backgroundColor: theme.colors.primary,
        },
    });

/**
 * @param currentPage  The currently selected page index.
 * @param totalPages  The total number of pages.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
export type PageIndicatorProps = {
    currentPage: number;
    totalPages: number;
    theme?: ReactNativePaper.Theme;
};

/**
 * A page indicator intended to show current position in a pager. Visually a series
 * of `totalPages` number of dots with the dot at `currentPosition` being styled
 * differently.
 *
 * @category Component
 */
export const PageIndicator: React.FC<PageIndicatorProps> = (props) => {
    const { currentPage, totalPages } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles(theme);
    const pageIndices = [...Array(totalPages).keys()];

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                {pageIndices.map((i) => {
                    if (i === currentPage) {
                        return (
                            <View style={styles.circle} key={i}>
                                <View style={[styles.filled]} />
                            </View>
                        );
                    }
                    return <View style={styles.circle} key={i}></View>;
                })}
            </View>
        </View>
    );
};
