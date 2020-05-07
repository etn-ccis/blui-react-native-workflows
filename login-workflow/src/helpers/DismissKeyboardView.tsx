/**
 * @packageDocumentation
 * @module Helpers
 * @internal
 */

/* eslint-disable arrow-body-style */

import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

/**
 * Dismisses the keyboard via tap outside text inputs. Can contain children.
 */
const DismissKeyboardWrapper = (CompositionView: any): ((props: any) => JSX.Element) => {
    // eslint-disable-next-line react/display-name
    return ({ children, ...props }: any): JSX.Element => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <CompositionView {...props}>{children}</CompositionView>
        </TouchableWithoutFeedback>
    );
};
export const DismissKeyboardView = DismissKeyboardWrapper(View);
