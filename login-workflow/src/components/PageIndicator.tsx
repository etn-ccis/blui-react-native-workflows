/**
 * @packageDocumentation
 * @module Components
 */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
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
            backgroundColor: Colors.blue['500'],
        },
    });

/**
 * @param currentPage  The currently selected page.
 * @param totalPages  The total number of pages.
 */
export type PageIndicatorProps = {
    currentPage: number;
    totalPages: number;
};

/**
 * A page indicator intended to show current position in a pager. Visually a series
 * of `totalPages` number of dots with the dot at `currentPosition` being styled
 * differently.
 *
 * @category Component
 */
export function PageIndicator(props: PageIndicatorProps): JSX.Element {
    const pageIndicies = [...Array(props.totalPages).keys()];
    const styles = makeStyles();

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                {pageIndicies.map((i) => {
                    if (i === props.currentPage) {
                        return (
                            <View style={styles.circle} key={i}>
                                <View style={[styles.filled]} />
                            </View>
                        );
                        // eslint-disable-next-line no-else-return
                    } else {
                        return <View style={styles.circle} key={i}></View>;
                    }
                })}
            </View>
        </View>
    );
}
