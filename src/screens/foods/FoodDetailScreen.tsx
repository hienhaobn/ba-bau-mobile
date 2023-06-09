import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import FoodDetailDishScene from './src/components/FoodDetailDishScene';
import FoodDetailInformationScene from './src/components/FoodDetailInformationScene';

import Images from 'assets/images';
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { RootNavigatorParamList } from 'navigation/types';
import { fetchFoodsOfCategory } from 'states/foods/fetchFoods';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IFoodDetailScreenProps {
    route: RouteProp<RootNavigatorParamList, 'FoodDetail'>;
}

enum FoodDetailTab {
    info = 'info',
    dish = 'dish',
}

const TABS = [
    {
        key: FoodDetailTab.info,
        title: 'Thông tin',
    },
    {
        key: FoodDetailTab.dish,
        title: 'Món ngon',
    },
]

const FoodDetailScreen = (props: IFoodDetailScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { foodCategory } = route.params;
    const [foodDetail, setFoodDetail] = useState<food.FoodOfCategory[]>([]);
    const [currentTab, setCurrentTab] = useState<string>(FoodDetailTab.info);

    const getFoodDetail = async () => {
        const response = await fetchFoodsOfCategory(foodCategory?._id);
        setFoodDetail(response);
    };

    useEffect(() => {
        getFoodDetail();
    }, []);

    const renderHeader = () => <Header title={foodCategory?.name} />;

    const renderTabSelect = () => (
        <View style={{ flexDirection: 'row' }}>
            {
                TABS.map((tab, index) => {
                    const isFocus = tab.key === currentTab;
                    return (
                        <TouchableOpacity
                            style={{
                                marginRight: scales(20),
                                paddingVertical: scales(16),
                            }}
                            onPress={() => {
                                setCurrentTab(tab.key)
                            }}
                            key={index.toString()}
                        >
                            <Text
                                style={[
                                    styles.labelTabText,
                                    isFocus ? { color: getThemeColor().Color_Primary } : { color: getThemeColor().Text_Dark_1 },
                                ]}>
                                {tab.title}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    );

    const renderListHeader = () => (
        <View style={styles.content}>
            <FastImage
                source={foodCategory?.image ? { uri: foodCategory?.image } : Images.Beef}
                style={styles.headerImg}
                resizeMode='cover'
            />
            <Text style={styles.titleHeader}>{foodCategory?.name}</Text>
            <Text style={styles.desc}>{foodDetail?.[0]?.description}</Text>
            <Text style={styles.tag}># Thuộc nhóm {foodCategory?.idRoot?.name}</Text>
            <View style={styles.line} />
            <View />
        </View>
    );

    const renderContentTab = () => (
        <>
            {currentTab === FoodDetailTab.info ? <FoodDetailInformationScene foodCategory={foodCategory} /> : <FoodDetailDishScene foodCategory={foodCategory} />}
        </>
    )

    const renderListFooter = () => (
        <>
            {renderTabSelect()}
            {renderContentTab()}
        </>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <KeyboardAwareScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                extraHeight={scales(125)}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                enableOnAndroid
            >

                <ScrollView>
                    {renderListHeader()}
                    {renderListFooter()}
                </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default FoodDetailScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            flex: 1,
        },
        wrapperContent: {
            flexGrow: 1,
            backgroundColor: color.Color_Bg,
        },
        contentContainer: {
            paddingBottom: scales(30),
            marginHorizontal: scales(15),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(20),
        },
        headerImg: {
            width: Sizes.scrWidth - scales(30),
            height: scales(188),
            marginBottom: scales(15),
            borderRadius: scales(15),
        },
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        tag: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Color_Blue,
            marginBottom: scales(15),
        },
        tabview: {
            backgroundColor: color.Color_Bg,
            shadowColor: 'transparent',
        },
        labelTabText: {
            ...Fonts.inter700,
            fontSize: scales(17),
            color: color.Text_Dark_1,
        },
        line: {
            borderBottomColor: getThemeColor().Color_Gray6,
            borderBottomWidth: 5,
        },
    });
};
