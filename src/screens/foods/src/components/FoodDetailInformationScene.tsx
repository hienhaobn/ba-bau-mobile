import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import SvgIcons from 'assets/svgs';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Images from '../../../../assets/images';

interface IFoodDetailInformationSceneProps {
    foodCategory: food.FoodCategory;
}

const FoodDetailInformationScene = (props: IFoodDetailInformationSceneProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { foodCategory } = props;

    const renderIconMonthly = (status: string) => {
        if (status === 'ERR') {
            return <SvgIcons.IcCloseRed />;
        } else if (status === 'WARNING') {
            return <SvgIcons.IcWarning />;
        } else if (status === 'OK') {
            return <SvgIcons.IcTickGreen />;
        }
    };

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.emptyImage} resizeMode="contain" />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );


    const renderContent = () => (
        <View>
            {
                foodCategory?.monthlyData.length > 0 ? foodCategory?.monthlyData?.map((element) => (
                    <View key={element._id}>
                        <View style={styles.headerTitle}>
                            {renderIconMonthly(element?.status)}
                            <Text style={styles.month}>{element?.month}</Text>
                        </View>
                        <Text style={styles.desc}>
                            {element?.description}
                        </Text>
                    </View>
                )) : renderEmptyComponent()
            }
        </View>
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
        emptyImage: {
            width: scales(200),
            height: scales(200),
        },
        emptyContainer: {
            alignItems: 'center',
        },
        noData: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_2,
        },
    });
};
