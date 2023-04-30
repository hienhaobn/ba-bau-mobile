import React, { forwardRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import RNModal from 'react-native-modal';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IPregnancyWeekByWeekPopup3Props {
    onConfirm?: () => void;
}

export interface IPregnancyWeekByWeekPopup3Ref {
    showModal?: () => void;
    hideModal?: () => void;
}

const PregnancyWeekByWeekPopup3 = (
    props: IPregnancyWeekByWeekPopup3Props,
    ref: React.Ref<IPregnancyWeekByWeekPopup3Ref>
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
                            <Image source={Images.Consulting} style={styles.iconItemHeader} />
                            <Text style={styles.titleItemHeader}>Lời khuyên dành cho mẹ bầu tuần đầu</Text>
                        </View>
                        <View style={styles.descContainer}>
                            <Text style={styles.desc}>
                                <Text style={styles.txtBold}>Hãy rèn cho mình các thói quen lành mạnh :</Text> Ăn uống đủ chất đủ bữa , ngủ đúng giờ , tránh
                                làm việc quá căng thẳng , tránh xa rượu bia , các chất kích thích caffeine , đồ uống có
                                ga , đóng lon sẵn , không sử dụng thuốc lá ....
                            </Text>
                            <Text style={styles.desc}>
                                <Text style={styles.txtBold}>Bổ sung vitamin , khoáng chất :</Text> Việc bổ sung vitamin trước khi mang thai , đặc biệt là
                                axit folic , DHA , nhóm khoáng chất như Canxi , sắt có ý nghĩa rất lớn trong việc tạo
                                tiền đề thể chất khỏe mạnh cho con yêu . Theo các chuyên gia , mẹ cần bổ sung khoảng
                                400mg axit folic trước và trong khi mang thai để ngăn ngừa tối đa tình trạng dị tật ống
                                thần kinh , hở hàm ếch ...
                            </Text>
                            <Text style={styles.desc}>
                                <Text style={styles.txtBold}>Lưu ý về các loại thuốc đang sử dụng :</Text> Hãy cân nhắc lượng thuốc được nạp vào cơ thể vì
                                nhiều loại thuốc gây những tác động xấu tới quá trình phát triển của thai nhi .
                            </Text>
                            <Text style={styles.desc}>
                               <Text style={styles.txtBold}>Khám sức khỏe định kỳ :</Text> Hãy kiểm tra sức khỏe một cách đều đặn để có thể phát hiện sớm
                                những bệnh lý tiềm tàng ảnh hưởng đến thai kỳ của mẹ .
                            </Text>
                            <Text style={styles.desc}>
                               <Text style={styles.txtBold}>Quan hệ tình dục :</Text> Nhiều nghiên cứu chứng minh những khoái cảm sẽ kích thích sự rụng
                                trứng của người mẹ , giúp mẹ sớm mang thai và khiến quá trình làm tổ của thai nhi thuận
                                lợi hơn .
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </RNModal>
    );
};

export default forwardRef(PregnancyWeekByWeekPopup3);

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
        txtBold: {
            ...Fonts.inter600,
        },
    });
};
