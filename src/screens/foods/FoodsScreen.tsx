import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { goToFoodDetail } from './src/utils';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const FoodsScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Thực phẩm" />;

    const renderContent = () => (
        <View>
            <Text style={styles.desc}>
                Là nguồn thực phẩm chứa nhiều protein, chất béo và các axit amin cần thiết giúp cung cấp nguồn năng
                lượng dồi dào cho các hoạt động thường ngày của mẹ và đóng vai trò quan trọng trong việc hình thành và
                phát triển của thai nhi.
            </Text>
            <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={goToFoodDetail}>
                <View style={styles.row}>
                    <Image source={Images.Beef} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Thịt bò</Text>
                        <Text style={styles.itemContentDesc}>
                            Sắt, kẽm, natri, vitamin D, vitamin B6, vitamin B12, magie
                        </Text>
                    </View>
                </View>
                <View style={styles.itemFooter}>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcTickGreen />
                        <Text style={styles.month}>3 tháng đầu</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcCloseRed />
                        <Text style={styles.month}>3 tháng giữa</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcWarning />
                        <Text style={styles.month}>3 tháng cuối</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={goToFoodDetail}>
                <View style={styles.row}>
                    <Image source={Images.Beef} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Thịt bò</Text>
                        <Text style={styles.itemContentDesc}>
                            Sắt, kẽm, natri, vitamin D, vitamin B6, vitamin B12, magie
                        </Text>
                    </View>
                </View>
                <View style={styles.itemFooter}>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcTickGreen />
                        <Text style={styles.month}>3 tháng đầu</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcCloseRed />
                        <Text style={styles.month}>3 tháng giữa</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcWarning />
                        <Text style={styles.month}>3 tháng cuối</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={goToFoodDetail}>
                <View style={styles.row}>
                    <Image source={Images.Beef} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Thịt bò</Text>
                        <Text style={styles.itemContentDesc}>
                            Sắt, kẽm, natri, vitamin D, vitamin B6, vitamin B12, magie
                        </Text>
                    </View>
                </View>
                <View style={styles.itemFooter}>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcTickGreen />
                        <Text style={styles.month}>3 tháng đầu</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcCloseRed />
                        <Text style={styles.month}>3 tháng giữa</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcWarning />
                        <Text style={styles.month}>3 tháng cuối</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={goToFoodDetail}>
                <View style={styles.row}>
                    <Image source={Images.Beef} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Thịt bò</Text>
                        <Text style={styles.itemContentDesc}>
                            Sắt, kẽm, natri, vitamin D, vitamin B6, vitamin B12, magie
                        </Text>
                    </View>
                </View>
                <View style={styles.itemFooter}>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcTickGreen />
                        <Text style={styles.month}>3 tháng đầu</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcCloseRed />
                        <Text style={styles.month}>3 tháng giữa</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcWarning />
                        <Text style={styles.month}>3 tháng cuối</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={goToFoodDetail}>
                <View style={styles.row}>
                    <Image source={Images.Beef} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Thịt bò</Text>
                        <Text style={styles.itemContentDesc}>
                            Sắt, kẽm, natri, vitamin D, vitamin B6, vitamin B12, magie
                        </Text>
                    </View>
                </View>
                <View style={styles.itemFooter}>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcTickGreen />
                        <Text style={styles.month}>3 tháng đầu</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcCloseRed />
                        <Text style={styles.month}>3 tháng giữa</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcWarning />
                        <Text style={styles.month}>3 tháng cuối</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={goToFoodDetail}>
                <View style={styles.row}>
                    <Image source={Images.Beef} style={styles.image} />
                    <View style={styles.itemContent}>
                        <Text style={styles.itemContentHeader}>Thịt bò</Text>
                        <Text style={styles.itemContentDesc}>
                            Sắt, kẽm, natri, vitamin D, vitamin B6, vitamin B12, magie
                        </Text>
                    </View>
                </View>
                <View style={styles.itemFooter}>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcTickGreen />
                        <Text style={styles.month}>3 tháng đầu</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcCloseRed />
                        <Text style={styles.month}>3 tháng giữa</Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <SvgIcons.IcWarning />
                        <Text style={styles.month}>3 tháng cuối</Text>
                    </View>
                </View>
            </TouchableOpacity>
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

export default FoodsScreen;

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
            lineHeight: scales(17),
            marginBottom: scales(15),
        },
        image: {
            width: scales(50),
            height: scales(50),
        },
        itemContentContainer: {
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
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        row: {
            flexDirection: 'row',
        },
        monthContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        month: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(5),
        },
        itemFooter: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scales(10),
            paddingTop: scales(10),
            borderTopWidth: 0.2,
            borderTopColor: color.Text_Dark_5,
        },
    });
};
