import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const DishDetailIngredientScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    return (
        <View style={styles.container}>
            <Text style={styles.txt}>- 250g thịt bò</Text>
            <Text style={styles.txt}>- 250g dưa chua</Text>
            <Text style={styles.txt}>- 50g dầu thực vật</Text>
            <Text style={styles.txt}>- Đường, xì dầu, bột năng, muối</Text>
        </View>
    );
};

export default DishDetailIngredientScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        txt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(10),
        },
    });
};
