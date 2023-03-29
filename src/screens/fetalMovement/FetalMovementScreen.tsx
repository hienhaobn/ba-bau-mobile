import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const FetalMovementScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => (
        <Header
            title="Điểm cử động thai nhi"
            iconRight={
                <SvgIcons.IcLineChart width={scales(25)} height={scales(25)} color={getThemeColor().Text_Dark_1} />
            }
        />
    );

    const renderProgressCircle = () => {
        return (
            <View
                style={{
                    alignItems: 'center',
                }}>
                <View style={styles.progressCircleContainer}>
                    <AnimatedCircularProgress
                        size={200}
                        width={6}
                        fill={70}
                        rotation={360}
                        tintColor={getThemeColor().white}
                        backgroundColor={getThemeColor().Text_Dark_5}>
                        {(fill) => (
                            <View style={styles.fillContainer}>
                                <Text style={styles.textFill}>Thời gian còn lại</Text>
                                <Text style={styles.fill}>{`00 : 00`}</Text>
                            </View>
                        )}
                    </AnimatedCircularProgress>
                </View>
            </View>
        );
    };

    const renderTimeAndMovement = () => (
        <View style={styles.timeAndMovementContainer}>
            <View style={styles.itemTimeAndMovement}>
                <Text style={styles.titleTimeAndMovement}>Thời gian bắt đầu</Text>
                <Text style={styles.valueTimeAndMovement}>00 : 00</Text>
            </View>
            <View style={styles.itemTimeAndMovement}>
                <Text style={styles.titleTimeAndMovement}>Số lần cử động</Text>
                <Text style={styles.valueTimeAndMovement}>0</Text>
            </View>
        </View>
    );

    const renderUserManual = () => <Text style={styles.userManual}>Hướng dẫn sử dụng</Text>;

    const renderButtons = () => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.itemButton}>
                <Text style={styles.texButton}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemButton, styles.buttonPlay]}>
                <SvgIcons.IcPlay width={scales(20)} height={scales(20)} color={getThemeColor().white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButton}>
                <Text style={styles.texButton}>+</Text>
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderProgressCircle()}
            {renderTimeAndMovement()}
            {renderUserManual()}
            {renderButtons()}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default FetalMovementScreen;

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
        progressCircleContainer: {
            backgroundColor: getThemeColor().Color_Primary,
            padding: scales(10),
            borderRadius: scales(9999),
            marginTop: scales(40),
        },
        fillContainer: {
            alignItems: 'center',
        },
        fill: {
            ...Fonts.inter600,
            fontSize: scales(24),
            color: color.Text_Dark_1,
            marginTop: scales(12),
        },
        textFill: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        timeAndMovementContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scales(40),
        },
        itemTimeAndMovement: {
            alignItems: 'center',
        },
        titleTimeAndMovement: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        valueTimeAndMovement: {
            ...Fonts.inter700,
            fontSize: scales(32),
            color: color.Text_Dark_1,
            marginTop: scales(12),
        },
        userManual: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Color_Primary,
            marginVertical: scales(60),
            alignSelf: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        itemButton: {
            backgroundColor: color.Color_Primary,
            borderRadius: 999,
            width: scales(60),
            height: scales(60),
            alignItems: 'center',
            justifyContent: 'center',
        },
        texButton: {
            ...Fonts.inter600,
            fontSize: scales(20),
            color: color.white,
        },
        buttonPlay: {
            width: scales(80),
            height: scales(80),
        },
    });
};
