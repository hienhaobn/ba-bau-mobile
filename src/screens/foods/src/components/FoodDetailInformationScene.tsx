import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import SvgIcons from 'assets/svgs';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const FoodDetailInformationScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderContent = () => (
        <ScrollView
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.headerTitle}>
                <SvgIcons.IcTickGreen />
                <Text style={styles.month}>3 tháng đầu</Text>
            </View>
            <Text style={styles.desc}>
                Thịt bò là thực phẩm cung cấp chất sắt rất lớn , giúp mẹ phòng chống thiếu máu và hỗ trợ thai nhi . Thịt
                bò còn giúp mẹ ăn ngon miệng , tăng sức đề kháng và giúp thai nhi phát triển khoẻ mạnh . Nhưng mẹ hãy
                luôn nhớ nên ăn vừa đủ và bổ sung các thực phẩm dinh dưỡng khác nữa nhé !{' '}
            </Text>
            <View style={styles.headerTitle}>
                <SvgIcons.IcTickGreen />
                <Text style={styles.month}>3 tháng giữa</Text>
            </View>
            <Text style={styles.desc}>
                Sau khi sinh , thịt bò là thực phẩm an toàn cung cấp nguồn dinh dưỡng dồi dào giúp mẹ nhanh chóng phục
                hồi sức khỏe . Ngoài ra , ăn thịt bò còn hỗ trợ mẹ rất nhiều trong việc kiểm soát cân nặng vì thịt bò có
                chứa Cytocilin – chất giúp đốt cháy chất béo . Hơn nữa , một nửa chất béo trong thịt bò là chất béo đơn
                nguyên không no ( không bão hòa ) vì vậy lượng cholesterol của mẹ sẽ được giữ ở trạng thái ổn định và an
                toàn.
            </Text>
            <View style={styles.headerTitle}>
                <SvgIcons.IcTickGreen />
                <Text style={styles.month}>3 tháng cuối</Text>
            </View>
            <Text style={styles.desc}>
                Mẹ con bú ăn thịt bò rất tốt , vừa giúp mẹ có sức mà cũng tăng cường nguồn sữa mẹ , giúp bé nhận được
                nhiều chất dinh dưỡng có ích hơn .
            </Text>
        </ScrollView>
    );
    return <View style={styles.container}>{renderContent()}</View>;
};

export default FoodDetailInformationScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        headerTitle: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        month: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginLeft: scales(5),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: 20,
            marginVertical: scales(10),
        },
    });
};
