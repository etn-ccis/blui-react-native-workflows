/**
 * @packageDocumentation
 * @module Helpers
 * @internal
 */

import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

/**
 * Dismisses the keyboard via tap outside text inputs. Can contain children.
 */
const DismissKeyboardWrapper = (CompositionView: React.ComponentType): ((props: any) => JSX.Element) => ({ children, ...props }: any): JSX.Element => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <CompositionView {...props}>{children}</CompositionView>
    </TouchableWithoutFeedback>
);
export const DismissKeyboardView = DismissKeyboardWrapper(View);
