import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { useTheme } from 'hooks/useTheme';

import { useMovementSelector } from 'states/fetal/hooks';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { fetchMovementFromDateToDate } from '../../../../states/fetal/fetchFetalMovement';

const FetalMovementChartDayScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const first = moment().subtract(5, 'days').toDate();
    const second = moment().subtract(4, 'days').toDate();
    const third = moment().subtract(3, 'days').toDate();
    const fourth = moment().subtract(2, 'days').toDate();
    const fifth = moment().subtract(1, 'days').toDate();
    const sixth = moment().toDate();

    const [dateSelected, setDateSelected] = useState<string>(sixth.getDate().toString());
    const [movements, setMovements] = useState<fetal.FetalMovement[]>([]);

    const getMovements = async () => {
        const response = await fetchMovementFromDateToDate({ from: first, to: sixth })
        setMovements(response);
    };

    useEffect(() => {
        getMovements();
    }, []);

    const getData = (currentDate: number) => {
        let count = 0;
        if (movements?.length) {
            movements?.map((element) => {
                const date = moment(element.date).format('YYYY-MM-DD').split('-')[2];
                if (currentDate === parseInt(date)) {
                    count += element.count;
                }
            });
        }
        return count;
    };

    const barData = [
        {
            value: getData(first.getDate()),
            label: `${first.getDate()}/${first.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(first.getDate())}
                </Text>
            ),
        },
        {
            value: getData(second.getDate()),
            label: `${second.getDate()}/${second.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(second.getDate())}
                </Text>
            ),
        },
        {
            value: getData(third.getDate()),
            label: `${third.getDate()}/${third.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(third.getDate())}
                </Text>
            ),
        },
        {
            value: getData(fourth.getDate()),
            label: `${fourth.getDate()}/${fourth.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(fourth.getDate())}
                </Text>
            ),
        },
        {
            value: getData(fifth.getDate()),
            label: `${fifth.getDate()}/${fifth.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(fifth.getDate())}
                </Text>
            ),
        },
        {
            value: getData(sixth.getDate()),
            label: `${sixth.getDate()}/${sixth.getMonth() + 1}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getData(sixth.getDate())}
                </Text>
            ),
        },
    ];

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
            barWidth={scales(20)}
            rotateLabel
            onPress={(element) => {
                const splitDateSelect = element.label.split('/');
                setDateSelected(splitDateSelect[0]);
            }}
        />
    );

    const getDataHistory = ()  => {
        const movementInDate = movements?.
        filter(element => element?.date
            .split('/')[0]
            .includes(dateSelected))
            .slice(0, 6);
        return movementInDate;
    };

    const renderMovementHistory = () => {
        // const historyData = getDataHistory();
        const historyData = movements;
        if (!historyData?.length) {
            return (
                <View style={styles.movementHistoryContainer}>
                    <View style={styles.itemMovementHistoryContainer}>
                        <Text style={styles.movementHistoryTitle}>Ngày</Text>
                        <Text style={styles.movementHistoryValue}>0</Text>
                    </View>
                    <View style={styles.itemMovementHistoryContainer}>
                        <Text style={styles.movementHistoryTitle}>Giờ bắt đầu</Text>
                        <Text style={styles.movementHistoryValue}>0</Text>
                    </View>
                    <View style={styles.itemMovementHistoryContainer}>
                        <Text style={styles.movementHistoryTitle}>Thời gian đếm</Text>
                        <Text style={styles.movementHistoryValue}>0</Text>
                    </View>
                    <View style={styles.itemMovementHistoryContainer}>
                        <Text style={styles.movementHistoryTitle}>Số cử động</Text>
                        <Text style={styles.movementHistoryValue}>0</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.movementHistoryContainer}>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Ngày</Text>
                    {historyData?.map((element) => {
                        const value = moment(element.date).format('DD/MM');
                        return (
                            <Text
                                style={styles.movementHistoryValue}
                                key={element._id}>{value}</Text>
                        );
                    })}
                </View>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Giờ bắt đầu</Text>
                    {historyData?.map((element) => (
                        <Text style={styles.movementHistoryValue} key={element._id}>
                            {element.timeStart}
                        </Text>
                    ))}
                </View>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Thời gian đếm</Text>
                    {historyData?.map((element) => (
                        <Text style={styles.movementHistoryValue} key={element._id}>
                            {element.timeCount}
                        </Text>
                    ))}
                </View>
                <View style={styles.itemMovementHistoryContainer}>
                    <Text style={styles.movementHistoryTitle}>Số cử động</Text>
                    {historyData?.map((element) => (
                        <Text style={styles.movementHistoryValue} key={element._id}>
                            {element.count}
                        </Text>
                    ))}
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {renderChartView()}
                {renderMovementHistory()}
            </ScrollView>

        </View>
    );
};

export default FetalMovementChartDayScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            marginHorizontal: scales(15),
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
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
            backgroundColor: color.Color_Primary2,
            paddingHorizontal: scales(10),
        },
    });
};
