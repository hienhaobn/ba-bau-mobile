import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const RoutineCheckupsScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderItem = () => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemHeader}>5 - 6 tuần</Text>
            <Text style={styles.itemTxt}>Xem tình trạng vào tử cung của phôi thai, xác định tuổi thai</Text>
            <Text style={styles.itemTitle}>Kiểm tra bắt buộc:</Text>
            <Text style={styles.itemTxt}>Siêu âm đầu dò hoặc siêu âm ổ bụng, tính chỉ số BMI, đo huyết áp</Text>
            <Text style={styles.itemTitle}>Có thể kiểm tra thêm:</Text>
            <Text style={styles.itemTxt}>Xét nghiệm máu để phát hiện một số bệnh truyền nhiễm</Text>
            <Text style={styles.itemTitle}>Có thể kiểm tra thêm:</Text>
            <Text style={styles.itemTxt}>Bổ sung Acid Folic</Text>
        </View>
    );

    const renderContent = () => (
        <ScrollView
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Text style={styles.desc}>
                Khám thai và siêu âm định kỳ đúng giai đoạn sẽ giúp các bác sĩ đánh giá được sức khỏe của mẹ và kịp thời
                phát hiện các yếu tố bất thường của bé
            </Text>
            {renderItem()}
            {renderItem()}
            {renderItem()}
            {renderItem()}
            {renderItem()}
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <Header title="Lịch khám định kỳ" />
            {renderContent()}
        </View>
    );
};

export default RoutineCheckupsScreen;

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
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            textAlign: 'center',
            marginBottom: scales(20),
        },
        itemContainer: {
            backgroundColor: color.white,
            marginBottom: scales(20),
            paddingHorizontal: scales(20),
            paddingVertical: scales(20),
            borderRadius: scales(8),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        itemHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Color_Primary,
            lineHeight: scales(23),
        },
        itemTxt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemTitle: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(16),
        },
    });
};
