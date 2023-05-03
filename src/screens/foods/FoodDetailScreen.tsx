import { RouteProp } from '@react-navigation/native';
import { indexOf } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';

import FoodDetailDishScene from './src/components/FoodDetailDishScene';
import FoodDetailInformationScene from './src/components/FoodDetailInformationScene';

import Images from 'assets/images';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { fetchFoodsOfCategory } from 'states/foods/fetchFoods';

export interface RouteProps {
    key: string;
    title?: string;
}

interface IFoodDetailScreenProps {
    route: RouteProp<RootNavigatorParamList, 'FoodDetail'>;
}

const renderScene = SceneMap({
    foodDetailInformationScene: FoodDetailInformationScene,
    foodDetailDishScene: FoodDetailDishScene,
});

const FoodDetailScreen = (props: IFoodDetailScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { foodId } = route.params;
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [foodDetail, setFoodDetail] = useState(null);
    const [routes] = React.useState([
        { key: 'foodDetailInformationScene', title: 'Thông tin' },
        { key: 'foodDetailDishScene', title: 'Món ngon' },
    ]);

    const getFoodDetail = async () => {
        const response = await fetchFoodsOfCategory(foodId);
        console.log('response', response);
        setFoodDetail(response)
    };

    useEffect(() => {
        getFoodDetail();
    }, []);

    const renderHeader = () => <Header title="Thịt bò" />;

    const renderTabItem = (tabProps: TabBarItemProps<RouteProps>) => {
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
            <Image source={Images.Beef2} style={styles.headerImg} resizeMode="contain" />
            <Text style={styles.titleHeader}>Thịt bò</Text>
            <Text style={styles.desc}>
                Chất đạm, Chất béo, Sắt, Kẽm, Natri, Vitamin D, Vitamin B6, Vitamin B12, Magie
            </Text>
            <Text style={styles.tag}># Thuộc nhóm Thịt</Text>

            <View style={styles.line} />
            {renderTabview()}
            {/* <View style={styles.itemContentContainer}>
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
            </View> */}
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

export default FoodDetailScreen;

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
