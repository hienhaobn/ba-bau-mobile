import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { goToFoods } from 'screens/foods/src/utils';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const NutritionalRegimenScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => (
        <Header
            title="Chế độ dinh dưỡng"
            iconRight={<SvgIcons.IcSave width={scales(17)} height={scales(17)} color={getThemeColor().Text_Dark_1} />}
        />
    );

    const renderInputSearch = () => <Input placeholder="Tên thực phẩm, thành phần chính" />;

    const renderContentFoods = () => (
        <View style={styles.contentFoodContainer}>
            <Text style={styles.titleContent}>Nhóm thực phẩm</Text>
            <View style={styles.rowItems}>
                <TouchableOpacity style={styles.itemContentFoodContainer} onPress={goToFoods}>
                    <View style={styles.imgContentFoodItemContainer}>
                        <Image source={Images.Meat} style={styles.imgContentFoodItem} resizeMode="contain" />
                    </View>
                    <Text style={styles.itemContentFoodText}>Thịt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentFoodContainer} onPress={goToFoods}>
                    <View style={styles.imgContentFoodItemContainer}>
                        <Image source={Images.Seafood} style={styles.imgContentFoodItem} resizeMode="contain" />
                    </View>
                    <Text style={styles.itemContentFoodText}>Thủy hải sản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentFoodContainer} onPress={goToFoods}>
                    <View style={styles.imgContentFoodItemContainer}>
                        <Image source={Images.OrganicFood} style={styles.imgContentFoodItem} resizeMode="contain" />
                    </View>
                    <Text style={styles.itemContentFoodText}>Rau củ</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.rowItems, styles.rowBottom]}>
                <TouchableOpacity style={styles.itemContentFoodContainer} onPress={goToFoods}>
                    <View style={styles.imgContentFoodItemContainer}>
                        <Image source={Images.Vegetable} style={styles.imgContentFoodItem} resizeMode="contain" />
                    </View>
                    <Text style={styles.itemContentFoodText}>Trái cây</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentFoodContainer} onPress={goToFoods}>
                    <View style={styles.imgContentFoodItemContainer}>
                        <Image source={Images.FastFoods} style={styles.imgContentFoodItem} resizeMode="contain" />
                    </View>
                    <Text style={styles.itemContentFoodText}>Ăn vặt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentFoodContainer} onPress={goToFoods}>
                    <View style={styles.imgContentFoodItemContainer}>
                        <Image source={Images.Drink} style={styles.imgContentFoodItem} resizeMode="contain" />
                    </View>
                    <Text style={styles.itemContentFoodText}>Đồ uống</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.rowItems, styles.rowBottom]}>
                <TouchableOpacity style={styles.itemContentFoodContainer} onPress={goToFoods}>
                    <View style={styles.imgContentFoodItemContainer}>
                        <Image source={Images.Vegetable} style={styles.imgContentFoodItem} resizeMode="contain" />
                    </View>
                    <Text style={styles.itemContentFoodText}>Thực phẩm bổ sung</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentFoodContainer} onPress={goToFoods}>
                    <View style={styles.imgContentFoodItemContainer}>
                        <Image source={Images.FastFoods} style={styles.imgContentFoodItem} resizeMode="contain" />
                    </View>
                    <Text style={styles.itemContentFoodText}>Hạt, Ngũ cốc</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentFoodContainer} onPress={goToFoods}>
                    <View style={styles.imgContentFoodItemContainer}>
                        <Image source={Images.Drink} style={styles.imgContentFoodItem} resizeMode="contain" />
                    </View>
                    <Text style={styles.itemContentFoodText}>Thực phẩm từ sữa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderContent = () => (
        <ScrollView
            style={styles.wrapperContent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            {renderInputSearch()}
            {renderContentFoods()}
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default NutritionalRegimenScreen;

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
        imageItemSuitable: {
            width: scales(50),
            height: scales(50),
            borderRadius: scales(8),
        },
        itemSuitableContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: scales(15),
        },
        titleItemSuitable: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(10),
        },
        titleContent: {
            ...Fonts.inter700,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginVertical: scales(10),
        },
        contentFoodContainer: {
            marginTop: scales(10),
        },
        imgContentFoodItemContainer: {
            backgroundColor: color.Color_Bg,
            padding: scales(10),
            borderRadius: 999,

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        imgContentFoodItem: {
            width: scales(40),
            height: scales(40),
        },
        itemContentFoodContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            // width: (Sizes.scrWidth - scales(30)) / 3,
        },
        itemContentFoodText: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(15),
            textAlign: 'center',
            width: (Sizes.scrWidth - scales(30)) / 4,
        },
        rowItems: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        rowBottom: {
            marginTop: scales(30),
        },
    });
};
