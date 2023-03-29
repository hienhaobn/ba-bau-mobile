import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';

import { useTheme } from 'hooks/useTheme';

import { resetStack } from 'navigation/utils';

import { goToLogin } from 'screens/login/src/utils';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const RegisterSuccessScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.iconHeaderContainer}>
                <SvgIcons.IcLogoLaunch width={scales(150)} height={scales(150)} />
            </View>
            <Text style={styles.textHeader}>Đăng ký thành công</Text>
        </View>
    );

    const renderButton = () => (
        <View style={styles.buttonContainer}>
            <Button title="Quay về đăng nhập" onPress={() => resetStack('Login')} />
        </View>
    );
    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderButton()}
        </View>
    );
};

export default RegisterSuccessScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        headerContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scales(40),
        },
        textHeader: {
            ...Fonts.inter700,
            color: color.Color_Primary,
            fontSize: scales(24),
        },
        iconHeaderContainer: {
            marginVertical: scales(20),
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: Sizes.bottomSpace + scales(5),
            marginHorizontal: scales(15),
        },
    });
};
