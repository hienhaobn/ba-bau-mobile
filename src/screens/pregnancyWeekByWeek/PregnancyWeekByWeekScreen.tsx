import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PregnancyWeekByWeekScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Thai kỳ theo tuần" />;

    const renderContentHeader = () => (
        <View style={styles.contentContentContainer}>
            <Text style={styles.textTime}>Thời gian: </Text>
            <TouchableOpacity style={styles.weekContainer}>
                <Text style={styles.week}>Tuần 1</Text>
                <SvgIcons.IcDownReward width={scales(10)} height={scales(10)} color={getThemeColor().Text_Dark_1} />
            </TouchableOpacity>
        </View>
    );

    const renderItems = () => (
        <View style={styles.itemContainer}>
            <Image source={Images.PregnancyWeek1} style={styles.imageWeek} />

            <View>
                <View style={styles.itemHeaderContainer}>
                    <Image source={Images.PregnancyBaby} style={styles.iconItemHeader} />
                    <Text style={styles.titleItemHeader}>Bé yêu</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>
                        Chào mẹ, vậy là mẹ đã chính thức vào tuần đầu tiên của hành trình 40 tuần ấp ủ “mầm sống yêu
                        thương” rồi đấy! Trong tuần đầu...
                    </Text>
                </View>
                <TouchableOpacity style={styles.moreContainer}>
                    <Text style={styles.more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line} />

            <View>
                <View style={styles.itemHeaderContainer}>
                    <Image source={Images.PregnancyBaby} style={styles.iconItemHeader} />
                    <Text style={styles.titleItemHeader}>Bé yêu</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>
                        Chào mẹ, vậy là mẹ đã chính thức vào tuần đầu tiên của hành trình 40 tuần ấp ủ “mầm sống yêu
                        thương” rồi đấy! Trong tuần đầu...
                    </Text>
                </View>
                <TouchableOpacity style={styles.moreContainer}>
                    <Text style={styles.more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line} />

            <View>
                <View style={styles.itemHeaderContainer}>
                    <Image source={Images.PregnancyBaby} style={styles.iconItemHeader} />
                    <Text style={styles.titleItemHeader}>Bé yêu</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>
                        Chào mẹ, vậy là mẹ đã chính thức vào tuần đầu tiên của hành trình 40 tuần ấp ủ “mầm sống yêu
                        thương” rồi đấy! Trong tuần đầu...
                    </Text>
                </View>
                <TouchableOpacity style={styles.moreContainer}>
                    <Text style={styles.more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderContent = () => (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}>
            {renderContentHeader()}
            {renderItems()}
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default PregnancyWeekByWeekScreen;

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
            paddingTop: scales(15),
        },
        contentContentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        weekContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        week: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(3),
            marginRight: scales(5),
        },
        textTime: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        itemContainer: {
            marginTop: scales(20),
        },
        imageWeek: {
            width: Sizes.scrWidth - scales(30),
            height: scales(180),
            borderRadius: 6,
        },
        itemHeaderContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scales(10),
        },
        iconItemHeader: {
            width: scales(25),
            height: scales(25),
            marginRight: scales(10),
        },
        titleItemHeader: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        descContainer: {
            marginLeft: scales(25),
            marginTop: scales(8),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        moreContainer: {
            marginTop: scales(8),
            marginBottom: scales(12),
        },
        more: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            textAlign: 'right',
        },
        line: {
            borderWidth: 0.5,
            borderColor: color.Text_Dark_5,
        },
    });
};
