import { RouteProp } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SvgIcons from 'assets/svgs';
import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { RootNavigatorParamList } from 'navigation/types';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';
import { hideLoading, showLoading } from '../../components/Loading';
import { apiRegister } from '../../states/user/fetchRegister';
import { goToResetPassword } from '../resetPassword/src/utils';
import { fetchLogin } from 'states/user';
import { useAppDispatch } from 'states';

interface VerifyOTPScreenProps {
    route: RouteProp<RootNavigatorParamList, 'VerifyOTP'>;
}

const VerifyOTPScreen = (props: VerifyOTPScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { email, fromScreen, callbackSendOtp, password } = props.route.params;
    const [code, setCode] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    // const [securePassword, setSecurePassword] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    const renderHeader = () => (
        <View style={styles.tileContainer}>
            <Text style={styles.titleHeader}>Nhập mã xác thực</Text>
            <Text style={styles.descHeader}>Mẹ bầu vui lòng nhập mã OTP được gửi qua Email </Text>
        </View>
    );

    const onConfirmOTP = async () => {
        if (fromScreen === 'ForgotPassword' && code.length === 4) {
            goToResetPassword(email, code);
            setCode('');
        }
        if (fromScreen === 'Register' && code.length === 4) {
            try {
                const res = await apiRegister({ code, email })
                setCode('');
                if (res) {
                    dispatch(fetchLogin({ email, password }));
                }
            } catch (error) {
                showCustomToast(error.message);
                return;
            }
        }
    };

    const onResendOtp = async () => {
        if (callbackSendOtp) {
            showLoading();
            const response: { message: string; success: boolean } = await callbackSendOtp();
            hideLoading();
            if (response?.success) {
                showCustomToast(response?.message)
            }
        }
    };

    // const renderInputPassword = () => {
    //     const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
    //     return (
    //         <View style={styles.inputPasswordContainer}>
    //             <Text style={styles.title}>Mật khẩu</Text>
    //             <Input
    //                 value={password}
    //                 onChangeText={setPassword}
    //                 placeholder="Vui lòng nhập mật khẩu"
    //                 secureTextEntry={securePassword}
    //                 icon={<Icon width={scales(15)} height={scales(15)} />}
    //                 onPressIcon={() => setSecurePassword(!securePassword)}
    //             />
    //         </View>
    //     );
    // };

    const renderButton = () => (
        <Button
            title="Xác nhận"
            onPress={onConfirmOTP}
            customStyles={{ marginTop: scales(30), marginBottom: scales(20) }}
        />
    );

    const renderButtonResend = () => {
        return (
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} activeOpacity={1} onPress={onResendOtp}>
                <Text style={styles.textResend}>Gửi lại?</Text>
            </TouchableOpacity>
        );
    };

    const renderContent = () => (
        <View style={styles.content}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <OTPInputView
                    style={{ width: '70%', height: 50 }}
                    pinCount={4}
                    code={code}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeChanged={setCode}
                />
            </View>
            {/*{fromScreen === 'ForgotPassword' && renderInputPassword()}*/}
            {renderButton()}
            {renderButtonResend()}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default VerifyOTPScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        tileContainer: {
            marginTop: scales(40),
            marginBottom: scales(40),
            alignItems: 'center',
        },
        titleHeader: {
            ...Fonts.inter700,
            fontSize: scales(24),
            color: color.Color_Primary,
        },
        descHeader: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(10),
        },
        content: {
            marginHorizontal: scales(15),
        },
        underlineStyleBase: {
            borderColor: color.Text_Color_Opacity_50,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderRadius: scales(10),
            color: color.Text_Dark_1,
        },
        underlineStyleHighLighted: {
            borderColor: color.Color_Primary,
        },
        textResend: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Color_Primary,
        },
        title: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(8),
        },
        inputPasswordContainer: {
            marginTop: scales(20),
        },
    });
};
