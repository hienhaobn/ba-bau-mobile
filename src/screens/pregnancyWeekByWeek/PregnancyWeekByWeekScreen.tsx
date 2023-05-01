import React, { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import PregnancyWeekByWeekPopup1, { IPregnancyWeekByWeekPopup1Ref } from './src/components/PregnancyWeekByWeekPopup1';
import PregnancyWeekByWeekPopup2, { IPregnancyWeekByWeekPopup2Ref } from './src/components/PregnancyWeekByWeekPopup2';
import PregnancyWeekByWeekPopup3, { IPregnancyWeekByWeekPopup3Ref } from './src/components/PregnancyWeekByWeekPopup3';

import Images from 'assets/images';
import DropdownComponent from 'components/Dropdown';
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const dataDropdown = [
    { label: 'Tuần 1', value: '1' },
    { label: 'Tuần 2', value: '2' },
    { label: 'Tuần 3', value: '3' },
    { label: 'Tuần 4', value: '4' },
    { label: 'Tuần 5', value: '5' },
    { label: 'Tuần 6', value: '6' },
    { label: 'Tuần 7', value: '7' },
    { label: 'Tuần 8', value: '8' },
    { label: 'Tuần 9', value: '9' },
    { label: 'Tuần 10', value: '10' },
    { label: 'Tuần 11', value: '11' },
    { label: 'Tuần 12', value: '12' },
    { label: 'Tuần 13', value: '13' },
    { label: 'Tuần 14', value: '14' },
    { label: 'Tuần 15', value: '15' },
    { label: 'Tuần 16', value: '16' },
    { label: 'Tuần 17', value: '17' },
    { label: 'Tuần 18', value: '18' },
    { label: 'Tuần 19', value: '19' },
    { label: 'Tuần 20', value: '20' },
    { label: 'Tuần 21', value: '21' },
    { label: 'Tuần 22', value: '22' },
    { label: 'Tuần 23', value: '23' },
    { label: 'Tuần 24', value: '24' },
    { label: 'Tuần 25', value: '25' },
    { label: 'Tuần 26', value: '26' },
    { label: 'Tuần 27', value: '27' },
    { label: 'Tuần 28', value: '28' },
    { label: 'Tuần 29', value: '29' },
    { label: 'Tuần 30', value: '30' },
    { label: 'Tuần 31', value: '31' },
    { label: 'Tuần 32', value: '32' },
    { label: 'Tuần 33', value: '33' },
    { label: 'Tuần 34', value: '34' },
    { label: 'Tuần 35', value: '35' },
    { label: 'Tuần 36', value: '36' },
    { label: 'Tuần 37', value: '37' },
    { label: 'Tuần 38', value: '38' },
    { label: 'Tuần 39', value: '39' },
    { label: 'Tuần 40', value: '40' },
];

const PregnancyWeekByWeekScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    // const [showMore, setShowMore] = useState<''>();
    const refPregnancyWeekByWeekPopup1 = useRef<IPregnancyWeekByWeekPopup1Ref>(null);
    const refPregnancyWeekByWeekPopup2 = useRef<IPregnancyWeekByWeekPopup2Ref>(null);
    const refPregnancyWeekByWeekPopup3 = useRef<IPregnancyWeekByWeekPopup3Ref>(null);

    const renderHeader = () => <Header title="Thai kỳ theo tuần" />;

    const renderContentHeader = () => (
        <View style={styles.contentContentContainer}>
            <Text style={styles.textTime}>Thời gian: </Text>
            <View style={{ flex: 1 }}>
                <DropdownComponent data={dataDropdown} placeholder="Tuần" searchPlaceholder="Tìm kiếm tuần" />
            </View>
        </View>
    );

    const renderItems = () => (
        <View style={styles.itemContainer}>
            <Image source={Images.PregnancyWeek1} style={styles.imageWeek} />

            <View>
                <View style={styles.itemHeaderContainer}>
                    <Image source={Images.PregnancyBaby} style={styles.iconItemHeader} />
                    <Text style={styles.titleItemHeader}>Bé yêu</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>
                        Chào mẹ, vậy là mẹ đã chính thức vào tuần đầu tiên của hành trình 40 tuần ấp ủ “mầm sống yêu
                        thương” rồi đấy! Trong tuần đầu...
                    </Text>
                    <Text style={styles.desc}>
                        Chào mẹ, vậy là mẹ đã chính thức bước vào tuần đầu tiên của hành trình 40 tuần ấp ủ “ mầm sống
                        yêu thương ” rồi đấy ! Trong tuần đầu tiên này , thậm chí bé yêu còn chưa hình thành , tuy nhiên
                        bác sĩ vẫn tính đây là một phần quá trình phát triển của thai nhi . Ở tuần thai đầu tiên , hãy
                        lưu ý những thông tin sau để bé yêu phát triển khỏe mạnh mẹ nhé !
                    </Text>
                    <Text style={styles.desc}>
                        Hành trình mang thai đã bắt đầu khởi động từ ngày đầu tiên của kỳ kinh nguyệt cuối cùng . Bác sĩ
                        sẽ tính tuổi thai dựa theo khung thời gian này thay vì tuổi thực của em bé . Bởi vì ngay cả các
                        chuyên gia nhiều kinh nghiệm nhất cũng khó có thể xác định được thời điểm rụng trứng và thụ tinh
                        thành công của mẹ để đo tuổi thực của thai một cách chính xác . Vậy nên , có những mẹ bầu sinh
                        em bé vào tuần thứ 40 ( tuổi thai thật khoảng 38 , 39 ) , và cũng có những mẹ bầu sinh con vào
                        tuần thứ 42 ( tuổi thai thật khoảng 40 ).
                    </Text>
                    <Text style={styles.desc}>
                        Trong tuần thai 01 , em bé có thể chưa được hình thành vì sự rụng trứng của người mẹ thường diễn
                        ra từ ngày 12 - 18 nếu mẹ có chu kỳ kinh nguyệt đều đặn và kéo dài khoảng 30 ngày . Do vậy ,
                        thường thì thai nhi sẽ được hình thành trong tuần thứ 3 nếu trứng được thụ tinh thành công .
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.moreContainer}
                    onPress={() => refPregnancyWeekByWeekPopup1.current.showModal()}>
                    <Text style={styles.more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line} />

            <View>
                <View style={styles.itemHeaderContainer}>
                    <Image source={Images.Pregnant} style={styles.iconItemHeader} />
                    <Text style={styles.titleItemHeader}>Thay đổi của mẹ</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>
                        Trong tuần thai đầu, sự rụng trứng của người mẹ vẫn chưa diễn ra nên cơ thể sẽ không có nhiều sự
                        thay đổi. Thường thì ...
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.moreContainer}
                    onPress={() => refPregnancyWeekByWeekPopup2.current.showModal()}>
                    <Text style={styles.more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line} />

            <View>
                <View style={styles.itemHeaderContainer}>
                    <Image source={Images.Consulting} style={styles.iconItemHeader} />
                    <Text style={styles.titleItemHeader}>Lời khuyên</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>
                        Hãy rèn cho mình các thói quen lành mạnh: Ăn uống đủ chất đủ bữa, ngủ đúng giờ, tránh làm việc
                        quá căng...
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.moreContainer}
                    onPress={() => refPregnancyWeekByWeekPopup3.current.showModal()}>
                    <Text style={styles.more}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderContent = () => (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}>
            {renderContentHeader()}
            {renderItems()}
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
            <PregnancyWeekByWeekPopup1 ref={refPregnancyWeekByWeekPopup1} />
            <PregnancyWeekByWeekPopup2 ref={refPregnancyWeekByWeekPopup2} />
            <PregnancyWeekByWeekPopup3 ref={refPregnancyWeekByWeekPopup3} />
        </View>
    );
};

export default PregnancyWeekByWeekScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapperContent: {
            flexGrow: 1,
            paddingHorizontal: scales(15),
        },
        contentContainer: {
            paddingBottom: scales(30),
            paddingTop: scales(15),
        },
        contentContentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        weekContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        week: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(3),
            marginRight: scales(5),
        },
        textTime: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
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
    });
};
