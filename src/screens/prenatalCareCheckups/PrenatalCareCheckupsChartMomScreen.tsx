import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { fetchMomCheckupsHistory } from 'states/user/fetchCheckups';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PrenatalCareCheckupsChartMomScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [data, setData] = useState<user.MomCheckupsResponse[]>([]);
    const first = moment().subtract(5, 'days').toDate();
    const second = moment().subtract(4, 'days').toDate();
    const third = moment().subtract(3, 'days').toDate();
    const fourth = moment().subtract(2, 'days').toDate();
    const fifth = moment().subtract(1, 'days').toDate();
    const sixth = moment().toDate();

    const getData = async () => {
        const res = await fetchMomCheckupsHistory();
        if (res) {
            setData(res);
        }
    };

    const getDataChart = (currentDate: number) => {
        let count = 0;
        if (data?.length) {
            data?.map((element) => {
                const date = parseInt(element.createdAt.split('-')[2]);
                if (currentDate === date) {
                    count += element.weight;
                }
            });
        }
        return count;
    };

    useEffect(() => {
        console.log('response', data);
    }, [data]);

    useEffect(() => {
        getData();
    }, []);

    const barData = [
        {
            value: getDataChart(first.getDate()),
            label: `${first.getDate()}/${first.getMonth()}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getDataChart(first.getDate())}
                </Text>
            ),
        },
        {
            value: getDataChart(second.getDate()),
            label: `${second.getDate()}/${second.getMonth()}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getDataChart(second.getDate())}
                </Text>
            ),
        },
        {
            value: getDataChart(third.getDate()),
            label: `${third.getDate()}/${third.getMonth()}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getDataChart(third.getDate())}
                </Text>
            ),
        },
        {
            value: getDataChart(fourth.getDate()),
            label: `${fourth.getDate()}/${fourth.getMonth()}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getDataChart(fourth.getDate())}
                </Text>
            ),
        },
        {
            value: getDataChart(fifth.getDate()),
            label: `${fifth.getDate()}/${fifth.getMonth()}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getDataChart(fifth.getDate())}
                </Text>
            ),
        },
        {
            value: getDataChart(sixth.getDate()),
            label: `${sixth.getDate()}/${sixth.getMonth()}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getDataChart(sixth.getDate())}
                </Text>
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
