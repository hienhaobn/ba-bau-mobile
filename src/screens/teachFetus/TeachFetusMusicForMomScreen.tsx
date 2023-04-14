import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const TeachFetusMusicForMomScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Âm nhạc cho mẹ bầu" />;

    const renderContent = () => (
        <View>
            <Image source={Images.Mom2} style={styles.headerImg} />
            <Text style={styles.titleHeader}>Âm nhạc</Text>
            <Text style={styles.desc}>Giai điệu du dương sẽ kích thích sự phát triển của bé</Text>
            <View>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Mom1} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>3.Vivace</Text>
                        <Text style={styles.itemContentDesc}>3.Vivace</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.MomRead} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>3.Vivace</Text>
                        <Text style={styles.itemContentDesc}>3.Vivace</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>3.Vivace</Text>
                        <Text style={styles.itemContentDesc}>3.Vivace</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>3.Vivace</Text>
                        <Text style={styles.itemContentDesc}>3.Vivace</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>3.Vivace</Text>
                        <Text style={styles.itemContentDesc}>3.Vivace</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>3.Vivace</Text>
                        <Text style={styles.itemContentDesc}>3.Vivace</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>3.Vivace</Text>
                        <Text style={styles.itemContentDesc}>3.Vivace</Text>
                    </View>
                </TouchableOpacity>
            </View>
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

export default TeachFetusMusicForMomScreen;

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
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
            marginBottom: scales(15),
        },
        image: {
            width: scales(50),
            height: scales(50),
        },
        itemContentContainer: {
            flexDirection: 'row',
            backgroundColor: color.Color_Bg,
            borderRadius: scales(8),
            paddingVertical: scales(15),
            paddingHorizontal: scales(12),
            marginBottom: scales(15),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        itemContent: {
            flex: 1,
            marginLeft: scales(10),
        },
        itemContentHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemContentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        headerImg: {
            width: Sizes.scrWidth - scales(30),
            height: scales(188),
            marginBottom: scales(15),
        },
    });
};
