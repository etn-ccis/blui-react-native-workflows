import { ViewProps } from 'react-native';

export type SpinnerProps = ViewProps & {
    /**
     * Set True if the spinner should be displayed, false to render nothing
     */
    visible?: boolean;
};
