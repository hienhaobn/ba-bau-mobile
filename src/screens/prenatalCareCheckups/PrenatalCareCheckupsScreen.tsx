import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PrenatalCareCheckupsScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Lịch khám thai" />;

    const renderContentHeader = () => (
        <View style={styles.contentHeaderContainer}>
            <TouchableOpacity style={styles.itemHeaderContainer}>
                <View style={styles.imageContainer}>
                    <Image source={Images.Calendar1} style={styles.imgItem} />
                </View>
                <Text style={styles.itemText}>Lịch khám định kỳ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemHeaderContainer}>
                <View style={styles.imageContainer}>
                    <Image source={Images.PieChart} style={styles.imgItem} />
                </View>
                <Text style={styles.itemText}>Biểu đồ của mẹ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemHeaderContainer}>
                <View style={styles.imageContainer}>
                    <Image source={Images.Stats} style={styles.imgItem} />
                </View>
                <Text style={styles.itemText}>Biểu đồ của thai nhi</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeaderPrenatalCareHistory = () => (
        <View style={styles.headerHistoryContainer}>
            <Text style={styles.titleHistory}>Lịch sử khám thai</Text>
            <TouchableOpacity style={styles.iconPlusContainer}>
                <Text style={styles.iconPlus}>+</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = () => (
        <View style={styles.itemContainer}>
            <Text style={styles.titleItem}>Lần khám thai thứ 1</Text>
            <View style={styles.row}>
                <Text style={styles.titleLeft}>Tuần thai: 39 tuần</Text>
                <Text style={styles.valueRight}>Chiều dài: 2 mm</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.titleLeft}>Cân nặng của mẹ: 57kg</Text>
                <Text style={styles.valueRight}>Cân nặng của bé: 2gr</Text>
            </View>
            <View style={styles.line} />
        </View>
    );

    const renderPrenatalCareHistory = () => (
        <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
            ListHeaderComponent={renderHeaderPrenatalCareHistory()}
            ListHeaderComponentStyle={{ marginTop: scales(20) }}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
        />
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderContentHeader()}
            {renderPrenatalCareHistory()}
        </View>
    );
    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default PrenatalCareCheckupsScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            flexGrow: 1,
            marginHorizontal: scales(15),
        },
        contentHeaderContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: scales(20),
        },
        imageContainer: {
            backgroundColor: color.Color_Bg,
            padding: scales(15),
            borderRadius: 999,

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        imgItem: {
            width: scales(30),
            height: scales(30),
        },
        itemHeaderContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            width: (Sizes.scrWidth - scales(30)) / 3,
        },
        itemText: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(15),
            textAlign: 'center',
            width: (Sizes.scrWidth - scales(30)) / 4,
        },
        headerHistoryContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        iconPlusContainer: {
            backgroundColor: color.Color_Primary,
            width: scales(25),
            height: scales(25),
            borderRadius: 9999,
            justifyContent: 'center',
            alignItems: 'center',
        },
        iconPlus: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.white,
        },
        line: {
            borderWidth: 0.5,
            borderColor: color.Text_Dark_4,
        },
        titleHistory: {
            ...Fonts.inter700,
            fontSize: scales(16),
            color: color.Text_Dark_1,
        },
        itemContainer: {
            marginVertical: scales(10),
        },
        titleItem: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        titleLeft: {},
        valueRight: {},
    });
};
