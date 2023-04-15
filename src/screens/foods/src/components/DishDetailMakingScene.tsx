import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const DishDetailMakingScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderContent = () => (
        <ScrollView
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View>
                <Text style={styles.desc}>
                    <Text style={styles.txtBold}>Bước 1 : </Text>Thịt bò rửa sạch , băm nhuyễn , thêm xì dầu , cho bột
                    năng pha loãng nước và dầu vào trộn đều.
                </Text>
                <Text style={styles.desc}>
                    <Text style={styles.txtBold}>Bước 2 : </Text> Dưa chua rửa sạch , vắt hết nước rồi cắt nhỏ để sẵn.
                </Text>
                <Text style={styles.desc}>
                    {' '}
                    <Text style={styles.txtBold}>Bước 3 : </Text> Cho dầu vào trong chảo , nấu nóng lên , cho thịt bò
                    vào xào chín , vớt ra đĩa .
                </Text>
                <Text style={styles.desc}>
                    <Text style={styles.txtBold}>Bước 4 : </Text> : Cho dầu vào chảo đun nóng , cho dưa chua vào xào ,
                    thêm đường và một ít muối . Cho thịt bò vào trộn đều cùng dưa chua là xong .
                </Text>
                <Text style={styles.txtBold}>Yêu cầu thành phẩm</Text>
                <Text style={styles.desc}>
                    Món ngon sau khi hoàn thành sẽ có vị ch ua của dưa kết hợp với thịt bò mềm thơm ăn kèm cơm nóng ngon
                    miễn chê . Chúc mẹ làm thành công và có một bữa ăn thực sự chất lượng !
                </Text>
            </View>
        </ScrollView>
    );
    return <View style={styles.container}>{renderContent()}</View>;
};

export default DishDetailMakingScene;

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
        txtBold: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: 20,
        },
    });
};
