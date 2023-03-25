import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Button from 'components/Button/Button';
import TouchableOpacity from 'components/TouchableOpacity';

const VerifyOTPScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [code, setCode] = useState<string>('');

    const renderHeader = () => (
        <View style={styles.tileContainer}>
            <Text style={styles.titleHeader}>Nhập mã xác thực</Text>
            <Text style={styles.descHeader}>Mẹ bầu vui lòng nhập mã OTP được gửi qua Email </Text>
        </View>
    );

    const renderConfirmOTP = () => {

    };

    const renderButton = () => (
        <Button
            title="Xác nhận"
            onPress={renderConfirmOTP}
            customStyles={{ marginTop: scales(30), marginBottom: scales(20) }}
        />
    );

    const renderButtonResend = () => {
        return (
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} activeOpacity={1}>
                <Text style={styles.textResend}>Gửi lại?</Text>
            </TouchableOpacity>
        )
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
    });
};
