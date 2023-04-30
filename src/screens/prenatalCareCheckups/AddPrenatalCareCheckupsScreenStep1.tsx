import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { goToAddPrenatalCareCheckupsStep2 } from './src/utils';

import Button from 'components/Button/Button';
import CheckBox from 'components/CheckBox';
import Header from 'components/Header';
import Input from 'components/Input';
import { showLoading } from 'components/Loading';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { createMomCheckups } from 'states/user/fetchCheckups';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';

const AddPrenatalCareCheckupsScreenStep1 = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [momWeight, setMomWeight] = useState<string>('');
    const [weeksOfPregnancy, setWeeksOfPregnancy] = useState<string>('');
    const [momBloodPressure, setMomBloodPressure] = useState<string>('');
    const [momBloodPressureHungry, setMomBloodPressureHungry] = useState<string>('');
    const [momBloodPressureAfter1Hour, setMomBloodPressureAfter1Hour] = useState<string>('');
    const [momBloodPressureAfter2Hour, setMomBloodPressureAfter2Hour] = useState<string>('');
    const [dateCheckups, setDateCheckups] = useState<Date>(moment().toDate());
    const [selectDateVisible, setSelectDateVisible] = useState<boolean>(false);
    const [checkBox1, setCheckBox1] = useState<boolean>(false);
    const [checkBox2, setCheckBox2] = useState<boolean>(false);
    const [checkBox3, setCheckBox3] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');

    const onConfirmDate = (value: Date) => {
        setSelectDateVisible(false);
        setDateCheckups(value);
    };

    const onCancel = () => {
        setSelectDateVisible(false);
    };

    const getCommonDiseases = () => {
        if (checkBox1) {
            return 'Có vấn đề về nhau thai';
        } else if (checkBox2) {
            return 'Có vấn đề đề nước ối';
        } else if (checkBox3) {
            return 'Phù chân, tay';
        } else {
            return 'Không có bệnh lý';
        }
    };

    const validate = () => {
        if (!weeksOfPregnancy) {
            showCustomToast('Vui lòng nhập số tuần');
            return true;
        }
        return false;
    };
    const onUpdate = async () => {
        // call api
        const body = {
            weight: parseFloat(momWeight),
            bloodPressure: parseFloat(momBloodPressure),
            commonDiseases: getCommonDiseases(),
            fastingGlycemicIndex: parseFloat(momBloodPressureHungry),
            eating1hGlycemicIndex: parseFloat(momBloodPressureAfter1Hour),
            eating2hGlycemicIndex: parseFloat(momBloodPressureAfter2Hour),
            note: result,
            weeksOfPregnacy: weeksOfPregnancy,
        } as user.MomCheckupsRequest;

        if (validate()) {
            return;
        }
        const response = await createMomCheckups(body);
        if (response) {
            // go to step 2
            goToAddPrenatalCareCheckupsStep2(weeksOfPregnancy);
        }
    };

    const renderInputMomWeight = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Cân nặng *</Text>
            <Input value={momWeight} onChangeText={setMomWeight} placeholder="Kg" />
        </View>
    );

    const renderInputMomBloodPressure = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Huyết áp</Text>
            <Input value={momBloodPressure} onChangeText={setMomBloodPressure} placeholder="mmHg" />
        </View>
    );

    const renderInputMomWeeksOfPregnancy = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Tuần</Text>
            <Input
                value={weeksOfPregnancy}
                onChangeText={setWeeksOfPregnancy}
                placeholder="Vui lòng nhập tuần của thai nhi"
            />
        </View>
    );

    const renderInputMomBloodPressureHungry = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Lúc đói</Text>
            <Input value={momBloodPressureHungry} onChangeText={setMomBloodPressureHungry} placeholder="mmHg" />
        </View>
    );

    const renderInputMomBloodPressureAfter1Hour = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Sau ăn 1h</Text>
            <Input value={momBloodPressureAfter1Hour} onChangeText={setMomBloodPressureAfter1Hour} placeholder="mmHg" />
        </View>
    );

    const renderInputMomBloodPressureAfter2Hour = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Sau ăn 2h</Text>
            <Input value={momBloodPressureAfter2Hour} onChangeText={setMomBloodPressureAfter2Hour} placeholder="mmHg" />
        </View>
    );

    const renderInputDateCheckups = () => (
        <View style={styles.dateCheckupContainer}>
            <Text style={styles.title}>Ngày khám</Text>
            <TouchableOpacity style={styles.dobContainer} onPress={() => setSelectDateVisible(true)}>
                <Text style={styles.dobTxt}>{moment(dateCheckups).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderInputDateCheckups()}
            <Text style={styles.titleInfo}>Thông tin của mẹ</Text>
            {renderInputMomWeight()}
            {renderInputMomWeeksOfPregnancy()}
            {renderInputMomBloodPressure()}
            <Text style={styles.subTitleInfo}>Chỉ số đường huyết (mmol/L)</Text>
            {renderInputMomBloodPressureHungry()}
            {renderInputMomBloodPressureAfter1Hour()}
            {renderInputMomBloodPressureAfter2Hour()}
            <Text style={styles.subTitleInfo}>Các bệnh lý thường gặp</Text>
            <CheckBox
                active={checkBox1}
                setActive={setCheckBox1}
                containerStyle={styles.checkBox}
                title="Có vấn đề về nhau thai"
            />
            <CheckBox
                active={checkBox2}
                setActive={setCheckBox2}
                containerStyle={styles.checkBox}
                title="Có vấn đề đề nước ối"
            />
            <CheckBox
                active={checkBox3}
                setActive={setCheckBox3}
                containerStyle={styles.checkBox}
                title="Phù chân, tay"
            />
            <Text style={styles.subTitleInfo}>Kết quả khám</Text>
            <Input value={result} onChangeText={setResult} placeholder="Kết quả" multiline />
        </View>
    );

    const renderDatePicker = () => (
        <DatePicker
            modal
            mode="date"
            open={selectDateVisible}
            theme={'light'}
            date={dateCheckups}
            onConfirm={onConfirmDate}
            onCancel={onCancel}
            title={null}
            confirmText={'Xác nhận'}
            cancelText={'Huỷ'}
        />
    );

    const renderButton = () => <Button title="Tiếp" customStyles={styles.button} onPress={onUpdate} />;

    return (
        <View style={styles.container}>
            <Header title="Thêm kết quả khám" />
            <KeyboardAwareScrollView
                extraHeight={scales(125)}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableOnAndroid>
                {renderContent()}
            </KeyboardAwareScrollView>
            {renderDatePicker()}
            {renderButton()}
        </View>
    );
};

export default AddPrenatalCareCheckupsScreenStep1;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            paddingBottom: scales(30),
        },
        content: {
            paddingHorizontal: scales(15),
        },
        title: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(8),
        },
        inputContainer: {
            marginBottom: scales(15),
        },
        dobContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scales(46),
            backgroundColor: color.Light_2,
            borderRadius: scales(6),
            paddingRight: scales(15),
            borderColor: color.transparent,
            borderWidth: scales(1),
        },
        dobTxt: {
            ...Fonts.inter600,
            fontSize: scales(13),
            color: color.Text_Dark_1,
            paddingHorizontal: scales(15),
        },
        titleInfo: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            marginBottom: scales(15),
            marginTop: scales(10),
        },
        subTitleInfo: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(15),
            marginTop: scales(10),
        },
        button: {
            marginHorizontal: scales(15),
        },
        dateCheckupContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        checkBox: {
            marginRight: scales(8),
            marginBottom: scales(12),
        },
        txtBold: {
            ...Fonts.inter700,
        },
    });
};
