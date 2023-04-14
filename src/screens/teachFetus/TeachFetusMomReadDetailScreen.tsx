import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const TeachFetusMomReadDetailScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Truyện kể cho con" />;

    const renderContent = () => (
        <View>
            <Image source={Images.TruyenCayTre2} style={styles.headerImg} resizeMode="contain" />
            <Text style={styles.titleHeader}>Truyện</Text>
            <Text style={styles.desc}>Những câu chuyện thú vị mẹ kể cho con mỗi ngày</Text>
            <View style={styles.itemContentContainer}>
                <Text style={styles.contentHeader}>Nàng công chúa ống tre</Text>
                <Text style={styles.contentDesc}>
                    Truyện kể rằng ngày xưa có một chú bé tiều phu đần bắt gặp một cô gái xinh xắn trong một ống tre tên
                    là Bích Hồng. Ngày ngày chú bé cố gắng để cưa đổ cây tre nhằm cưới được cô gái trong ống tre đó về
                    làm vợ, nhưng khổ nỗi chú bé bị đần. Hết truyện! Truyện kể rằng ngày xưa có một chú bé tiều phu đần
                    bắt gặp một cô gái xinh xắn trong một ống tre tên là Bích Hồng. Ngày ngày chú bé cố gắng để cưa đổ
                    cây tre nhằm cưới được cô gái trong ống tre đó về làm vợ, nhưng khổ nỗi chú bé bị đần. Hết truyện!
                    Truyện kể rằng ngày xưa có một chú bé tiều phu đần bắt gặp một cô gái xinh xắn trong một ống tre tên
                    là Bích Hồng. Ngày ngày chú bé cố gắng để cưa đổ cây tre nhằm cưới được cô gái trong ống tre đó về
                    làm vợ, nhưng khổ nỗi chú bé bị đần. Hết truyện! Truyện kể rằng ngày xưa có một chú bé tiều phu đần
                    bắt gặp một cô gái xinh xắn trong một ống tre tên là Bích Hồng. Ngày ngày chú bé cố gắng để cưa đổ
                    cây tre nhằm cưới được cô gái trong ống tre đó về làm vợ, nhưng khổ nỗi chú bé bị đần. Hết truyện!
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {renderContent()}
            </ScrollView>
        </View>
    );
};

export default TeachFetusMomReadDetailScreen;

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
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
            marginBottom: scales(15),
        },
        headerImg: {
            width: Sizes.scrWidth - scales(30),
            height: scales(188),
            marginBottom: scales(15),
        },
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemContentContainer: {
            backgroundColor: color.Color_Bg,
            borderRadius: scales(8),
            paddingVertical: scales(15),
            paddingHorizontal: scales(12),
            marginBottom: scales(15),

            shadowColor: color.Text_Dark_1,
            shadowOffset: { width: -1, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        contentHeader: {
            ...Fonts.inter600,
            fontSize: scales(18),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
            textAlign: 'center',
            marginBottom: scales(15),
        },
        contentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(19),
        },
    });
};
