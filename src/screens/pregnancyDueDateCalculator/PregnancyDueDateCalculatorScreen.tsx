import moment from 'moment';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

import Button from 'components/Button/Button';
import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PregnancyDueDateCalculatorScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [date, setDate] = useState(new Date());

    const renderHeader = () => <Header title="Dự tính ngày sinh" />;

    const renderPregnancyDueDateCalculator = () => (
        <View style={styles.pregnancyDueDateCalculatorContainer}>
            <Text style={styles.titlePregnancyDueDateCalculator}>Ngày dự sinh: </Text>
            <Text style={styles.datePregnancyDueDateCalculator}>20/08/2023</Text>
        </View>
    );

    const renderSelectDate = () => (
        <View style={styles.selectDateContainer}>
            <Text style={styles.titleSelectDate}>Chọn ngày đầu tiên của kỳ kinh cuối cùng</Text>
            <DatePicker mode="calendar" onSelectedChange={setDate} current="2023-07-13" selected="2023-07-23" />
        </View>
    );

    const renderButton = () => (
        <View style={styles.buttonContainer}>
            <Button title='Cập nhật' customStyles={styles.button}/>
        </View>
    )

    const renderContent = () => (
        <View style={styles.content}>
            {renderHeader()}
            {renderPregnancyDueDateCalculator()}
            {renderSelectDate()}
            {renderButton()}
        </View>
    );

    return <View style={styles.container}>{renderContent()}</View>;
};

export default PregnancyDueDateCalculatorScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            flex: 1,
        },
        pregnancyDueDateCalculatorContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color.Color_Gray4,
            paddingVertical: scales(25),
        },
        titlePregnancyDueDateCalculator: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        datePregnancyDueDateCalculator: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginHorizontal: scales(15),
        },
        selectDateContainer: {
            marginTop: scales(30),
        },
        titleSelectDate: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            alignSelf: 'center',
            marginBottom: scales(20),
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: Sizes.bottomSpace + scales(15),
        },
        button: {
            marginHorizontal: scales(15),
        },
    });
};
