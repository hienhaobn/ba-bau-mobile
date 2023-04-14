import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const TeachFetusPhotoBabyScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Hình ảnh bé đáng yêu" />;

    const renderContent = () => (
        <View>
            <Image source={Images.Babe2} style={styles.headerImg} resizeMode="contain" />
            <Text style={styles.titleHeader}>Hình ảnh bé đáng yêu</Text>
            <Text style={styles.desc}>Những hình ảnh bé đáng yêu giúp cho mẹ bầu thoải mái</Text>
            <Image source={Images.Babe2} style={styles.headerImg} resizeMode="contain" />
            <Image source={Images.Babe2} style={styles.headerImg} resizeMode="contain" />
            <Image source={Images.Babe2} style={styles.headerImg} resizeMode="contain" />
            <Image source={Images.Babe2} style={styles.headerImg} resizeMode="contain" />
            <Image source={Images.Babe2} style={styles.headerImg} resizeMode="contain" />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {renderContent()}
            </ScrollView>
        </View>
    );
};

export default TeachFetusPhotoBabyScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapperContent: {
            flexGrow: 1,
            paddingHorizontal: scales(15),
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
            marginBottom: scales(15),
        },
        headerImg: {
            width: Sizes.scrWidth - scales(30),
            height: scales(188),
            marginBottom: scales(15),
        },
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
    });
};
