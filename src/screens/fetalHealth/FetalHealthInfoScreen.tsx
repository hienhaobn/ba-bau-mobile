import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { goToFetalHealthAnalysis } from './src/utils';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { s, scales } from 'utils/scales';

const FetalHealthInfoScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Thông tin thai nhi" />;

    const renderContent = () => (
        <View style={styles.content}>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Chiều dài (CRL)</Text>
                <Input placeholder="Kg" />
            </View>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Đường kính lưỡng đỉnh (BPD)</Text>
                <Input placeholder="mmHg" />
            </View>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Chiều dài xương đùi (FL)</Text>
                <Input placeholder="mmol/L" />
            </View>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Chu vi đầu (HC)</Text>
                <Input placeholder="mmol/L" />
            </View>
            <View style={styles.itemContentContainer}>
                <Text style={styles.itemTitleContent}>Cân nặng ước tính *</Text>
                <Input placeholder="mmol/L" />
            </View>
            {renderButton()}
        </View>
    );

    const renderButton = () => (
        <Button title="Phân tích" onPress={goToFetalHealthAnalysis} customStyles={styles.button} />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default FetalHealthInfoScreen;

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
        itemContentContainer: {
            marginBottom: scales(15),
        },
        itemTitleContent: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(5),
        },
        button: {
            marginTop: scales(20),
        },
    });
};
