import BigNumber from 'bignumber.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import FetalMovementConfirmPopup, { IFetalMovementConfirmPopupRef } from './src/components/FetalMovementConfirmPopup';
import FetalMovementResultPopup, { IFetalMovementResultPopupRef } from './src/components/FetalMovementResultPopup';
import FetalMovementUserManualPopup, {
    IFetalMovementUserManualPopupRef,
} from './src/components/FetalMovementUserManualPopup';
import { goToFetalMovementChart } from './src/utils';

import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const DAY_IN_MS = 1 * 60 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();
const DATETIME_AFTER_DAY = NOW_IN_MS + DAY_IN_MS;
const FetalMovementScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [movement, setMovement] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<string>('00:00');
    const [countdown, setCountdown] = useState<number>(0);
    const refFetalMovementConfirmPopup = useRef<IFetalMovementConfirmPopupRef>(null);
    const refFetalMovementResultPopup = useRef<IFetalMovementResultPopupRef>(null);
    const refFetalMovementUserManualPopup = useRef<IFetalMovementUserManualPopupRef>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(DATETIME_AFTER_DAY - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    const getReturnValues = (countDownTime: number) => {
        // calculate time left
        const days = Math.floor(countDownTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDownTime % (1000 * 60)) / 1000);

        return [days, hours, minutes, seconds];
    };

    const onUserManual = () => {
        refFetalMovementUserManualPopup.current?.showModal();
    };

    const renderHeader = useCallback(
        () => (
            <Header
                title="Điểm cử động thai nhi"
                iconRight={
                    <SvgIcons.IcLineChart width={scales(25)} height={scales(25)} color={getThemeColor().Text_Dark_1} />
                }
                onPressRight={goToFetalMovementChart}
            />
        ),
        []
    );

    const renderProgressCircle = () => {
        const [, , minutes, seconds] = getReturnValues(countdown);
        const currentDateTime = minutes * 60 + seconds;
        const currentFill = isPlay ? new BigNumber(currentDateTime).div(3600).times(100).toNumber() : 100;
        const time = minutes + seconds > 0 && isPlay ? `${minutes}:${seconds}` : '00:00';

        return (
            <View
                style={{
                    alignItems: 'center',
                }}>
                <View style={styles.progressCircleContainer}>
                    <AnimatedCircularProgress
                        size={200}
                        width={6}
                        fill={currentFill}
                        rotation={0}
                        tintColor={getThemeColor().white}
                        backgroundColor={getThemeColor().Text_Dark_5}>
                        {(fill) => (
                            <View style={styles.fillContainer}>
                                <Text style={styles.textFill}>Thời gian còn lại</Text>
                                <Text style={styles.fill}>{!isPlay ? '60:00' : time}</Text>
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
                <Text style={styles.valueTimeAndMovement}>{currentTime}</Text>
            </View>
            <View style={styles.itemTimeAndMovement}>
                <Text style={styles.titleTimeAndMovement}>Số lần cử động</Text>
                <Text style={styles.valueTimeAndMovement}>{movement}</Text>
            </View>
        </View>
    );

    const renderUserManual = () => (
        <TouchableOpacity onPress={onUserManual} activeOpacity={1}>
            <Text style={styles.userManual}>Hướng dẫn sử dụng</Text>
        </TouchableOpacity>
    );

    const onPause = () => {
        refFetalMovementConfirmPopup.current?.hideModal();
        // TODO: Handle show modal fetal movement
        setTimeout(() => {
            setIsPlay(false);
            // Call api => show modal result
            refFetalMovementResultPopup.current?.showModal();
            // success => set state to default
            setCountdown(0);
        }, 500);
    };

    const onPlay = () => {
        if (!isPlay) {
            const currentHours = new Date().getHours();
            const currentSeconds = new Date().getMinutes();
            setIsPlay(true);
            setCurrentTime(`${currentHours}:${currentSeconds}`);
            setCountdown(DATETIME_AFTER_DAY);
        } else {
            refFetalMovementConfirmPopup.current?.showModal();
        }
    };

    const onPlus = () => {
        setMovement(movement + 1);
    };

    const onMinus = () => {
        if (movement > 0) {
            setMovement(movement - 1);
        }
    };

    const renderButtons = () => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.itemButton} activeOpacity={0.9} onPress={onMinus}>
                <Text style={styles.texButton}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemButton, styles.buttonPlay]} onPress={onPlay} activeOpacity={0.9}>
                {isPlay ? (
                    <SvgIcons.IcPause width={scales(20)} height={scales(20)} color={getThemeColor().white} />
                ) : (
                    <SvgIcons.IcPlay width={scales(20)} height={scales(20)} color={getThemeColor().white} />
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButton} activeOpacity={0.9} onPress={onPlus}>
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
            <FetalMovementConfirmPopup ref={refFetalMovementConfirmPopup} onConfirm={onPause} />
            <FetalMovementResultPopup ref={refFetalMovementResultPopup} />
            <FetalMovementUserManualPopup ref={refFetalMovementUserManualPopup} />
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
            marginHorizontal: scales(24),
        },
        itemTimeAndMovement: {
            alignItems: 'center',
        },
        titleTimeAndMovement: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        valueTimeAndMovement: {
            ...Fonts.inter600,
            fontSize: scales(30),
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
            ...Fonts.inter400,
            fontSize: scales(25),
            color: color.white,
        },
        buttonPlay: {
            width: scales(80),
            height: scales(80),
        },
    });
};
