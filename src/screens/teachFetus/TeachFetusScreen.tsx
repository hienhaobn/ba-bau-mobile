import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';

const TeachFetusScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Sức khỏe thai nhi" />;

    return <View style={styles.container}>{renderHeader()}</View>;
};

export default TeachFetusScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
    });
};
