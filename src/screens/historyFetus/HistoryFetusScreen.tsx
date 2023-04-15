import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const HistoryFetusScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Nhật ký thai nhi" />;

    const renderContent = () => (
        <View>
            <Text style={styles.desc}>Hãy lưu lại những khoảnh khắc đẹp với bé yêu nào mẹ bầu !</Text>
            <View>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderButton = () => <Button title="Thêm nhật ký" customStyles={styles.button} />;

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
            {renderButton()}
        </View>
    );
};

export default HistoryFetusScreen;

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
        image: {
            width: scales(50),
            height: scales(50),
        },
        itemContentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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
            marginBottom: scales(5),
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
        button: {
            marginBottom: Sizes.bottomSpace + scales(5),
            marginHorizontal: scales(15),
        },
    });
};
