import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Button from 'components/Button/Button';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PremiumScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderContentHeader = () => (
        <View>
            <View style={styles.contentHeaderContainer}>
                <Image source={Images.GirlHome} style={styles.girlHome} />
            </View>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            <Text style={styles.title}>
                Trải nghiệm những chức năng trên với gói dịch vụ <Text style={styles.txtPrimary}>Mẹ bầu Premium</Text>
            </Text>
            <View style={styles.descContainer}>
                <Text style={styles.titleDesc}>Mua một lần dùng một đời trải nghiệm các chức năng:</Text>
                <View style={styles.itemDesc}>
                    <View style={styles.headerDesc}>
                        <Image source={Images.CheckCircle} style={styles.checkCircle} />
                        <Text style={styles.titleDesc}>Sức khỏe thai nhi</Text>
                    </View>
                    <Text style={styles.textDes}>
                        Lấy dữ liệu của bé để kiểm tra mức độ so với tiêu chuẩn rồi từ đó đưa cho mẹ bầu lời khuyên để
                        giúp bé yêu có sức khỏe ổn định nhất.
                    </Text>
                </View>

                <View style={styles.itemDesc}>
                    <View style={styles.headerDesc}>
                        <Image source={Images.CheckCircle} style={styles.checkCircle} />
                        <Text style={styles.titleDesc}>Thai giáo</Text>
                    </View>
                    <Text style={styles.textDes}>
                        Lấy dữ liệu của bé để kiểm tra mức độ so với tiêu chuẩn rồi từ đó đưa cho mẹ bầu lời khuyên để
                        giúp bé yêu có sức khỏe ổn định nhất.
                    </Text>
                </View>
            </View>
        </View>
    );

    const renderButton = () => (
        <View style={styles.buttonContainer}>
            <Button title="Thanh toán ngay" />
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.imageHome} />
                {renderContentHeader()}
                {renderContent()}
            </ScrollView>
            {renderButton()}
        </View>
    );
};

export default PremiumScreen;

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
        imageHome: {
            backgroundColor: color.Color_Primary2,
            width: Sizes.scrWidth * 2,
            borderRadius: Sizes.scrWidth,
            height: Sizes.scrWidth * 2,
            position: 'absolute',
            top: -Sizes.scrWidth / 2 - Sizes.scrWidth,
            left: -Sizes.scrWidth / 2,
        },
        content: {
            marginTop: scales(15),
        },
        contentHeaderContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: Sizes.scrWidth / 4,
        },
        girlHome: {
            marginTop: scales(10),
            width: scales(120),
            height: scales(120),
            backgroundColor: color.Color_Primary,
            borderRadius: scales(120),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        txtPrimary: {
            color: color.Color_Primary,
        },
        descContainer: {
            marginTop: scales(20),
            backgroundColor: color.Color_Bg,
            padding: scales(10),
            borderRadius: scales(6),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        titleDesc: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            lineHeight: scales(19),
        },
        checkCircle: {
            width: scales(20),
            height: scales(20),
            marginRight: scales(10),
        },
        headerDesc: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemDesc: {
            marginTop: scales(10),
        },
        textDes: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(19),
        },
        buttonContainer: {
            marginHorizontal: scales(15),
        },
    });
};
