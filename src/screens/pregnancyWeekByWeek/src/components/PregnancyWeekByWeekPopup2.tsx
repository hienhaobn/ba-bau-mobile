import React, { forwardRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import RNModal from 'react-native-modal';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IPregnancyWeekByWeekPopup2Props {
    onConfirm?: () => void;
}

export interface IPregnancyWeekByWeekPopup2Ref {
    showModal?: () => void;
    hideModal?: () => void;
}

const PregnancyWeekByWeekPopup2 = (
    props: IPregnancyWeekByWeekPopup2Props,
    ref: React.Ref<IPregnancyWeekByWeekPopup2Ref>
) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { onConfirm } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
        showModal,
        hideModal,
    }));

    const showModal = () => {
        setIsVisible(true);
    };

    const hideModal = () => {
        setIsVisible(false);
    };

    return (
        <RNModal
            isVisible={isVisible}
            onBackdropPress={hideModal}
            onBackButtonPress={hideModal}
            backdropTransitionInTiming={0}
            hideModalContentWhileAnimating
            backdropTransitionOutTiming={0}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriverForBackdrop
            style={styles.modal}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.close} onPress={hideModal}>
                    <SvgIcons.IcClose color={getThemeColor().Text_Dark_1} />
                </TouchableOpacity>
                <View style={styles.itemContainer}>
                    <Image source={Images.PregnancyWeek1} style={styles.imageWeek} />

                    <View>
                        <View style={styles.itemHeaderContainer}>
                            <Image source={Images.Pregnant} style={styles.iconItemHeader} />
                            <Text style={styles.titleItemHeader}>Sự thay đổi của mẹ tuần đầu</Text>
                        </View>
                        <View style={styles.descContainer}>
                            <Text style={styles.desc}>
                                Trong tuần thai 01 , sự rụng trứng của người mẹ vẫn chưa diễn ra nên cơ thể sẽ không có
                                nhiều thay đổi . Thường thì quá trình rụng trứng sẽ diễn ra từ ngày 12 - 18 nếu mẹ có
                                chu kỳ kinh nguyệt đều đặn và kéo dài khoảng 30 ngày . Do vậy , thai nhi sẽ được hình
                                thành trong tuần thứ 3 nếu trứng được thụ tinh thành công và lúc đó thì cơ thể mẹ sẽ có
                                những dấu hiệu thai kỳ đầu tiên .
                            </Text>
                            <Text style={styles.desc}>
                                Tuần thứ 01 được nhiều bác sĩ gọi là tuần chuẩn bị . Mẹ cần trang bị đầy đủ các kiến
                                thức về sức khỏe và thể chất để sẵn sàng đón tin vui và bắt đầu thai kỳ một cách mạnh
                                khỏe nhất .
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </RNModal>
    );
};

export default forwardRef(PregnancyWeekByWeekPopup2);

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        modal: {
            marginHorizontal: 0,
            marginTop: Sizes.statusBarHeight,
        },
        container: {
            flex: 1,
            paddingHorizontal: scales(15),
            paddingVertical: scales(30),
            backgroundColor: color.white,
            borderRadius: scales(8),
        },
        wrapperContent: {
            flexGrow: 1,
            paddingHorizontal: scales(15),
        },
        contentContainer: {
            paddingBottom: scales(30),
            paddingTop: scales(15),
        },
        groupButton: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scales(32),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            textAlign: 'center',
        },
        text: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(12),
        },
        buttonCancel: {
            flex: 1,
            backgroundColor: color.Color_Gray2,
        },
        buttonCancelText: {
            color: color.Text_Dark_1,
        },
        buttonConfirm: {
            flex: 1,
            marginLeft: scales(20),
        },
        itemContainer: {
            marginTop: scales(20),
        },
        imageWeek: {
            width: Sizes.scrWidth - scales(30),
            height: scales(180),
            borderRadius: 6,
        },
        itemHeaderContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scales(10),
        },
        iconItemHeader: {
            width: scales(25),
            height: scales(25),
            marginRight: scales(10),
        },
        titleItemHeader: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Color_Primary,
        },
        descContainer: {
            marginLeft: scales(25),
            marginTop: scales(8),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        moreContainer: {
            marginTop: scales(8),
            marginBottom: scales(12),
        },
        more: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Color_Primary,
            textAlign: 'right',
        },
        line: {
            borderWidth: 0.5,
            borderColor: color.Text_Dark_5,
        },
        close: {
            alignSelf: 'flex-end',
        },
    });
};
