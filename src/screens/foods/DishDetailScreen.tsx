import { indexOf } from 'lodash';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabBarItemProps, TabView } from 'react-native-tab-view';

import DishDetailIngredientScene from './src/components/DishDetailIngredientScene';
import DishDetailMakingScene from './src/components/DishDetailMakingScene';
import DishDetailVideoScene from './src/components/DishDetailVideoScene';

import Images from 'assets/images';

import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface RouteProps {
    key: string;
    title?: string;
}

const renderScene = SceneMap({
    dishDetailIngredientScene: DishDetailIngredientScene,
    dishDetailMakingScene: DishDetailMakingScene,
    dishDetailVideoScene: DishDetailVideoScene,
});

const DishDetailScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'dishDetailIngredientScene', title: 'Nguyên liệu' },
        { key: 'dishDetailMakingScene', title: 'Cách làm' },
        { key: 'dishDetailVideoScene', title: 'Video' },
    ]);

    const renderHeader = () => <Header title="Thịt bò xào dưa chua" />;

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
                }}
            >
                <Text
                    style={[
                        styles.labelTabText,
                        active ? { color: getThemeColor().Color_Primary } : { color: getThemeColor().Text_Dark_1 },
                    ]}
                >
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
            <Text style={styles.titleHeader}>Thịt bò xào dưa chua</Text>
            <Text style={styles.tag}>#duachua #thitbo</Text>

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

export default DishDetailScreen;

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
