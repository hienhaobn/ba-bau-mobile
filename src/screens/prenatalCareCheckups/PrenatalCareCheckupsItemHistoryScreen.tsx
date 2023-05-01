import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { RouteProp } from '@react-navigation/native';
import { RootNavigatorParamList } from 'navigation/types';

interface IPrenatalCareCheckupsItemHistoryScreenProps {
    route: RouteProp<RootNavigatorParamList, 'PrenatalCareCheckupsItemHistory'>
}

const PrenatalCareCheckupsItemHistoryScreen = (props: IPrenatalCareCheckupsItemHistoryScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { child, momId } = route.params;

    const renderContent = () => (
        <View style={styles.content}>
            {/* Mom */}
            <View style={styles.infoContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.imgWomanContainer}>
                        <Image source={Images.Woman} style={styles.imgWoman} />
                    </View>
                    <Text style={styles.title}>Thông tin mẹ</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Cân nặng</Text>
                    <Text style={styles.valueItem}>{momId.weight} kg</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Huyết áp</Text>
                    <Text style={styles.valueItem}>{momId.bloodPressure}/90 mmHg</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Chỉ số đường huyết</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>+ Lúc đói</Text>
                    <Text style={styles.valueItem}>{momId.fastingGlycemicIndex} mmHg</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>+ Sau ăn 1h</Text>
                    <Text style={styles.valueItem}>{momId.eating1hGlycemicIndex} mmHg</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>+ Sau ăn 2h</Text>
                    <Text style={styles.valueItem}>{momId.eating2hGlycemicIndex} mmHg</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Các bệnh lý khác</Text>
                    <Text style={styles.valueItem}>{ momId.commonDiseases }</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Kết quả khám</Text>
                    <Text style={styles.valueItem}>{momId.note ? momId.note : 'Bình thường'}</Text>
                </View>
            </View>
            {/* baby */}
            <View style={styles.infoContainer}>
                <View style={styles.headerContainer}>
                    <Image source={Images.Pregnancy} style={styles.imgPregnancy} />
                    <Text style={[styles.title, { color: getThemeColor().Color_Blue }]}>Thông tin bé</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Chiều dài (CRL)</Text>
                    <Text style={styles.valueItem}>{child.femurLength}mm</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Đường kính lưỡng đỉnh (BPD)</Text>
                    <Text style={styles.valueItem}>{child.dualTopDiameter}mm</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Chiều dài xương đùi (FL)</Text>
                    <Text style={styles.valueItem}>{child.femurLength}mm</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Chu vi đầu (HC)</Text>
                    <Text style={styles.valueItem}>{child.headPerimeter}mm</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Cân nặng ước tính</Text>
                    <Text style={styles.valueItem}>{child.weight} gram</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Ngày khám 09/11/2022" />
            <ScrollView showsVerticalScrollIndicator={false}>{renderContent()}</ScrollView>
        </View>
    );
};

export default PrenatalCareCheckupsItemHistoryScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
        },
        imgWomanContainer: {
            backgroundColor: color.Color_Primary,
            width: scales(70),
            height: scales(70),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
        },
        imgWoman: {
            width: scales(50),
            height: scales(50),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(18),
            color: color.Color_Primary,
            marginLeft: scales(16),
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scales(12),
        },
        imgPregnancy: {
            width: scales(70),
            height: scales(70),
        },
        itemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: scales(12),
        },
        titleItem: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        valueItem: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        infoContainer: {
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
    });
};
