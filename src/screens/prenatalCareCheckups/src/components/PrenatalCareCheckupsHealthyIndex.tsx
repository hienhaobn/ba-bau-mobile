import BigNumber from 'bignumber.js';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IPrenatalCareCheckupsHealthyIndexProps {
    data: user.MomCheckupsResponse;
}

const PrenatalCareCheckupsHealthyIndex = (props: IPrenatalCareCheckupsHealthyIndexProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { data } = props;


    const getStatus = (value: number, min: number, max: number) => {
        if (BigNumber(min).eq(0) && BigNumber(value).lt(max)) {
            return (
                <View style={[styles.statusContainer, { backgroundColor: getThemeColor().Color_Blue }]}>
                    <Text style={styles.statusTxt}>Thấp</Text>
                </View>
            )
        }
        if (BigNumber(value).gt(max)) {
           return (
               <View style={[styles.statusContainer, { backgroundColor: getThemeColor().red }]}>
                   <Text style={styles.statusTxt}>Cao</Text>
               </View>
           )
        }
        if (BigNumber(value).lte(max) && BigNumber(value).gte(min)) {
            return  (
                <View style={[styles.statusContainer, { backgroundColor: getThemeColor().Color_Blue2 }]}>
                    <Text style={styles.statusTxt}>Bình thường</Text>
                </View>
            )
        }
    }

    const getDotPosition = (min: number, max: number, value: number) => {
        const baseValue = BigNumber(max).minus(min);
        const value1 = BigNumber(max).minus(value);
        if (value < min) {
            return 0;
        }
        if (value > max) {
            return Sizes.scrWidth - scales(40);
        }
        return BigNumber(1)
            .minus(BigNumber(value1).div(baseValue))
            .times(Sizes.scrWidth - scales(40))
            .toNumber();
    };

    const point = (min: number, max: number, value: number) => {
        if (value === min) {

        }
        if (value > min) {
            return getDotPosition(0, max + 30, value);
        } else {
            return getDotPosition(0, max + 120, value);
        }
    }

    const renderPregnancyWeekByWeek = () => (
        <View style={styles.weekContainer}>
            <Text style={styles.pointTxt}>Tuần thai: </Text>
            <Text style={styles.week}>{data.weeksOfPregnacy} tuần</Text>
        </View>
    );

    const renderDot = () => (
        <>
            <View style={{
                width: scales(10),
                height: scales(10),
                backgroundColor: getThemeColor().Color_Red_3,
                borderRadius: 100,
                zIndex: 1000,
            }} />
            <View
                style={{
                    width: scales(20),
                    height: scales(20),
                    backgroundColor: getThemeColor().Color_Red_4,
                    position: 'absolute',
                    left: scales(-5),
                    top: scales(-5),
                    borderRadius: 100,
                }}
            />
        </>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderPregnancyWeekByWeek()}
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Huyết áp</Text>
                    {getStatus(data.bloodPressure, 80, 130)}
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#F67EA4', '#F67EA4', '#F67EA4']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    <>
                        <Text style={[styles.dotValue, { left: point(0, 130 + 30, 130) || 0 }]}>
                            Max
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: point(0, 130 + 30, 130) || 0 }]}>
                            180
                        </Text>
                        <View style={[styles.dot, { left: point(0, 130 + 30, 130) || 0 }]}>
                            {renderDot()}
                        </View>
                    </>
                    {
                        !BigNumber(data.bloodPressure).eq(80) && (
                            <View>
                                <Text style={[styles.dotValue, { left: point(0, 130 + 30, 80) || 0 }]}>
                                    Min
                                </Text>
                                <Text style={[styles.dotValueMinMax, {  left: point(0, 130 + 30, 80) || 0 }]}>
                                    80
                                </Text>
                                <View style={[styles.dot, { left: point(0, 130 + 30, 80) || 0 }]} >
                                    {renderDot()}
                                </View>
                            </View>
                        )
                    }
                    <View>
                        <Text style={[styles.dotValue, { left: point(0, 130 + 30, 80) || 0 }]}>
                            {data.bloodPressure}
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: point(0, 130 + 30, 80) || 0 }]}>
                            mm
                        </Text>
                        <View style={[styles.dot, { left: point(0, 130 + 30, 80) || 0 }]} >
                            {renderDot()}
                        </View>
                    </View>

                </View>
            </View>
            <View>
                <View style={styles.pointContainer} />
            </View>
            <View>
                <Text style={styles.pointTxt}>Chỉ số đường huyết (mmol/L)</Text>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Lúc đói</Text>
                    {getStatus(data.fastingGlycemicIndex, 0, 130)}
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#F67EA4', '#F67EA4', '#F67EA4']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    {
                        !BigNumber(data.fastingGlycemicIndex).eq(130) && (
                            <View>
                                <Text style={[styles.dotValue, { left: point(0, 130 + 30, 130) || 0 }]}>
                                    Max
                                </Text>
                                <Text style={[styles.dotValueMinMax, {  left: point(0, 130 + 30, 130) || 0 }]}>
                                    130
                                </Text>
                                <View style={[styles.dot, { left: point(0, 130 + 30, 130) || 0 }]}>
                                    {renderDot()}
                                </View>
                            </View>
                        )
                    }
                    <View>
                        <Text style={[styles.dotValue, { left: point(0, 130 + 30, data.fastingGlycemicIndex) || 0 }]}>
                            {data.fastingGlycemicIndex}
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: point(0, 130 + 30, data.fastingGlycemicIndex) || 0 }]}>
                            mm
                        </Text>
                        <View style={[styles.dot, { left: point(0, 130 + 30, data.fastingGlycemicIndex) || 0 }]}>
                            {renderDot()}
                        </View>
                    </View>
                </View>
            </View>

            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Sau ăn 1h</Text>
                    {getStatus(data.eating1hGlycemicIndex, 0, 180)}
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#F67EA4', '#F67EA4', '#F67EA4']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>

                    {
                        !BigNumber(data.eating1hGlycemicIndex).eq(180) && (
                            <View>
                                <Text style={[styles.dotValue, { left: point(0, 180 + 30, 180) || 0 }]}>
                                    Max
                                </Text>
                                <Text style={[styles.dotValueMinMax, {  left: point(0, 180 + 30, 180) || 0 }]}>
                                    180
                                </Text>
                                <View style={[styles.dot, { left: point(0, 180 + 30, 180) || 0 }]}>
                                    {renderDot()}
                                </View>
                            </View>
                        )
                    }
                    <View>
                        <Text style={[styles.dotValue, { left: point(0, 180 + 30, data.eating1hGlycemicIndex) || 0 }]}>
                            {data.eating1hGlycemicIndex}
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: point(0, 180 + 30, data.eating1hGlycemicIndex) || 0 }]}>
                            mm
                        </Text>
                        <View style={[styles.dot, { left: point(0, 180 + 30, data.eating1hGlycemicIndex) || 0 }]}>
                            {renderDot()}
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Sau ăn 2h</Text>
                    {getStatus(data.eating2hGlycemicIndex, 0, 153)}
                </View>
                <View style={styles.progress}>
                    <LinearGradient
                        useAngle
                        angle={90}
                        start={{ x: 0, y: 1 }}
                        colors={['#F67EA4', '#F67EA4', '#F67EA4']}
                        style={styles.linearGradient}>
                        <Text />
                    </LinearGradient>
                    {
                        !BigNumber(data.eating2hGlycemicIndex).eq(153) && (
                            <View>
                                <Text style={[styles.dotValue, { left: point(0, 153 + 30, 153) || 0 }]}>
                                    Max
                                </Text>
                                <Text style={[styles.dotValueMinMax, {  left: point(0, 153 + 30, 153) || 0 }]}>
                                    153
                                </Text>
                                <View style={[styles.dot, { left: point(0, 153 + 30, 153) || 0 }]}>
                                    {renderDot()}
                                </View>
                            </View>
                        )
                    }
                    <View>
                        <Text style={[styles.dotValue, { left: point(0, 153 + 30, data.eating2hGlycemicIndex) || 0 }]}>
                            {data.eating2hGlycemicIndex}
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: point(0, 153 + 30, data.eating2hGlycemicIndex) || 0 }]}>
                            mm
                        </Text>
                        <View style={[styles.dot, { left: point(0, 153 + 30, data.eating2hGlycemicIndex) || 0 }]}>
                            {renderDot()}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    return <View style={styles.container}>{renderContent()}</View>;
};

export default PrenatalCareCheckupsHealthyIndex;

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
            bottom: -scales(2),
            // top: scales(-2),
            left: 0,
            width: scales(10),
            height: scales(10),
            backgroundColor: color.Color_Red_3,
            borderRadius: scales(10),
        },
        dotValue: {
            position: 'absolute',
            bottom: scales(15),
            left: 0,
        },
        dotValueMinMax: {
            position: 'absolute',
            top: scales(10),
        },
        progress: {
            marginVertical: scales(20),
        },
    });
};
