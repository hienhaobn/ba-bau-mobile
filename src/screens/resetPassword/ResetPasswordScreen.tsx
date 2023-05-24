import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SvgIcons from '../../assets/svgs';
import Button from '../../components/Button/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { hideLoading, showLoading } from '../../components/Loading';
import { useTheme } from '../../hooks/useTheme';
import { RootNavigatorParamList } from '../../navigation/types';
import { goBack, resetStack } from '../../navigation/utils';
import { resetPassword } from '../../states/user/fetchProfile';
import { Fonts } from '../../themes';
import { getThemeColor } from '../../utils/getThemeColor';
import { scales } from '../../utils/scales';
import { showCustomToast } from '../../utils/toast';

interface IResetPasswordScreenProps {
    route: RouteProp<RootNavigatorParamList, 'ResetPassword'>
}

function ResetPasswordScreen(props: IResetPasswordScreenProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { email, otp } = route.params;
    const [securePassword, setSecurePassword] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const validateInputPassword = () => {
        if (password !== confirmPassword) {
            showCustomToast('Password is incorrect');
            return true;
        }
    };

    const onConfirm = async () => {
        if (validateInputPassword()) {
            return;
        }
        showLoading();
        const response = await resetPassword(email, password, otp);
        hideLoading();
        if (!response) {
            goBack();
            return;
        }
        resetStack('Login');
    };

    const renderInputPassword = () => {
        const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
        return (
            <View style={styles.inputPasswordContainer}>
                <Text style={styles.title}>Mật khẩu mới</Text>
                <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Vui lòng nhập mật khẩu mới"
                    secureTextEntry={securePassword}
                    icon={<Icon width={scales(15)} height={scales(15)} />}
                    onPressIcon={() => setSecurePassword(!securePassword)}
                />
            </View>
        );
    };

    const renderInputConfirmPassword = () => {
        const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
        return (
            <View style={styles.inputPasswordContainer}>
                <Text style={styles.title}>Nhập lại mật khẩu mới</Text>
                <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Vui lòng nhập lại mật khẩu mới"
                    secureTextEntry={securePassword}
                    icon={<Icon width={scales(15)} height={scales(15)} />}
                    onPressIcon={() => setSecurePassword(!securePassword)}
                />
            </View>
        );
    };

    const renderButton = () => (
        <Button
            title="Lưu"
            onPress={onConfirm}
            customStyles={{ marginTop: scales(30), marginBottom: scales(20) }}
        />
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderInputPassword()}
            {renderInputConfirmPassword()}
            {renderButton()}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header hideLeft title='Thay đổi mật khẩu' />
            {renderContent()}
        </View>
    );
}

export default ResetPasswordScreen;

const myStyles = (themeCurrent: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
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
}

