import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { goToFetalHealthAnalysis, goToFetalHealthInfo } from './src/utils';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { s, scales } from 'utils/scales';

const FetalHealthScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeaderRight = () => (
        <View style={styles.rightContainer}>
            <Text style={styles.plus}>+</Text>
        </View>
    );

    const renderHeader = () => (
        <Header title="Sức khỏe thai nhi" iconRight={renderHeaderRight()} onPressRight={goToFetalHealthInfo} />
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.image} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
            <Button title="Nhập dữ liệu" customStyles={styles.buttonEnterData} />
            <Text style={styles.fetchData}>Lấy dữ liệu khám định kỳ</Text>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            <View style={styles.contentHeader}>
                <Text style={styles.leftHeader}>Cân nặng</Text>
                <Text style={styles.midHeader}>3000 Gram</Text>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusTxt}>Thấp</Text>
                </View>
            </View>
            <View style={styles.weekContainer}>
                <Text style={styles.txtWeek}>Tuần thai: </Text>
                <Text style={styles.week}>39 tuần</Text>
            </View>
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Chiều dài (CRL)</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusTxt}>Thấp</Text>
                    </View>
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#80F1A6', '#EFBA00', '#EFBA00']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    <Text style={styles.dotValue}>300 mm</Text>
                    <View style={styles.dot} />
                </View>
            </View>
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Đường kính lưỡng đỉnh (BPD)</Text>
                    <View style={[styles.statusContainer, { backgroundColor: getThemeColor().Color_Green }]}>
                        <Text style={styles.statusTxt}>Bình thường</Text>
                    </View>
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#80F1A6', '#EFBA00', '#EFBA00']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    <Text style={styles.dotValue}>300 mm</Text>
                    <View style={styles.dot} />
                </View>
            </View>
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Chiều dài xương đùi (FL)</Text>
                    <View style={[styles.statusContainer, { backgroundColor: getThemeColor().red }]}>
                        <Text style={styles.statusTxt}>Cao</Text>
                    </View>
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#80F1A6', '#EFBA00', '#EFBA00']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    <Text style={styles.dotValue}>300 mm</Text>
                    <View style={styles.dot} />
                </View>
            </View>

            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Chu vi đầu (HC)</Text>
                    <View style={[styles.statusContainer, { backgroundColor: getThemeColor().red }]}>
                        <Text style={styles.statusTxt}>Cao</Text>
                    </View>
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#80F1A6', '#EFBA00', '#EFBA00']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    <Text style={styles.dotValue}>300 mm</Text>
                    <View style={styles.dot} />
                </View>
            </View>
        </View>
    );

    const renderButton = () => (
        <Button title="Phân tích" onPress={goToFetalHealthAnalysis} customStyles={styles.button} />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView>{renderContent()}</ScrollView>
            {renderButton()}
        </View>
    );
};

export default FetalHealthScreen;

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
        image: {
            width: scales(200),
            height: scales(200),
        },
        emptyContainer: {
            alignItems: 'center',
        },
        noData: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_2,
        },
        buttonEnterData: {
            paddingHorizontal: scales(40),
            marginVertical: scales(30),
        },
        fetchData: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Color_Primary,
        },
        rightContainer: {
            backgroundColor: color.Color_Primary,
            width: scales(25),
            height: scales(25),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
        },
        leftHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
        },
        midHeader: {
            ...Fonts.inter700,
            fontSize: scales(18),
            color: color.Text_Dark_1,
        },
        statusContainer: {
            backgroundColor: color.Color_Blue2,
            borderRadius: scales(8),
            paddingVertical: scales(5),
            paddingHorizontal: scales(8),
        },
        statusTxt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.white,
        },
        pointContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: scales(15),
        },
        pointTxt: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        txtWeek: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        week: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        plus: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.white,
        },
        contentHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scales(15),
        },
        weekContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scales(20),
        },
        button: {
            marginBottom: Sizes.bottomSpace + scales(5),
            marginHorizontal: scales(15),
        },
        linearGradient: {
            borderRadius: 5,
            height: scales(5),
        },
        dot: {
            position: 'absolute',
            bottom: 0,
            top: -scales(2),
            left: scales(10),
            width: scales(10),
            height: scales(10),
            backgroundColor: color.red,
            borderRadius: scales(10),
        },
        dotValue: {
            position: 'absolute',
            bottom: scales(5),
        },
        progress: {
            marginTop: scales(20),
        },
    });
};
