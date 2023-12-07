/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React, { useCallback, useState } from 'react';

// Components
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Body1 } from '@brightlayer-ui/react-native-components';
import { Checkbox } from '../../../components/Checkbox';
import { WebView } from 'react-native-webview';

// Hooks
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRegistration } from '../../contexts/RegistrationContextProvider';

const SAMPLE_EULA = `THIS EULA IS ONLY BETWEEN EATON CORPORATION (“EATON”) AND THE END USER TO WHICH THE EATON WEB APPLICATION (THE “APP”) IS PROVIDED (“YOU”). BY ACCESSING, OR USING THE APP, YOU AGREE TO BE BOUND BY THIS EULA. IF YOU DO NOT AGREE WITH THE EULA, THEN DO NOT USE THIS APP.\n\nSubject to your acceptance of this EULA, Eaton grants you, a limited, nonexclusive, nontransferable, revocable license to access and use the App via the Internet for your personal and noncommercial purposes and as permitted by the Terms of Use. Eaton is the licensor of the App. You may not modify, reverse engineer, decompile, or disassemble the App, in whole or in part, or create any derivative works from or sublicense any rights in the App, unless otherwise expressly authorized in writing by Eaton. You may not translate or otherwise attempt to create the source code from the App, or rent, lease, grant a security interest in, or otherwise transfer any rights to, copy, distribute, transmit, display, perform, reproduce, publish, license, or transfer the App, or remove or alter any trademark, logo, ©, patent or other proprietary notices in the App. The App is protected by © and other intellectual property laws and treaties. Unless expressly stated in this EULA, Eaton owns all title, © and other intellectual property and proprietary rights in and to the App, and the App is licensed and not sold. You acknowledge and agree that Eaton will have no liability to you for any intellectual property infringement or violation, or for violation of this EULA or any license, arising out of or resulting from the use of the App in combination with any other product or service not approved or supplied by Eaton, or modification of the App by you or for you. If you breach this EULA, Eaton may immediately terminate this EULA, whereupon you shall immediately cease using the App. By accepting this EULA, you will have the right pursuant to this EULA to access and use the App. By using this App you will be required to provide Eaton certain personal data in accordance with the Eaton Privacy Policy (“Privacy Policy”). This data includes, but is not limited to: (a) first and last name, (b) phone number, (c) email address, (d) shopping and/or product preferences and history, (e) purchase history, and (f) device data including, but not limited to, Internet Protocol address, location data, Operating System version, and language (“Personal Data”). If you register for the App through a social profile such as Facebook or Google+, tallyo may also process and store your social network profile, which may include, but is not limited to, additional Personal Data that you choose to make accessible to Eaton such as (x) friend or contact names, (y) date of birth, and (z) likes and dislikes. You hereby agree to allow Eaton and the App to access, store and use any information directly related to the App, including, without limitation, Personal Data. Eaton agrees to comply with all applicable privacy laws in connection with its collection, storage and use of Personal Data. The Privacy Policy is incorporated herein by reference All rights not expressly granted to you are retained by Eaton. You must comply with applicable third party terms of agreement when using the App. In the event of a breach of this EULA by Eaton, Eaton's entire liability and your exclusive remedy shall be repair or replacement of the App, except that such remedy will not be available if any problem with the App arises from your violation of this EULA, accident, abuse, misapplication, abnormal or unauthorized access or use, or introduction of a virus or malicious code by a person other than Eaton. Eaton or its suppliers are solely responsible for providing maintenance and support services with respect to the App (Support Services). Support Services are governed by the policies and programs described in the Eaton-provided materials or as required under applicable law. Any software code provided to you as part of the Support Services is part of the App and subject to this EULA. You agree that access to and use of the App will not be provided by you or any employee or agent of you to any citizen of a country to which access or use thereof is barred, or to which exports or shipments are barred, by the US government, and that you will not ship, transfer or export the App into any country or use it in any manner prohibited by the United States Export Administration Act or any other export laws, restrictions or regulations (Export Laws). You represent and warrant that you are not located in or a citizen of a country that is subject to a US government embargo, that you are not listed on any US government list of prohibited or restricted parties, and that you are not otherwise prohibited under the Export Laws from receiving access to or using the App. ACCESS TO AND USE OF THE APP IS PROVIDED “AS IS.” ALTHOUGH THE APP IS BELIEVED TO BE ACCURATE, IT IS FOR INFORMATIONAL PURPOSES ONLY. YOU ASSUME TOTAL RESPONSIBILITY AND RISK FOR USE OF THE APP. EATON DOES NOT GUARANTEE CONTINUOUS, UNINTERRUPTED OR SECURE ACCESS TO OR USE OF THE APP. NO WARRANTY OR CONDITION, EXPRESS OR IMPLIED, IS MADE WITH RESPECT TO THE APP, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE PARTIES AGREE THAT EATON IS NOT PROVIDING ANY WARRANTY OR OTHER ASSURANCE THAT THE APP IS FREE OF THE RIGHTFUL CLAIM OF ANY THIRD PARTY BY WAY OF INFRINGEMENT OR OTHERWISE. EATON SHALL NOT BE LIABLE TO YOU FOR SPECIAL, INCIDENTAL, CONSEQUENTIAL, EXEMPLARY OR OTHER DAMAGES RESULTING FROM ACCESS TO OR USE OF THE APP, HOWEVER CAUSED. IN NO EVENT SHALL EATON’S TOTAL LIABILITY ARISING IN CONNECTION WITH OR UNDER THIS EULA EXCEED THE TOTAL FEES ACTUALLY PAID TO EATON BY YOU UNDER THIS EULA. This EULA will be construed in accordance with the substantive laws of the State of Ohio, without regard to its principles of conflicts of law. This EULA contains the entire understanding between you and Eaton regarding its subject matter and supersedes all prior agreements between you and Eaton (oral or written) regarding such subject matter. This EULA may be modified from time to time by Eaton. Any waiver of any provision must be in writing. If any provision of this EULA is found illegal or unenforceable, the remaining provisions will remain in full force and effect. `;

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
        },
        mainContainer: {
            flex: 1,
            paddingTop: 16,
            width: 'auto',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        containerMargins: {
            marginHorizontal: 16,
        },
        checkboxContainer: {
            height: 72,
            justifyContent: 'center',
            marginRight: 16,
            marginLeft: -2,
            width: '100%',
            maxWidth: 600,
            alignSelf: 'center',
        },
        scrollContainer: {
            flex: 1,
            alignContent: 'center',
        },
        scrollContentContainer: {
            alignSelf: 'center',
            maxWidth: 600,
        },
    });

