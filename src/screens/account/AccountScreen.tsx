import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import { useTheme } from 'hooks/useTheme';

import { Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const AccountScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderContentHeader = () => (
        <View style={styles.contentHeaderContainer}>
            <Image source={Images.GirlHome} style={styles.girlHome} />
        </View>
    );

    const renderContent = () => <View style={styles.content}>{renderContentHeader()}</View>;

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={styles.imageHome} />
                {renderContent()}
            </ScrollView>
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
        imageHome: {
            backgroundColor: color.Color_Primary2,
            width: Sizes.scrWidth * 2,
            borderRadius: Sizes.scrWidth,
            height: Sizes.scrWidth * 2,
            position: 'absolute',
            top: -Sizes.scrWidth / 2 - Sizes.scrWidth,
            left: -Sizes.scrWidth / 2,
        },
        content: {
            marginHorizontal: scales(15),
        },
        contentHeaderContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: Sizes.scrWidth / 4,
        },
        girlHome: {
            top: scales(10),
            width: scales(120),
            height: scales(120),
            backgroundColor: color.Color_Primary,
            borderRadius: scales(120),
        },
    });
};
export default AccountScreen;
