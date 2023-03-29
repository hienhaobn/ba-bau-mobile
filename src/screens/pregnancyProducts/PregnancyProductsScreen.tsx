import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import Input from 'components/Input';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const NutritionalRegimenScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => (
        <Header
            title="Sản phẩm cho mẹ bầu"
            iconRight={<SvgIcons.IcSave width={scales(17)} height={scales(17)} color={getThemeColor().Text_Dark_1} />}
        />
    );

    const renderInputSearch = () => (
        <View style={styles.searchContainer}>
            <Input placeholder="Nhập tên sản phẩm" />
        </View>
    );

    const renderItem = () => (
        <View style={styles.itemContainer}>
            <Image source={Images.Drink} style={styles.imageItem} />
            <View>
                <Text style={styles.itemTitle}>7 thuốc sắt cho mẹ bầu dễ hấp thu, không bị nóng</Text>
                <Text style={styles.itemDesc}>Trong quá trình mang thai, việc bổ sung ...</Text>
            </View>
        </View>
    );

    const renderContent = () => (
        <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            style={styles.wrapperContainer}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderInputSearch()}
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
        wrapperContainer: {
            flexGrow: 1,
            marginHorizontal: scales(15),
        },
        searchContainer: {
            marginHorizontal: scales(15),
        },
        imageItem: {
            width: scales(40),
            height: scales(40),
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scales(20),
        },
        itemTitle: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        itemDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
    });
};
