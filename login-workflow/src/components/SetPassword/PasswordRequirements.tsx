import React, { useEffect } from 'react';
import { defaultPasswordRequirements } from '../../constants';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { PasswordRequirementsProps } from './types';
import { PasswordRequirementsCheck } from './PasswordRequirementsCheck';

/**
 * Component to update password requirements.
 *
 * @param {PasswordRequirementsProps} props - props of PasswordRequirements component
 *
 * @category Component
 */
export const PasswordRequirements: React.FC<PasswordRequirementsProps> = (props) => {
    const { t } = useTranslation();
    const { passwordText, passwordRequirements = defaultPasswordRequirements(t), style, ...otherProps } = props;

    useEffect(() => {
        // Ensure password requirements are translated if necessary
        passwordRequirements.forEach((req) => (req.description = t(req.description)));
    }, [t, passwordRequirements]);

    return (
        <View style={style} {...otherProps}>
            {passwordRequirements.map((req, ind) => (
                <PasswordRequirementsCheck
                    key={`password_requirement_${ind}`}
                    label={req.description}
                    isChecked={new RegExp(req.regex).test(passwordText)}
                />
            ))}
        </View>
    );
};

export default PasswordRequirements;
