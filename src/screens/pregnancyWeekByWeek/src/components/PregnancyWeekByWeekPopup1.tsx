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

interface IPregnancyWeekByWeekPopup1Props {
    onConfirm?: () => void;
}

export interface IPregnancyWeekByWeekPopup1Ref {
    showModal?: () => void;
    hideModal?: () => void;
}

const PregnancyWeekByWeekPopup1 = (
    props: IPregnancyWeekByWeekPopup1Props,
    ref: React.Ref<IPregnancyWeekByWeekPopup1Ref>
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
                            <Image source={Images.PregnancyBaby} style={styles.iconItemHeader} />
                            <Text style={styles.titleItemHeader}>Sự phát triển của thai nhi tuần đầu</Text>
                        </View>
                        <View style={styles.descContainer}>
                            <Text style={styles.desc}>
                                Chào mẹ, vậy là mẹ đã chính thức bước vào tuần đầu tiên của hành trình 40 tuần ấp ủ “
                                mầm sống yêu thương ” rồi đấy ! Trong tuần đầu tiên này , thậm chí bé yêu còn chưa hình
                                thành , tuy nhiên bác sĩ vẫn tính đây là một phần quá trình phát triển của thai nhi . Ở
                                tuần thai đầu tiên , hãy lưu ý những thông tin sau để bé yêu phát triển khỏe mạnh mẹ nhé
                                !
                            </Text>
                            <Text style={styles.desc}>
                                Hành trình mang thai đã bắt đầu khởi động từ ngày đầu tiên của kỳ kinh nguyệt cuối cùng
                                . Bác sĩ sẽ tính tuổi thai dựa theo khung thời gian này thay vì tuổi thực của em bé .
                                Bởi vì ngay cả các chuyên gia nhiều kinh nghiệm nhất cũng khó có thể xác định được thời
                                điểm rụng trứng và thụ tinh thành công của mẹ để đo tuổi thực của thai một cách chính
                                xác . Vậy nên , có những mẹ bầu sinh em bé vào tuần thứ 40 ( tuổi thai thật khoảng 38 ,
                                39 ) , và cũng có những mẹ bầu sinh con vào tuần thứ 42 ( tuổi thai thật khoảng 40 ).
                            </Text>
                            <Text style={styles.desc}>
                                Trong tuần thai 01 , em bé có thể chưa được hình thành vì sự rụng trứng của người mẹ
                                thường diễn ra từ ngày 12 - 18 nếu mẹ có chu kỳ kinh nguyệt đều đặn và kéo dài khoảng 30
                                ngày . Do vậy , thường thì thai nhi sẽ được hình thành trong tuần thứ 3 nếu trứng được
                                thụ tinh thành công .
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </RNModal>
    );
};

export default forwardRef(PregnancyWeekByWeekPopup1);

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
