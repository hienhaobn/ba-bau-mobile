import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';

const PremiumScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    return (
        <View style={styles.container}>
            <Text>Premium Screen</Text>
        </View>
    );
};

export default PremiumScreen;

const myStyles = (themeCurrent: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            paddingTop: Sizes.statusBarHeight,
        },
    });
};
