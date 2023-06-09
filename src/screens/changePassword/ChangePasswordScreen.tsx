import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SvgIcons from '../../assets/svgs';
import Button from '../../components/Button/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { hideLoading, showLoading } from '../../components/Loading';
import { useTheme } from '../../hooks/useTheme';
import { goBack } from '../../navigation/utils';
import { changePassword } from '../../states/user/fetchProfile';
import { Fonts } from '../../themes';
import { getThemeColor } from '../../utils/getThemeColor';
import { scales } from '../../utils/scales';
import { showCustomToast } from '../../utils/toast';

function ChangePasswordScreen(props) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [securePassword, setSecurePassword] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    const validateInputPassword = () => {
        if (password !== confirmPassword) {
            showCustomToast('Mật khẩu không khớp');
            return true;
        }
    };

    const onConfirm = async () => {
        if (validateInputPassword()) {
            return;
        }
        showLoading();
        const response = await changePassword(password, newPassword);
        hideLoading();
        if (response) {
            goBack();
        }
    };

    const renderInputPassword = () => {
        const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
        return (
            <View style={styles.inputPasswordContainer}>
                <Text style={styles.title}>Mật khẩu</Text>
                <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Vui lòng nhập mật khẩu"
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
                <Text style={styles.title}>Nhập lại mật khẩu</Text>
                <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Vui lòng nhập lại mật khẩu"
                    secureTextEntry={securePassword}
                    icon={<Icon width={scales(15)} height={scales(15)} />}
                    onPressIcon={() => setSecurePassword(!securePassword)}
                />
            </View>
        );
    };

    const renderInputNewPassword = () => {
        const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
        return (
            <View style={styles.inputPasswordContainer}>
                <Text style={styles.title}>Nhập mật khẩu mới</Text>
                <Input
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Vui lòng nhập mật khẩu mới"
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
            {renderInputNewPassword()}
            {renderButton()}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title='Thay đổi mật khẩu' />
            {renderContent()}
        </View>
    );
}

export default ChangePasswordScreen;

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

