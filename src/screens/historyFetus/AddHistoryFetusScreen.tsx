import moment from 'moment';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { goBack } from 'navigation/utils';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const AddHistoryFetusScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [selectDateVisible, setSelectDateVisible] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(moment().toDate());

    const renderHeader = () => <Header title="Nhật ký thai nhi" />;

    const onShowSelectDate = () => {
        setSelectDateVisible(true);
    };

    const onConfirmDate = (value: Date) => {
        setDate(value);
        setSelectDateVisible(false);
    };

    const onCancel = () => {
        setSelectDateVisible(false);
    };

    const renderContent = () => (
        <View style={styles.content}>
            <View style={styles.contentHeaderContainer}>
                <Image source={Images.Babe3} style={styles.image} />
                <TouchableOpacity style={styles.pencilContainer}>
                    <SvgIcons.IcPencil width={scales(17)} height={scales(17)} color={getThemeColor().Color_Primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.date}>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.title}>Ngày chụp</Text>
                    </View>
                    <TouchableOpacity style={styles.dateContainer} onPress={onShowSelectDate}>
                        <Text style={styles.dateTxt}>12/11/2021</Text>
                        <SvgIcons.IcDateRange
                            width={scales(17)}
                            height={scales(17)}
                            color={getThemeColor().Text_Dark_1}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.title}>Tuần thứ</Text>
                    </View>
                    <Input placeholder="Nhập tuần" containerStyle={{ flex: 1 }} />
                </View>
                <View style={styles.noteContainer}>
                    <Text style={styles.title}>Ghi chú</Text>
                    <Input placeholder="Ghi chú..." inputContainerStyle={{ marginTop: scales(15) }} />
                </View>
            </View>
        </View>
    );

    const renderDatePicker = () => (
        <DatePicker
            modal
            mode="date"
            open={selectDateVisible}
            theme={'light'}
            date={date}
            onConfirm={onConfirmDate}
            onCancel={onCancel}
            title={null}
            confirmText={'Xác nhận'}
            cancelText={'Huỷ'}
        />
    );

    const renderButton = () => (
        <View style={styles.buttonContainer}>
            <Button title="Lưu" onPress={goBack} />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
            {renderButton()}
            {renderDatePicker()}
        </View>
    );
};

export default AddHistoryFetusScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
            marginTop: scales(20),
        },
        image: {
            width: scales(120),
            height: scales(120),
        },
        contentHeaderContainer: {
            alignSelf: 'center',
        },
        itemContainer: {
            marginTop: scales(20),
        },
        pencilContainer: {
            position: 'absolute',
            bottom: scales(5),
            right: -scales(5),
            padding: scales(5),
            backgroundColor: color.Color_Gray6,
            borderRadius: scales(20),
        },
        date: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        dateContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: scales(8),
            paddingHorizontal: scales(10),
            backgroundColor: color.Color_Gray6,
            borderRadius: scales(8),
        },
        dateTxt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginRight: scales(5),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scales(15),
        },
        noteContainer: {
            marginTop: scales(15),
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: Sizes.bottomSpace + scales(5),
            marginHorizontal: scales(15),
        },
    });
};
