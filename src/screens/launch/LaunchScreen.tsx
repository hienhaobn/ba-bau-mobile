import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import SvgIcons from 'assets/svgs';

import { useTheme } from 'hooks/useTheme';

import { resetStack } from 'navigation/utils';

import { getThemeColor } from 'utils/getThemeColor';

import 'i18n';
import { scales } from 'utils/scales';

const LaunchScreen = () => {
    const { theme } = useTheme();
    const { i18n } = useTranslation();
    const styles = myStyles(theme);

    const initLocale = React.useCallback(() => {
        const currentLocale = 'en'; // Todo
        i18n.changeLanguage(currentLocale);
    }, [i18n]);

    React.useEffect(() => {
        initLocale();
      }, [initLocale]);

    useEffect(() => {
        SplashScreen.hide();
        onNavigator()
    }, []);

    const onNavigator = () => {
        setTimeout(() => {
            resetStack('Main');
        }, 200);
    };

    return (
        <View style={styles.container}>
            <View style={styles.img}>
                <SvgIcons.IcLogoLaunch width={scales(365)} height={scales(365)}/>
            </View>
        </View>
    );
};

export default LaunchScreen;

const myStyles = (theme: string) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: getThemeColor().Color_Primary,
        },
        img: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
