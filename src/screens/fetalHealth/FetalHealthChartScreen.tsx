import { RouteProp } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import React, { useCallback } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFetalDevelopmentWeeklySelector } from '../../states/fetal/hooks';

import { goToFetalHealthAnalysis } from './src/utils';

import Images from 'assets/images';
import Button from 'components/Button/Button';
import Header from 'components/Header';
import { useTheme } from 'hooks/useTheme';
import { RootNavigatorParamList } from 'navigation/types';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface FetalHealthChartScreenProps {
    route: RouteProp<RootNavigatorParamList, 'FetalHealthChart'>;
}

const FetalHealthChartScreen = (props: FetalHealthChartScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { child, momId } = route.params;

    const fetalDevelopmentWeekly = useFetalDevelopmentWeeklySelector();

    const fetalDevelopmentWeeklyCurrent = fetalDevelopmentWeekly?.find(item => item?.week === parseInt(child?.weeksOfPregnacy));

    const getStatus = (value: number, min: number, max: number) => {
        if (BigNumber(value).lt(min)) {
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
        if (BigNumber(value).lt(max) && BigNumber(value).gt(min)) {
            return  (
                <View style={[styles.statusContainer, { backgroundColor: getThemeColor().Color_Yellow_1 }]}>
                    <Text style={styles.statusTxt}>Bình thường</Text>
                </View>
            )
        }
        return (
            <View style={[styles.statusContainer, { backgroundColor: getThemeColor().Color_Blue }]}>
                <Text style={styles.statusTxt}>Thấp</Text>
            </View>
        )
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
        if (value > min) {
            return getDotPosition(0, max + 30, value);
        } else {
            return getDotPosition(0, max + 120, value);
        }
    }

    const renderHeader = () => <Header title="Sức khỏe thai nhi" />;

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.image} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
            <Button title="Nhập dữ liệu" customStyles={styles.buttonEnterData} />
            <Text style={styles.fetchData}>Lấy dữ liệu khám định kỳ</Text>
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

    // eslint-disable-next-line complexity
    const renderContent = () => (
        <View style={styles.content}>
            <View style={styles.contentHeader}>
                <Text style={styles.leftHeader}>Cân nặng</Text>
                <Text style={styles.midHeader}>{child?.weight || 0} Gram</Text>
                {/*TODO: re check with backend*/}
                {getStatus(child?.weight, child?.fetalDevelopmentWeekly?.GSD.min, child?.fetalDevelopmentWeekly?.GSD.max)}
            </View>
            <View style={styles.weekContainer}>
                <Text style={styles.txtWeek}>Tuần thai: </Text>
                <Text style={styles.week}>{child?.weeksOfPregnacy || 0} tuần</Text>
            </View>
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Chiều dài (CRL)</Text>
                    {getStatus(child?.width, child?.fetalDevelopmentWeekly?.CRL?.min, child?.fetalDevelopmentWeekly?.CRL?.max)}
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
                        child?.fetalDevelopmentWeekly?.CRL?.min > 0 && child?.fetalDevelopmentWeekly?.CRL?.min < child?.fetalDevelopmentWeekly?.CRL?.max && (
                            <View>
                                <Text style={[styles.dotValue, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.CRL?.max + 100, child?.fetalDevelopmentWeekly?.CRL?.min) || 0 }]}>
                                    Min
                                </Text>
                                <Text style={[styles.dotValueMinMax, {  left: getDotPosition(0, child?.fetalDevelopmentWeekly?.CRL?.max + 100, child?.fetalDevelopmentWeekly?.CRL?.min) || 0 }]}>
                                    {child?.fetalDevelopmentWeekly?.CRL?.min || 0}
                                </Text>
                                <View style={[styles.dot, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.CRL?.max + 100, child?.fetalDevelopmentWeekly?.CRL?.min) || 0 }]}>
                                    {renderDot()}
                                </View>
                            </View>
                        )
                    }
                    <View>
                        <Text style={[styles.dotValue, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.CRL?.max + 30, child?.fetalDevelopmentWeekly?.CRL?.max) || 0 }]}>
                            Max
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: getDotPosition(0, child?.fetalDevelopmentWeekly?.CRL?.max + 30, child?.fetalDevelopmentWeekly?.CRL?.max) || 0 }]}>
                            {child?.fetalDevelopmentWeekly?.CRL?.max || 0}
                        </Text>
                        <View style={[styles.dot, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.CRL?.max + 30, child?.fetalDevelopmentWeekly?.CRL?.max) || 0 }]}>
                            {renderDot()}
                        </View>
                    </View>
                    <Text style={[styles.dotValue, { left: point(child?.fetalDevelopmentWeekly?.CRL?.min, child?.fetalDevelopmentWeekly?.CRL?.max, child?.width) || 0 }]}>
                        {child?.width || 0}
                    </Text>
                    <Text style={[styles.dotValueMinMax, { left: point(child?.fetalDevelopmentWeekly?.CRL?.min, child?.fetalDevelopmentWeekly?.CRL?.max, child?.width) || 0 }]}>
                        mm
                    </Text>
                    <View style={[styles.dot, { left: point(child?.fetalDevelopmentWeekly?.CRL?.min, child?.fetalDevelopmentWeekly?.CRL?.max, child?.width) || 0 }]}>
                        {renderDot()}
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Đường kính lưỡng đỉnh (BPD)</Text>
                    {getStatus(child?.dualTopDiameter, child?.fetalDevelopmentWeekly?.BPD?.min, child?.fetalDevelopmentWeekly?.BPD?.max)}
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
                        child?.fetalDevelopmentWeekly?.BPD?.min > 0 && child?.fetalDevelopmentWeekly?.BPD?.min < child?.fetalDevelopmentWeekly?.BPD?.max && (
                            <View>
                                <Text style={[styles.dotValue, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.BPD?.max + 100, child?.fetalDevelopmentWeekly?.BPD?.min) || 0 }]}>
                                    Min
                                </Text>
                                <Text style={[styles.dotValueMinMax, {  left: getDotPosition(0, child?.fetalDevelopmentWeekly?.BPD?.max + 100, child?.fetalDevelopmentWeekly?.BPD?.min) || 0 }]}>
                                    {child?.fetalDevelopmentWeekly?.BPD?.min || 0}
                                </Text>
                                <View style={[styles.dot, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.BPD?.max + 100, child?.fetalDevelopmentWeekly?.BPD?.min) || 0 }]}>
                                    {renderDot()}
                                </View>
                            </View>
                        )
                    }
                    <View>
                        <Text style={[styles.dotValue, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.BPD?.max + 30, child?.fetalDevelopmentWeekly?.BPD?.max) || 0 }]}>
                            Max
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: getDotPosition(0, child?.fetalDevelopmentWeekly?.BPD?.max + 30, child?.fetalDevelopmentWeekly?.BPD?.max) || 0 }]}>
                            {child?.fetalDevelopmentWeekly?.BPD?.max || 0}
                        </Text>
                        <View style={[styles.dot, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.BPD?.max + 30, child?.fetalDevelopmentWeekly?.BPD?.max) || 0 }]}>
                            {renderDot()}
                        </View>
                    </View>
                    <Text style={[styles.dotValue, { left: point(child?.fetalDevelopmentWeekly?.BPD?.min, child?.fetalDevelopmentWeekly?.BPD?.max, child?.dualTopDiameter) || 0 }]}>
                        {child?.dualTopDiameter || 0}
                    </Text>
                    <Text style={[styles.dotValueMinMax, { left: point(child?.fetalDevelopmentWeekly?.BPD?.min, child?.fetalDevelopmentWeekly?.BPD?.max, child?.dualTopDiameter) || 0 }]}>
                        mm
                    </Text>
                    <View style={[styles.dot, { left: point(child?.fetalDevelopmentWeekly?.BPD?.min, child?.fetalDevelopmentWeekly?.BPD?.max, child?.dualTopDiameter) || 0 }]}>
                        {renderDot()}
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Chiều dài xương đùi (FL)</Text>
                    {getStatus(child?.femurLength, child?.fetalDevelopmentWeekly?.FL?.min, child?.fetalDevelopmentWeekly?.FL?.max)}
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
                        child?.fetalDevelopmentWeekly?.FL?.min > 0 && child?.fetalDevelopmentWeekly?.FL?.min < child?.fetalDevelopmentWeekly?.FL?.max && (
                            <View>
                                <Text style={[styles.dotValue, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.FL?.max + 100, child?.fetalDevelopmentWeekly?.FL?.min) || 0 }]}>
                                    Min
                                </Text>
                                <Text style={[styles.dotValueMinMax, {  left: getDotPosition(0, child?.fetalDevelopmentWeekly?.FL?.max + 100, child?.fetalDevelopmentWeekly?.FL?.min) || 0 }]}>
                                    {child?.fetalDevelopmentWeekly?.FL?.min || 0}
                                </Text>
                                <View style={[styles.dot, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.FL?.max + 100, child?.fetalDevelopmentWeekly?.FL?.min) || 0 }]}>
                                    {renderDot()}
                                </View>
                            </View>
                        )
                    }
                    <View>
                        <Text style={[styles.dotValue, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.FL?.max + 30, child?.fetalDevelopmentWeekly?.FL?.max) || 0 }]}>
                            Max
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: getDotPosition(0, child?.fetalDevelopmentWeekly?.FL?.max + 30, child?.fetalDevelopmentWeekly?.FL?.max) || 0 }]}>
                            {child?.fetalDevelopmentWeekly?.FL?.max || 0}
                        </Text>
                        <View style={[styles.dot, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.FL?.max + 30, child?.fetalDevelopmentWeekly?.FL?.max) || 0 }]}>
                            {renderDot()}
                        </View>
                    </View>
                    <Text style={[styles.dotValue, { left: point(child?.fetalDevelopmentWeekly?.FL?.min, child?.fetalDevelopmentWeekly?.FL?.max, child?.femurLength) || 0 }]}>
                        {child?.femurLength}
                    </Text>
                    <Text style={[styles.dotValueMinMax, { left: point(child?.fetalDevelopmentWeekly?.FL?.min, child?.fetalDevelopmentWeekly?.FL?.max, child?.femurLength) || 0 }]}>
                        mm
                    </Text>
                    <View style={[styles.dot, { left: point(child?.fetalDevelopmentWeekly?.FL?.min, child?.fetalDevelopmentWeekly?.FL?.max, child?.femurLength) || 0 }]}>
                        {renderDot()}
                    </View>
                </View>
            </View>

            <View>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointTxt}>Chu vi đầu (HC)</Text>
                    {getStatus(child?.headPerimeter, child?.fetalDevelopmentWeekly?.HC?.min, child?.fetalDevelopmentWeekly?.HC?.max)}
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
                        child?.fetalDevelopmentWeekly?.HC?.min > 0 && child?.fetalDevelopmentWeekly?.HC?.min < child?.fetalDevelopmentWeekly?.HC?.max && (
                            <View>
                                <Text style={[styles.dotValue, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.HC?.max + 100, child?.fetalDevelopmentWeekly?.HC?.min) || 0 }]}>
                                    Min
                                </Text>
                                <Text style={[styles.dotValueMinMax, {  left: getDotPosition(0, child?.fetalDevelopmentWeekly?.HC?.max + 100, child?.fetalDevelopmentWeekly?.HC?.min) || 0 }]}>
                                    {child?.fetalDevelopmentWeekly?.HC?.min || 0}
                                </Text>
                                <View style={[styles.dot, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.HC?.max + 100, child?.fetalDevelopmentWeekly?.HC?.min) || 0 }]}>
                                    {renderDot()}
                                </View>
                            </View>
                        )
                    }
                    <View>
                        <Text style={[styles.dotValue, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.HC?.max + 30, child?.fetalDevelopmentWeekly?.HC?.max) || 0 }]}>
                            Max
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: getDotPosition(0, child?.fetalDevelopmentWeekly?.HC?.max + 30, child?.fetalDevelopmentWeekly?.HC?.max) || 0 }]}>
                            {child?.fetalDevelopmentWeekly?.HC?.max || 0}
                        </Text>
                        <Text style={[styles.dotValueMinMax, {  left: getDotPosition(0, child?.fetalDevelopmentWeekly?.HC?.max + 30, child?.fetalDevelopmentWeekly?.HC?.max) || 0 }]}>
                            {child?.fetalDevelopmentWeekly?.HC?.max || 0}
                        </Text>
                        <View style={[styles.dot, { left: getDotPosition(0, child?.fetalDevelopmentWeekly?.HC?.max + 30, child?.fetalDevelopmentWeekly?.HC?.max) || 0 }]}>
                            {renderDot()}
                        </View>
                    </View>
                    <Text style={[styles.dotValue, { left: point(child?.fetalDevelopmentWeekly?.HC?.min, child?.fetalDevelopmentWeekly?.HC?.max, child?.headPerimeter) || 0 }]}>
                        {child?.headPerimeter || 0}
                    </Text>
                    <Text style={[styles.dotValueMinMax, { left: point(child?.fetalDevelopmentWeekly?.HC?.min, child?.fetalDevelopmentWeekly?.HC?.max, child?.headPerimeter) || 0 }]}>
                        mm
                    </Text>
                    <View style={[styles.dot, { left: point(child?.fetalDevelopmentWeekly?.HC?.min, child?.fetalDevelopmentWeekly?.HC?.max, child?.headPerimeter) || 0 }]}>
                        {renderDot()}
                    </View>
                </View>
            </View>
        </View>
    );

    const renderButton = () => (
        <Button
            title="Phân tích"
            onPress={() => goToFetalHealthAnalysis('FETAL_HEALTH')}
            customStyles={styles.button}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {renderContent()}
            </ScrollView>
            {renderButton()}
        </View>
    );
};

export default FetalHealthChartScreen;

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
            marginVertical: scales(20),
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
            // top: -scales(2),
            left: scales(10),
            width: scales(10),
            height: scales(10),
            backgroundColor: color.Color_Red_3,
            borderRadius: scales(10),
        },
        dotValue: {
            position: 'absolute',
            bottom: scales(15),
        },
        progress: {
            marginTop: scales(20),
        },
        dotValueMinMax: {
            position: 'absolute',
            top: scales(10),
        },
    });
};