/**
 * Handle the change of the password input.
 *
 * @param eulaAccepted  (Optional) If the EULA has been accepted or not. Default false.
 * @param eulaContent  (Optional) The content of the EULA.
 * @param onEulaChanged  The function to handle when the EULA state has changed.
 * @param eulaError  The error message.
 * @param loadEula  The function to be used for loading the EULA.
 * @param htmlEula (Optional) whether the EULA should be plaintext or support HTML
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type EulaProps = {
    eulaAccepted?: boolean;
    eulaContent?: string;
    onEulaChanged(accepted: boolean): void;
    eulaError: string | null;
    loadEula: () => void;
    htmlEula?: boolean;
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the content of the EULA screen (EULA body and accept checkbox).
 *
 * @category Component
 */
export const EulaScreen: React.FC<EulaProps> = (props) => {
    const theme = useTheme(props.theme);
    const { t } = useLanguageLocale();
    const navigation = useNavigation();
    const containerStyles = makeContainerStyles(theme);
    const [contentLoaded, setContentLoaded] = useState(false);
    const eulaIsChecked = props.eulaAccepted ?? false;
    const htmlEula = props.htmlEula ?? false;
    const eulaContent = props.eulaContent ?? props.eulaError ?? SAMPLE_EULA;
    const { setEulaData } = useRegistration();

    const checkedBox = useCallback(() => {
        return !eulaIsChecked;
    }, [eulaIsChecked]);

    const disableCheckBox = false;

    const eulaContentInternals = eulaContent;

    const onLoadEnd = (): void => {
        setContentLoaded(true);
    };

    return (
        <SafeAreaView style={[containerStyles.safeContainer]}>
            <View style={[containerStyles.mainContainer, containerStyles.containerMargins]}>
                {htmlEula ? (
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: eulaContentInternals, baseUrl: '' }}
                        scalesPageToFit={false}
                        onLoadEnd={onLoadEnd}
                        forceDarkOn={theme.dark ? true : false}
                        style={{
                            flex: 1,
                            height: 50 /* WebView needs a fixed height set or it won't render */,
                            backgroundColor: theme.colors.surface,
                        }}
                    />
                ) : (
                    <ScrollView
                        style={containerStyles.scrollContainer}
                        contentContainerStyle={[containerStyles.scrollContentContainer]}
                    >
                        <Body1>{eulaContentInternals}</Body1>
                    </ScrollView>
                )}
                <View
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <View style={[containerStyles.checkboxContainer]}>
                        <Checkbox
                            label={t('blui:REGISTRATION.EULA.AGREE_TERMS')}
                            disabled={disableCheckBox}
                            checked={true}
                            onPress={checkedBox}
                        />
                    </View>
                </View>
                <View style={{ display: 'flex' }}>
                    <Button onPress={() => navigation.navigate('Login')}>Back</Button>
                    <Button
                        onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            navigation.navigate('DemoCreateAccountScreen');
                            setEulaData({
                                eulaAccpted: true,
                            });
                        }}
                    >
                        Next
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};
