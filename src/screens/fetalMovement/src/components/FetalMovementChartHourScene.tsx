import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const FetalMovementChartHourScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const barData = [
        {
            value: 250,
            label: '0-4h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 500,
            label: '4-8h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 745,
            label: '8-12h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 320,
            label: '12-16h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 600,
            label: '16-20h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
        {
            value: 256,
            label: '20-24h',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>50</Text>
            ),
        },
    ];

    const renderFilterDay = () => (
        <View style={styles.filterDayContainer}>
            <TouchableOpacity style={styles.itemFilterDayContainer}>
                <Text style={styles.filterDayValue}>CN</Text>
                <Text style={styles.filterDayValue}>26</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemFilterDayContainer}>
                <Text style={styles.filterDayValue}>T2</Text>
                <Text style={styles.filterDayValue}>27</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemFilterDayContainer}>
                <Text style={styles.filterDayValue}>T3</Text>
                <Text style={styles.filterDayValue}>28</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemFilterDayContainer}>
                <Text style={styles.filterDayValue}>T4</Text>
                <Text style={styles.filterDayValue}>29</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemFilterDayContainer}>
                <Text style={styles.filterDayValue}>T5</Text>
                <Text style={styles.filterDayValue}>30</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemFilterDayContainer}>
                <Text style={styles.filterDayValue}>T6</Text>
                <Text style={styles.filterDayValue}>31</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemFilterDayContainer}>
                <Text style={styles.filterDayValue}>T7</Text>
                <Text style={styles.filterDayValue}>01</Text>
            </TouchableOpacity>
        </View>
    );

    const renderChartView = () => (
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
    );

    const renderMovementHistory = () => (
        <View style={styles.movementHistoryContainer}>
            <View style={styles.itemMovementHistoryContainer}>
                <Text style={styles.movementHistoryTitle}>Ngày</Text>
                <Text style={styles.movementHistoryValue}>26/8</Text>
                <Text style={styles.movementHistoryValue}>26/8</Text>
                <Text style={styles.movementHistoryValue}>26/8</Text>
                <Text style={styles.movementHistoryValue}>26/8</Text>
                <Text style={styles.movementHistoryValue}>26/8</Text>
                <Text style={styles.movementHistoryValue}>26/8</Text>
            </View>
            <View style={styles.itemMovementHistoryContainer}>
                <Text style={styles.movementHistoryTitle}>Giờ bắt đầu</Text>
                <Text style={styles.movementHistoryValue}>09:41</Text>
                <Text style={styles.movementHistoryValue}>09:41</Text>
                <Text style={styles.movementHistoryValue}>09:41</Text>
                <Text style={styles.movementHistoryValue}>09:41</Text>
                <Text style={styles.movementHistoryValue}>09:41</Text>
                <Text style={styles.movementHistoryValue}>09:41</Text>
            </View>
            <View style={styles.itemMovementHistoryContainer}>
                <Text style={styles.movementHistoryTitle}>Thời gian đếm</Text>
                <Text style={styles.movementHistoryValue}>19’59</Text>
                <Text style={styles.movementHistoryValue}>19’59</Text>
                <Text style={styles.movementHistoryValue}>19’59</Text>
                <Text style={styles.movementHistoryValue}>19’59</Text>
                <Text style={styles.movementHistoryValue}>19’59</Text>
                <Text style={styles.movementHistoryValue}>19’59</Text>
            </View>
            <View style={styles.itemMovementHistoryContainer}>
                <Text style={styles.movementHistoryTitle}>Số cử động</Text>
                <Text style={styles.movementHistoryValue}>12</Text>
                <Text style={styles.movementHistoryValue}>12</Text>
                <Text style={styles.movementHistoryValue}>12</Text>
                <Text style={styles.movementHistoryValue}>12</Text>
                <Text style={styles.movementHistoryValue}>12</Text>
                <Text style={styles.movementHistoryValue}>12</Text>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            {renderFilterDay()}
            {renderChartView()}
            {renderMovementHistory()}
        </View>
    );
};

export default FetalMovementChartHourScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            marginHorizontal: scales(15),
        },
        movementHistoryContainer: {
            marginTop: scales(80),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        itemMovementHistoryContainer: {
            alignItems: 'center',
        },
        movementHistoryTitle: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(15),
        },
        movementHistoryValue: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(10),
        },
        filterDayContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: scales(30),
        },
        filterDayValue: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        itemFilterDayContainer: {
            borderRadius: scales(15),
            paddingVertical: scales(10),
            backgroundColor: color.Color_Primary,
            paddingHorizontal: scales(10),
        },
    });
};
