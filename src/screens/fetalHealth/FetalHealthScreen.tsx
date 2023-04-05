import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';

import Button from 'components/Button/Button';
import Header from 'components/Header';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const FetalHealthScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const renderHeader = () => <Header title="Sức khỏe thai nhi" />;

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.image} resizeMode='contain'/>
            <Text style={styles.noData}>Không có dữ liệu</Text>
            <Button title="Nhập dữ liệu" customStyles={styles.buttonEnterData} />
            <Text style={styles.fetchData}>Lấy dữ liệu khám định kỳ</Text>
        </View>
    );

    const renderItem = () => (
        <View>
            <Text>1</Text>
        </View>
    );

    const renderContent = () => (
        <FlatList
            data={[]}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
            ListEmptyComponent={renderEmptyComponent}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default FetalHealthScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        image: {
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
        buttonEnterData: {
            paddingHorizontal: scales(40),
            marginVertical: scales(30),
        },
        fetchData: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Color_Primary,
        },
    });
};
