import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { goToFetalHealthAnalysis } from './src/utils';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const FetalHealthScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeaderRight = () => (
        <View style={styles.rightContainer}>
            <Text style={styles.plus}>+</Text>
        </View>
    );

    const renderHeader = () => <Header title="Sức khỏe thai nhi" iconRight={renderHeaderRight()} />;

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
                <Text>Cân nặng</Text>
                <Text>3000 Gram</Text>
                <View>
                    <Text>Thấp</Text>
                </View>
            </View>
            <View style={styles.weekContainer}>
                <Text>Tuần thai: </Text>
                <Text>39 tuần</Text>
            </View>
            <View>
                <Text>Chiều dài (CRL)</Text>
                {/* <LinearGradient
                    useAngle
                    angle={90}
                    start={{ x: 0, y: 1 }}
                    colors={['#80F1A6', '#EFBA00']}
                    style={styles.linearGradient}
                /> */}
                {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text />
                </LinearGradient> */}
            </View>
            {renderButton()}
        </View>
    );

    const renderButton = () => <Button title="Phân tích" onPress={goToFetalHealthAnalysis} />;

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
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
        plus: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.white,
        },
        contentHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        weekContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        linearGradient: {
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5,
        },
    });
};
