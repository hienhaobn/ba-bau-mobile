import { RouteProp } from '@react-navigation/native';
import SvgIcons from 'assets/svgs';
import { hideLoading, showLoading } from 'components/Loading';
import { indexOf } from 'lodash';
import { goBack } from 'navigation/utils';
import React, { useEffect, useState } from 'react';
import {  StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';
import EventBus, { EventBusName, onPushEventBus } from 'services/event-bus';

import FoodDetailDishScene from './src/components/FoodDetailDishScene';
import FoodDetailInformationScene from './src/components/FoodDetailInformationScene';

import Images from 'assets/images';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { fetchFoodsOfCategory, removeSaveFood, saveFood } from 'states/foods/fetchFoods';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface FoodDetailSavedScreenRouteProps {
    key: string;
    title?: string;
    foodOfCategorySave?: food.FoodOfCategorySave;
}

interface IFoodDetailSavedScreenProps {
    route: RouteProp<RootNavigatorParamList, 'FoodDetailSaved'>;
}

const FoodDetailSavedScreen = (props: IFoodDetailSavedScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { foodSave } = route.params;
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [foodDetail, setFoodDetail] = useState<food.FoodOfCategory[]>([]);
    const [routes] = React.useState([
        { key: 'foodDetailInformationScene', title: 'Thông tin', foodCategory: foodSave?.idFood?.idCategory },
        { key: 'foodDetailDishScene', title: 'Món ngon', foodCategory: foodSave?.idFood?.idCategory },
    ]);

    const renderScene = SceneMap({
        foodDetailInformationScene: FoodDetailInformationScene,
        foodDetailDishScene: FoodDetailDishScene,
    });

    const getFoodDetail = async () => {
        const response = await fetchFoodsOfCategory(foodSave?.idFood?.idCategory?._id);
        setFoodDetail(response);
    };

    useEffect(() => {
        getFoodDetail();
    }, []);

    const renderHeader = () => <Header title={foodSave?.idFood?.name}  iconRight={<Text style={styles.titleRemove}>Xoá</Text>} onPressRight={onRemoveSaveFood}/>;

    const onRemoveSaveFood = async () => {
        await removeSaveFood(foodSave?._id);
        onPushEventBus(EventBusName.REMOVE_FOOD_SAVE_SUCCESS);
        goBack();

    };

    const renderTabItem = (tabProps: TabBarItemProps<FoodDetailSavedScreenRouteProps>) => {
        const { title } = tabProps.route;
        const active = indexOf(routes, tabProps.route) === tabProps.navigationState.index;
        return (
            <TouchableOpacity
                style={{
                    marginRight: scales(20),
                    paddingVertical: scales(16),
                }}
                onPress={() => {
                    setIndex(indexOf(routes, tabProps.route));
                }}>
                <Text
                    style={[
                        styles.labelTabText,
                        active ? { color: getThemeColor().Color_Primary } : { color: getThemeColor().Text_Dark_1 },
                    ]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderTabBar = (tabbarProps) => (
        <TabBar {...tabbarProps} style={styles.tabview} renderIndicator={() => null} renderTabBarItem={renderTabItem} />
    );

    const renderTabview = () => (
        <TabView
            lazy
            navigationState={{ index, routes }}
            style={{ backgroundColor: getThemeColor().Color_Bg }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );

    const renderContent = () => (
        <View style={styles.content}>
            <FastImage
                source={foodSave?.idFood?.image ? { uri: foodSave?.idFood?.image } : Images.Beef}
                style={styles.headerImg}
                resizeMode="contain"
            />
            <Text style={styles.titleHeader}>{foodSave?.idFood?.name}</Text>
            <Text style={styles.desc}>{foodDetail?.[0]?.description}</Text>
            <Text style={styles.tag}># Thuộc nhóm {foodSave?.idFood?.idCategory?.name}</Text>

            <View style={styles.line} />
            {renderTabview()}
            <View />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default FoodDetailSavedScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
            flex: 1,
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
        },
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        titleRemove: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Color_Primary,
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
