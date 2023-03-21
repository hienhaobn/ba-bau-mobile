import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';

import { useTheme } from 'hooks/useTheme';

import { goToLogin } from 'screens/login/src/utils';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const ForgotPasswordScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const handlePress = () => {
        // TODO: call api
        // TODO: go to confirm OTP
    };

    const renderHeader = () => (
        <View style={styles.tileContainer}>
            <Text style={styles.title}>Quên mật khẩu</Text>
        </View>
    );

    const renderInputEmail = () => (
        <View>
            <View>
                <Text style={styles.titleInput}>Email</Text>
                <Input placeholder="Vui lòng nhập email để lấy lại mật khẩu" />
            </View>
        </View>
    );

    const renderButton = () => (
        <Button title="Gửi" customStyles={{ marginTop: scales(20), marginBottom: scales(20) }} onPress={handlePress} />
    );

    const renderBackToLogin = () => (
        <View style={styles.backToLogin}>
            <Text style={styles.back}>Quay lại</Text>
            <Text onPress={goToLogin} style={styles.login}>
                Đăng nhập
            </Text>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderHeader()}
            {renderInputEmail()}
            {renderButton()}
            {renderBackToLogin()}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="" />
            {renderContent()}
        </View>
    );
};

export default ForgotPasswordScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
        },
        tileContainer: {
            marginTop: scales(40),
            marginBottom: scales(40),
            alignItems: 'center',
        },
        title: {
            ...Fonts.inter700,
            fontSize: scales(24),
            color: color.Color_Primary,
        },
        titleInput: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(8),
        },
        backToLogin: {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        login: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(5),
            textDecorationLine: 'underline',
        },
        back: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
    });
};
