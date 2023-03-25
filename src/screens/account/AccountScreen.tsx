import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';

const AccountScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    return (
        <View style={styles.container}>
            <Text>Account Screen</Text>
        </View>
    );
};
const myStyles = (themeCurrent: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: Sizes.statusBarHeight,
            backgroundColor: color.Color_Bg,
        },
    });
};
export default AccountScreen;
