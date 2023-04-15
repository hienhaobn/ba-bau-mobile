import moment from 'moment';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { goBack, resetStack } from 'navigation/utils';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const RegisterUpdateInfoScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [momName, setMomName] = useState<string>('');
    const [momAddress, setMomAddress] = useState<string>('');
    const [babyName, setBabyName] = useState<string>('');
    const [momDOB, setMomDOB] = useState<Date>(moment().toDate());
    const [dueDate, setDueDate] = useState<Date>(moment().toDate());
    const [lastMenstrualPeriod, setLastMenstrualPeriod] = useState<Date>(moment().toDate());
    const [selectDateVisible, setSelectDateVisible] = useState<boolean>(false);
    const [selectDateType, setSelectDateType] = useState<'momDOB' | 'lastMenstrualPeriod' | 'dueDate'>('momDOB');

    const renderContentHeader = () => (
        <View style={styles.contentHeaderContainer}>
            <Image source={Images.GirlHome} style={styles.girlHome} />
            <TouchableOpacity
                style={styles.icPencil}
                activeOpacity={1}
                hitSlop={{ top: 10, bottom: 0, left: 0, right: 0 }}>
                <SvgIcons.IcPencil width={scales(15)} height={scales(15)} color={getThemeColor().Color_Primary} />
            </TouchableOpacity>
        </View>
    );

    const onShowSelectDate = (dateType: 'momDOB' | 'lastMenstrualPeriod' | 'dueDate') => {
        setSelectDateType(dateType);
        setSelectDateVisible(true);
    };

    const onConfirmDate = (value: Date) => {
        if (selectDateType === 'momDOB') {
            setMomDOB(value);
        } else if (selectDateType === 'dueDate') {
            setDueDate(value);
        } else {
            setLastMenstrualPeriod(value);
        }

        setSelectDateVisible(false);
        setSelectDateType('momDOB');
    };

    const onCancel = () => {
        setSelectDateVisible(false);
        setSelectDateType('momDOB');
    };

    const onUpdate = () => {
        resetStack('Login');
    };

    const renderInputMomAddress = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Địa chỉ</Text>
            <Input value={momAddress} onChangeText={setMomAddress} placeholder="Vui lòng nhập địa chỉ" />
        </View>
    );

    const renderInputMomName = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Họ và tên</Text>
            <Input value={momName} onChangeText={setMomName} placeholder="Vui lòng nhập họ và tên" />
        </View>
    );

    const renderInputMomDOB = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Ngày sinh</Text>
            <TouchableOpacity style={styles.dobContainer} onPress={() => onShowSelectDate('momDOB')}>
                <Text style={styles.dobTxt}>{moment(momDOB).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderInputBabyName = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Họ và tên của bé</Text>
            <Input value={babyName} onChangeText={setBabyName} placeholder="Vui lòng nhập họ và tên của bé" />
        </View>
    );

    const renderInputDueDate = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Ngày dự sinh</Text>
            <TouchableOpacity style={styles.dobContainer} onPress={() => onShowSelectDate('dueDate')}>
                <Text style={styles.dobTxt}>{moment(dueDate).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderInputLastMenstrualPeriod = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Ngày đầu tiên của kỳ kinh nguyệt cuối cùng</Text>
            <TouchableOpacity style={styles.dobContainer} onPress={() => onShowSelectDate('lastMenstrualPeriod')}>
                <Text style={styles.dobTxt}>{moment(lastMenstrualPeriod).format('DD-MM-YYYY')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderBabyInfo = () => (
        <View>
            <Text style={styles.titleInfo}>Thông tin của bé</Text>
            {renderInputBabyName()}
            {renderInputDueDate()}
            {renderInputLastMenstrualPeriod()}
        </View>
    );

    const renderMomInfo = () => (
        <View>
            <Text style={styles.titleInfo}>Thông tin của mẹ</Text>
            {renderInputMomName()}
            {renderInputMomDOB()}
            {renderInputMomAddress()}
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderMomInfo()}
            {renderBabyInfo()}
        </View>
    );

    const setDateDatePicker = () => {
        if (selectDateType === 'momDOB') {
            return momDOB;
        } else if (selectDateType === 'dueDate') {
            return dueDate;
        } else {
            return lastMenstrualPeriod;
        }
    };

    const renderDatePicker = () => (
        <DatePicker
            modal
            mode="date"
            open={selectDateVisible}
            theme={'light'}
            date={setDateDatePicker()}
            onConfirm={onConfirmDate}
            onCancel={onCancel}
            title={null}
            confirmText={'Xác nhận'}
            cancelText={'Huỷ'}
        />
    );

    const renderButton = () => <Button title="Cập nhật" customStyles={styles.button} onPress={onUpdate} />;

    return (
        <View style={styles.container}>
            <Header containerStyle={{ backgroundColor: getThemeColor().Color_Primary2 }} />
            <KeyboardAwareScrollView
                extraHeight={scales(125)}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableOnAndroid>
                <View style={styles.imageHome} />
                {renderContentHeader()}
                {renderContent()}
            </KeyboardAwareScrollView>
            {renderDatePicker()}
            {renderButton()}
        </View>
    );
};

export default RegisterUpdateInfoScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
            paddingBottom: scales(30),
        },
        imageHome: {
            backgroundColor: color.Color_Primary2,
            width: Sizes.scrWidth * 2,
            borderRadius: Sizes.scrWidth,
            height: Sizes.scrWidth * 2,
            position: 'absolute',
            top: -Sizes.scrWidth / 2 - Sizes.scrWidth,
            left: -Sizes.scrWidth / 2,
        },
        content: {
            paddingHorizontal: scales(15),
        },
        contentContainer: {
            paddingBottom: scales(30),
            paddingTop: scales(15),
        },
        contentHeaderContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: Sizes.scrWidth / 4,
        },
        girlHome: {
            marginTop: scales(10),
            width: scales(120),
            height: scales(120),
            backgroundColor: color.Color_Primary,
            borderRadius: scales(120),
            borderWidth: 1.5,
            borderColor: color.white,
        },
        icBack: {
            justifyContent: 'center',
            position: 'absolute',
            top: Sizes.statusBarHeight,
            backgroundColor: color.Color_Gray6,
            paddingVertical: scales(12),
            paddingHorizontal: scales(10),
            borderRadius: scales(100),
        },
        icPencil: {
            position: 'absolute',
            top: scales(100),
            right: scales(120),
            backgroundColor: color.Color_Gray6,
            padding: scales(5),
            borderRadius: scales(100),
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
        button: {
            marginHorizontal: scales(15),
        },
    });
};
