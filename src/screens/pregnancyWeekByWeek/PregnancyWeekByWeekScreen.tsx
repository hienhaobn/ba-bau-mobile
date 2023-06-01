import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from 'assets/images';
import DropdownComponent from 'components/Dropdown';
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { apiPregnancyById, apiPregnancyWeekByWeek } from 'states/fetal/fetchPregnancyWeek';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const PregnancyWeekByWeekScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [showMoreBaby, setShowMoreBaby] = useState<boolean>(false);
    const [showMoreMomChange, setShowMoreMomChange] = useState<boolean>(false);
    const [showMoreSupport, setShowMoreSupport] = useState<boolean>(false);
    const [pregnancies, setPregnancies] = useState<fetal.Post[]>([]);
    const [pregnancy, setPregnancy] = useState<fetal.Post>(null);

    useEffect(() => {
        getPregnancyWeek();
    }, []);

    useEffect(() => {
        if (pregnancies?.length > 0 && !pregnancy) {
            console.log('vao roi');
            getFirstTimePregnancy();
        }
    }, [pregnancies]);

    const getPregnancyWeek = async () => {
        const res = await apiPregnancyWeekByWeek();
        setPregnancies(res);
    };

    const getFirstTimePregnancy = async () => {
        const dataDropDown = getDataDropdown();
        const response = await apiPregnancyById(dataDropDown[0].value);
        setPregnancy(response);
    }

    const getPregnancyWeekById = async (id: string) => {
        const res = await apiPregnancyById(id);
        setPregnancy(res);
    };

    const getDataDropdown = (): { value: string, label: string }[] => {
        let dataDropdown = [];
        const dataSort = pregnancies?.sort((a, b) => a.week - b.week);
        dataSort?.map(element => {
            dataDropdown.push({ value: element._id, label: `Tuần ${element.week}` })
        });
        return dataDropdown;
    };

    const renderHeader = () => <Header title="Thai kỳ theo tuần" />;

    const renderContentHeader = () => (
        <View style={styles.contentContentContainer}>
            <Text style={styles.textTime}>Thời gian: </Text>
            <View style={{ flex: 1 }}>
                <DropdownComponent
                    data={getDataDropdown()}
                    callback={(id: string) => getPregnancyWeekById(id)}
                    placeholder="Tuần"
                    searchPlaceholder="Tìm kiếm tuần"
                />
            </View>
        </View>
    );

    const renderItems = () => (
        <View style={styles.itemContainer}>
            <FastImage source={pregnancy?.image ? { uri: pregnancy?.image } : Images.PregnancyWeek1} style={styles.imageWeek} />

            <View>
                <View style={styles.itemHeaderContainer}>
                    <Image source={Images.PregnancyBaby} style={styles.iconItemHeader} />
                    <Text style={styles.titleItemHeader}>Bé yêu</Text>
                </View>
                <View style={styles.descContainer}>
                    {showMoreBaby ? (<Text style={styles.desc}>{pregnancy?.contentBaby || ''}</Text>)
                        : (<Text style={styles.desc}>{`${pregnancy?.contentBaby?.slice(0, 150) || ''}...`}</Text>)
                    }
                </View>
                {!showMoreBaby ? (
                    <TouchableOpacity style={styles.moreContainer} onPress={() => setShowMoreBaby(true)}>
                        <Text style={styles.more}>Xem thêm</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.moreContainer} onPress={() => setShowMoreBaby(false)}>
                        <Text style={styles.more}>Thu gọn</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.line} />

            <View>
                <View style={styles.itemHeaderContainer}>
                    <Image source={Images.Pregnant} style={styles.iconItemHeader} />
                    <Text style={styles.titleItemHeader}>Thay đổi của mẹ</Text>
                </View>
                <View style={styles.descContainer}>
                    {showMoreMomChange ? (<Text style={styles.desc}>{pregnancy?.contentchangeMom || ''}</Text>)
                        : (<Text style={styles.desc}>{`${pregnancy?.contentchangeMom?.slice(0, 150) || ''}...`}</Text>)
                    }
                </View>
                {!showMoreMomChange ? (
                    <TouchableOpacity style={styles.moreContainer} onPress={() => setShowMoreMomChange(true)}>
                        <Text style={styles.more}>Xem thêm</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.moreContainer} onPress={() => setShowMoreMomChange(false)}>
                        <Text style={styles.more}>Thu gọn</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.line} />

            <View>
                <View style={styles.itemHeaderContainer}>
                    <Image source={Images.Consulting} style={styles.iconItemHeader} />
                    <Text style={styles.titleItemHeader}>Lời khuyên</Text>
                </View>
                <View style={styles.descContainer}>
                    {showMoreSupport ? (<Text style={styles.desc}>{pregnancy?.contentAdvice || ''}</Text>)
                        : (<Text style={styles.desc}>{`${pregnancy?.contentAdvice?.slice(0, 150) || ''}...`}</Text>)
                    }
                </View>
                {!showMoreSupport ? (
                    <TouchableOpacity style={styles.moreContainer} onPress={() => setShowMoreSupport(true)}>
                        <Text style={styles.more}>Xem thêm</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.moreContainer} onPress={() => setShowMoreSupport(false)}>
                        <Text style={styles.more}>Thu gọn</Text>
                    </TouchableOpacity>
                )}
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
            borderRadius: scales(8),
            resizeMode: 'cover',
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
        txtBold: {
            ...Fonts.inter600,
        },
    });
};
