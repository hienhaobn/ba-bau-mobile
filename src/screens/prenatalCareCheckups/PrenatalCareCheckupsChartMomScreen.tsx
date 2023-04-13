import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PrenatalCareCheckupsChartMomScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const barData = [
        {
            value: 250,
            label: '21/8',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 500,
            label: '22/8',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 745,
            label: '23/8',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 320,
            label: '24/8',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 600,
            label: '25/8',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 256,
            label: '26/8',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
    ];

    const renderChart = () => (
        <View style={styles.chartContainer}>
            <Text style={styles.headerTitle}>Cân nặng</Text>
            <BarChart
                noOfSections={3}
                frontColor={getThemeColor().Color_Primary2}
                roundedTop
                roundedBottom
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
                hideRules
                backgroundColor={getThemeColor().Color_Bg}
                activeOpacity={1}
                width={Sizes.scrWidth}
                xAxisLabelTextStyle={{
                    ...Fonts.inter600,
                    color: getThemeColor().Text_Dark_1,
                    fontSize: scales(12),
                }}
                rotateLabel
            />
        </View>
    );

    const renderPregnancyWeekByWeek = () => (
        <View style={styles.pregnancyWeekContainer}>
            <View style={styles.weekContainer}>
                <Text style={styles.headerTitle}>Tuần thai: </Text>
                <Text style={styles.week}>39 tuần 4 ngày</Text>
            </View>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderChart()}
            {renderPregnancyWeekByWeek()}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Biểu đồ của mẹ" />
            {renderContent()}
        </View>
    );
};

export default PrenatalCareCheckupsChartMomScreen;

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
        chartContainer: {
            marginTop: scales(10),
        },
        headerTitle: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        week: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        pregnancyWeekContainer: {
            marginTop: scales(50),
        },
        weekContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });
};
