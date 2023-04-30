import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';

import { useTheme } from 'hooks/useTheme';
import { RootNavigatorParamList } from 'navigation/types';
import { pop } from 'navigation/utils';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { createBabyCheckups } from 'states/user/fetchCheckups';

interface IAddPrenatalCareCheckupsScreenStep2Props {
    route: RouteProp<RootNavigatorParamList, 'AddPrenatalCareCheckupsStep2'>;
}

const AddPrenatalCareCheckupsScreenStep2 = (props: IAddPrenatalCareCheckupsScreenStep2Props) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { weeksOfPregnacy } = props.route.params;
    const [babyFL, setBabyFL] = useState<string>('');
    const [babyHC, setBabyHC] = useState<string>('');
    const [babyWeight, setBabyWeight] = useState<string>('');
    const [babyNote, setBabyNote] = useState<string>('');
    const [babyBPD, setBabyBPD] = useState<string>('');
    const [babyLength, setBabyLength] = useState<string>('');

    const onUpdate = async () => {
        const body = {
            weeksOfPregnacy,
            weight: parseFloat(babyWeight),
            note: babyNote,
            dualTopDiameter: parseFloat(babyBPD),
            femurLength: parseFloat(babyFL),
            headPerimeter: parseFloat(babyHC),
        } as user.BabyCheckupsRequest;
        const response = await createBabyCheckups(body);
        if (response) {
            pop(2);
        }
    };

    const renderInputBabyCRL = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Chiều dài (CRL)</Text>
            <Input value={babyLength} onChangeText={setBabyLength} placeholder="mm" />
        </View>
    );

    const renderInputBabyBPD = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Đường kính lưỡng đỉnh (BPD)</Text>
            <Input value={babyBPD} onChangeText={setBabyBPD} placeholder="mmHg" />
        </View>
    );

    const renderInputBabyHL = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Chiều dài xương đùi (FL)</Text>
            <Input value={babyFL} onChangeText={setBabyFL} placeholder="mmol/L" />
        </View>
    );

    const renderInputBabyHC = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Chu vi đầu (HC)</Text>
            <Input value={babyHC} onChangeText={setBabyHC} placeholder="mmol/L" />
        </View>
    );

    const renderInputBabyWeight = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>
                Cân nặng ước tính <Text style={styles.txtBold}>*</Text>
            </Text>
            <Input value={babyWeight} onChangeText={setBabyWeight} placeholder="mg" />
        </View>
    );

    const renderBabyNote = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.subTitleInfo}>Ghi chú</Text>
            <Input value={babyNote} onChangeText={setBabyNote} placeholder="Nhập ghi chú thai nhi" multiline />
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            <Text style={styles.titleInfo}>Thông tin của bé</Text>
            {renderInputBabyCRL()}
            {renderInputBabyBPD()}
            {renderInputBabyHL()}
            {renderInputBabyHC()}
            {renderInputBabyWeight()}
            {renderBabyNote()}
        </View>
    );

    const renderButton = () => <Button title="Lưu" customStyles={styles.button} onPress={onUpdate} />;

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                extraHeight={scales(125)}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableOnAndroid>
                {renderContent()}
            </KeyboardAwareScrollView>
            {renderButton()}
        </View>
    );
};

export default AddPrenatalCareCheckupsScreenStep2;

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
            paddingTop: Sizes.statusBarHeight,
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
