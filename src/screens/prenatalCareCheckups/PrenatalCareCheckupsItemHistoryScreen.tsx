import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Subscription } from 'rxjs';
import Button from '../../components/Button/Button';
import { goBack } from '../../navigation/utils';
import EventBus, { BaseEvent, EventBusName, onPushEventBus } from '../../services/event-bus';
import { fetchPrenatalCareCheckupsById, removePrenatalCareCheckups } from '../../states/user/fetchCheckups';

import { goToAddPrenatalCareCheckupsStep1 } from './src/utils';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';
import Header from 'components/Header';
import { useTheme } from 'hooks/useTheme';
import { RootNavigatorParamList } from 'navigation/types';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IPrenatalCareCheckupsItemHistoryScreenProps {
    route: RouteProp<RootNavigatorParamList, 'PrenatalCareCheckupsItemHistory'>;
}

const PrenatalCareCheckupsItemHistoryScreen = (props: IPrenatalCareCheckupsItemHistoryScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    // user.CheckupsScheduleChildResponse, momId: user.CheckupsScheduleMomResponse
    const { child, momId, fromScreen } = route.params;

    const [childChart, setChildChart] = useState<user.CheckupsScheduleChildResponse>(child || null);
    const [momChart, setMomChart] = useState<user.CheckupsScheduleMomResponse>(momId || null);
    const subScription = new Subscription();

    const getChartInfo = async () => {
        const response = await fetchPrenatalCareCheckupsById(child._id);
        if (response) {
            setChildChart(response.data[0].child);
            setMomChart(response.data[0].mom);
        }
    };

    useEffect(() => {
        onRegisterEventBus();
        return () => {
            subScription?.unsubscribe?.();
        };
    }, []);



    const onRegisterEventBus = () => {
        subScription.add(
            EventBus.getInstance().events.subscribe((res: BaseEvent<string>) => {
                if (res?.type === EventBusName.UPDATE_FETAL_HISTORY_SUCCESS) {
                    getChartInfo();
                }
            })
        );
    };

    const renderContent = () => (
        <View style={styles.content}>
            {/* Mom */}
            {fromScreen === 'PRENATAL_CARE_CHECKUPS' ? (
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.imgWomanContainer}>
                            <Image source={Images.Woman} style={styles.imgWoman} />
                        </View>
                        <Text style={styles.title}>Thông tin mẹ</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>Cân nặng</Text>
                        <Text style={styles.valueItem}>{momChart?.weight} kg</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>Huyết áp</Text>
                        <Text style={styles.valueItem}>{momChart.bloodPressure}/90 mmHg</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>Chỉ số đường huyết</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>+ Lúc đói</Text>
                        <Text style={styles.valueItem}>{momChart.fastingGlycemicIndex} mmHg</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>+ Sau ăn 1h</Text>
                        <Text style={styles.valueItem}>{momChart.eating1hGlycemicIndex} mmHg</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>+ Sau ăn 2h</Text>
                        <Text style={styles.valueItem}>{momChart.eating2hGlycemicIndex} mmHg</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>Các bệnh lý khác</Text>
                        <Text style={styles.valueItem}>{momChart.commonDiseases}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.titleItem}>Kết quả khám</Text>
                        <Text style={styles.valueItem}>{momChart.note ? momChart.note : 'Bình thường'}</Text>
                    </View>
                </View>
            ) : null}
            {/* baby */}
            <View style={styles.infoContainer}>
                <View style={styles.headerContainer}>
                    <Image source={Images.Pregnancy} style={styles.imgPregnancy} />
                    <Text style={[styles.title, { color: getThemeColor().Color_Blue }]}>Thông tin bé</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Chiều dài (CRL)</Text>
                    <Text style={styles.valueItem}>{childChart.femurLength}mm</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Đường kính lưỡng đỉnh (BPD)</Text>
                    <Text style={styles.valueItem}>{childChart.dualTopDiameter}mm</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Chiều dài xương đùi (FL)</Text>
                    <Text style={styles.valueItem}>{childChart.femurLength}mm</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Chu vi đầu (HC)</Text>
                    <Text style={styles.valueItem}>{childChart.headPerimeter}mm</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.titleItem}>Cân nặng ước tính</Text>
                    <Text style={styles.valueItem}>{childChart.weight} gram</Text>
                </View>
            </View>
        </View>
    );

    const renderIconRight = () => (
        <View style={styles.iconRight}>
            <SvgIcons.IcPencil width={scales(12)} height={scales(12)} color={getThemeColor().white} />
        </View>
    );

    const onPressRight = () => {
        goToAddPrenatalCareCheckupsStep1('EDIT', childChart, momChart);
    };

    const onRemove = async () => {
        await removePrenatalCareCheckups(child?._id, momId?._id);
        onPushEventBus(EventBusName.REMOVE_FETAL_HISTORY_SUCCESS);
        goBack();
    }

    const renderButtonRemove = () => (
        <Button title='Xoá' customStyles={styles.buttonRemove} onPress={onRemove}/>
    )

    return (
        <View style={styles.container}>
            <Header
                title={`Ngày khám ${moment(childChart.pregnancyExam).format('DD/MM/YYYY')}`}
                iconRight={renderIconRight()}
                onPressRight={onPressRight}
            />
            <ScrollView showsVerticalScrollIndicator={false}>{renderContent()}</ScrollView>
            {renderButtonRemove()}
        </View>
    );
};

export default PrenatalCareCheckupsItemHistoryScreen;

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
        imgWomanContainer: {
            backgroundColor: color.Color_Primary,
            width: scales(70),
            height: scales(70),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
        },
        imgWoman: {
            width: scales(50),
            height: scales(50),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(18),
            color: color.Color_Primary,
            marginLeft: scales(16),
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scales(12),
        },
        imgPregnancy: {
            width: scales(70),
            height: scales(70),
        },
        itemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: scales(12),
        },
        titleItem: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        valueItem: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        infoContainer: {
            backgroundColor: color.Color_Bg,
            borderRadius: scales(8),
            paddingVertical: scales(15),
            paddingHorizontal: scales(12),
            marginBottom: scales(15),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        iconRight: {
            backgroundColor: color.Color_Primary,
            paddingHorizontal: scales(5),
            paddingVertical: scales(5),
            borderRadius: 100,
        },
        buttonRemove: {
            marginBottom: Sizes.bottomSpace + scales(10),
            marginHorizontal: scales(15),
        }
    });
};
