/* eslint-disable complexity */
import { RouteProp } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import PrenatalCareCheckupsHealthyIndex from './src/components/PrenatalCareCheckupsHealthyIndex';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { fetchBabyCheckupsHistory, fetchMomCheckupsHistory } from 'states/user/fetchCheckups';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IPrenatalCareCheckupsChartMomScreenProps {
    route: RouteProp<RootNavigatorParamList, 'PrenatalCareCheckupsChartMom'>;
}

const PrenatalCareCheckupsChartMomScreen = (props: IPrenatalCareCheckupsChartMomScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    // const [data, setData] = useState<user.MomCheckupsResponse[]>([]);
    const [history, setHistory] = useState<user.CheckupsScheduleHistoryResponse>(null);
    const [healthyIndex, setHealthyIndex] = useState<number>(new Date(moment().format('YYYY-MM-DD')).getTime());

    const first = moment().subtract(5, 'days').toDate();
    const second = moment().subtract(4, 'days').toDate();
    const third = moment().subtract(3, 'days').toDate();
    const fourth = moment().subtract(2, 'days').toDate();
    const fifth = moment().subtract(1, 'days').toDate();
    const sixth = moment().toDate();

    const getData = async () => {
        // const res = await fetchMomCheckupsHistory();
        const res = await fetchBabyCheckupsHistory();
        if (res) {
            setHistory(res);
        }
    };

    const getValueChart = (currentDate: number) => {
        let count = 0;
        let index = 0;
        if (history?.data?.length) {
            history?.data?.map((element, i) => {
                const date = parseInt(element?.child?.pregnancyExam?.split('-')[2]);
                if (currentDate === date) {
                    count += element?.momId?.weight;
                    index++;
                }
            });
        }
        return index > 0 ? BigNumber(count).div(index).toNumber() : 0;
    };

    const getOnlyElementChart = () => {
        const defaultValue = {
            bloodPressure: 0,
            commonDiseases: '',
            createdAt: '',
            eating1hGlycemicIndex: 0,
            eating2hGlycemicIndex: 0,
            fastingGlycemicIndex: 0,
            idAccount: '',
            note: '',
            updatedAt: '',
            weeksOfPregnacy: '',
            weight: 0,
            _id: '',
            pregnancyExam: '',
        }
        if (history?.data?.length) {
            let tmp;
            const arrFilter = history?.data?.filter((element, index) => {
                const dateCompare = new Date(element?.child?.pregnancyExam.split('T')[0]).getTime();
                return dateCompare === healthyIndex;
            });
            arrFilter.sort((a, b) => {
                return new Date(b.momId.createdAt).getTime() - new Date(a.momId.createdAt).getTime();
            });
            if (arrFilter.length > 0) {
                tmp = arrFilter[0].momId;
            } else {
                tmp = defaultValue;
            }
            return tmp;
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const formatTime = (value: string) => {
        if (parseInt(value) < 10) {
            return `0${value}`;
        }
        return value;
    };

    const barData = [
        {
            value: getValueChart(first.getDate()) || 0,
            label: `${first.getDate()}-${first.getMonth() + 1 || '0'}`  || '0',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(first.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(second.getDate()) || 0,
            label: `${second.getDate()}-${second.getMonth() + 1 || '0'}` || '0',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(second.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(third.getDate()) || 0,
            label: `${third.getDate()}-${third.getMonth() + 1 || '0'}` || '0',
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(third.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(fourth.getDate()) || 0,
            label: `${fourth.getDate()}-${fourth.getMonth() + 1 || '0'}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(fourth.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(fifth.getDate()) || 0,
            label: `${fifth.getDate()}-${fifth.getMonth() + 1 || '0'}`,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(fifth.getDate())}
                </Text>
            ),
        },
        {
            value: getValueChart(sixth.getDate()) || 0,
            label: `${sixth.getDate()}-${sixth.getMonth() + 1 || '0'}` ,
            labelWidth: 50,
            topLabelComponent: () => (
                <Text style={{ color: getThemeColor().Text_Dark_1, fontSize: 14, marginBottom: 6 }}>
                    {getValueChart(sixth.getDate())}
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
                onPress={(element) => {
                    barData.map((el) => {
                        if (el.label.includes(element.label)) {
                            const splitDay = el.label.split('-');
                            const selectDate = new Date(`${moment().get('year')}-${formatTime(splitDay[1])}-${formatTime(splitDay[0])}`).getTime();
                            setHealthyIndex(selectDate);
                        }
                    });
                }}
            />
        </View>
    );

    const renderPregnancyWeekByWeek = () => (
        <View style={styles.pregnancyWeekContainer}>
            {/* <View style={styles.weekContainer}>
                <Text style={styles.headerTitle}>Tuần thai: </Text>
                <Text style={styles.week}>{} tuần</Text>
            </View> */}
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
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {renderContent()}
                <PrenatalCareCheckupsHealthyIndex data={getOnlyElementChart()} />
            </ScrollView>
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
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
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
