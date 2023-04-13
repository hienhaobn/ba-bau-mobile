import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';
import Header from 'components/Header';

const PrenatalCareCheckupsChartBabyScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    return (
        <View style={styles.container}>
            <Header title='Biểu đồ của bé' />
            <Text>PrenatalCareCheckupsChartBabyScreen</Text>
        </View>
    );
};

export default PrenatalCareCheckupsChartBabyScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
    });
};
