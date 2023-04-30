import React, { useRef } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import PrenatalCareCheckupsConfirmPremium, { IPrenatalCareCheckupsConfirmPremiumRef } from './src/components/PrenatalCareCheckupsConfirmPremium';
import { goToAddPrenatalCareCheckupsStep1, goToPrenatalCareCheckupsChartMom, goToRoutineCheckups } from './src/utils';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PrenatalCareCheckupsScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const refPrenatalCareCheckupsConfirmPremium = useRef<IPrenatalCareCheckupsConfirmPremiumRef>(null);

    const onOpenConfirm = () => {
        refPrenatalCareCheckupsConfirmPremium.current.showModal();
    }

    const renderHeader = () => <Header title="Lịch khám thai" />;

    const renderContentHeader = () => (
        <View style={styles.contentHeaderContainer}>
            <TouchableOpacity style={styles.itemHeaderContainer} onPress={goToRoutineCheckups}>
                <View style={styles.imageContainer}>
                    <Image source={Images.Calendar1} style={styles.imgItem} />
                </View>
                <Text style={styles.itemText}>Lịch khám định kỳ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemHeaderContainer} onPress={goToPrenatalCareCheckupsChartMom}>
                <View style={styles.imageContainer}>
                    <Image source={Images.PieChart} style={styles.imgItem} />
                </View>
                <Text style={styles.itemText}>Biểu đồ của mẹ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemHeaderContainer} onPress={onOpenConfirm}>
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
            <TouchableOpacity style={styles.iconPlusContainer} onPress={goToAddPrenatalCareCheckupsStep1}>
                <Text style={styles.iconPlus}>+</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = () => (
        <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.titleItem}>Lần khám thai thứ 1</Text>
            <View style={styles.row}>
                <Text style={styles.titleLeft}>
                    Tuần thai: <Text style={styles.textBold}>39 tuần</Text>
                </Text>
                <Text style={styles.valueRight}>
                    Chiều dài: <Text style={styles.textBold}>2 mm</Text>
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.titleLeft}>
                    Cân nặng của mẹ: <Text style={styles.textBold}>57kg</Text>
                </Text>
                <Text style={styles.valueRight}>
                    Cân nặng của bé: <Text style={styles.textBold}>2gr</Text>
                </Text>
            </View>
            <View style={styles.itemDate}>
                <SvgIcons.IcDateRange width={scales(17)} height={scales(17)} color={getThemeColor().Text_Dark_1} />
                <Text style={styles.dateText}>19/03/2023</Text>
            </View>

            <View style={styles.line} />
        </TouchableOpacity>
    );

    const renderContent = () => (
        <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
        />
    );
    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContentHeader()}
            {renderHeaderPrenatalCareHistory()}
            {renderContent()}
            <PrenatalCareCheckupsConfirmPremium ref={refPrenatalCareCheckupsConfirmPremium} />
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
        wrapperContent: {
            flexGrow: 1,
            paddingHorizontal: scales(15),
        },
        contentContainer: {
            paddingBottom: scales(30),
            paddingTop: scales(15),
        },
        contentHeaderContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: scales(20),
            marginHorizontal: scales(15),
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
            marginVertical: scales(20),
            marginHorizontal: scales(15),
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
            marginBottom: scales(10),
        },
        titleItem: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(5),
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: scales(5),
        },
        titleLeft: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        valueRight: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        itemDate: {
            flexDirection: 'row',
            marginBottom: scales(10),
            marginTop: scales(5),
        },
        dateText: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(8),
        },
        textBold: {
            ...Fonts.inter600,
        },
    });
};
