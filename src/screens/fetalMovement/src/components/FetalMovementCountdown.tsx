import React, { forwardRef, memo, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const DAY_IN_MS = 1 * 60 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();
const DATETIME_AFTER_DAY = NOW_IN_MS + DAY_IN_MS;

interface TimeCountdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface FetalMovementCountdownRef {
    callback?: () => void;
    getTimeCountdown?: () => TimeCountdown;
}

interface FetalMovementCountdownProps {
    containerStyle?: StyleProp<ViewStyle>;
    countdownStyle?: StyleProp<TextStyle>;
}

const FetalMovementCountdown = (props: FetalMovementCountdownProps, ref: Ref<FetalMovementCountdownRef>) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { containerStyle, countdownStyle } = props;
    const [countdown, setCountdown] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(DATETIME_AFTER_DAY - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    useImperativeHandle(ref, () => ({ getTimeCountdown }));

    const getTimeCountdown = () => {
        // calculate time left
        const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const { minutes, seconds } = getTimeCountdown();
    const time = minutes + seconds > 0 ? `${minutes}:${seconds}` : '00:00';

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.countdown, countdownStyle]}>{time}</Text>
        </View>
    );
};

export default forwardRef(FetalMovementCountdown);

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        countdown: {
            ...Fonts.inter600,
            fontSize: scales(24),
            color: color.Text_Dark_1,
            marginTop: scales(12),
        },
    });
};
