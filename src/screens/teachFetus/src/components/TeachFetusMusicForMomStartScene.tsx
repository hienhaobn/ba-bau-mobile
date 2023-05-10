import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';
import SoundPlayer from 'react-native-sound-player';

import Images from 'assets/images';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { fetchMusicForMonths } from 'states/premium/fetchMusic';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const TeachFetusMusicForMomStartScene = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [music, setMusic] = useState<premium.MusicPremium[]>([]);
    const [playFromItemId, setPlayFromItemId] = useState<string>('');

    const getMusicForFirst3Months = async () => {
        const response = await fetchMusicForMonths('first');
        setMusic(response?.musices);
    };

    useEffect(() => {
        getMusicForFirst3Months();
    }, []);

    const playTrack = (item: premium.MusicPremium) => {
        try {
            SoundPlayer.playUrl(item?.audio);
            setPlayFromItemId(item?._id);
        } catch (e) {
            console.log(`cannot play the sound file`, e);
        }
    };

    const renderItem = (item: premium.MusicPremium) => (
        <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9} onPress={() => playTrack(item)}>
            <FastImage source={item?.image ? { uri: item?.image } : Images.Babe} style={styles.image} />
            <View style={styles.itemContent}>
                <Text style={styles.itemContentHeader}>{item?.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Image source={Images.NoData} style={styles.imageEmpty} resizeMode='contain' />
            <Text style={styles.noData}>Không có dữ liệu</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={music}
                renderItem={(item) => renderItem(item.item)}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={renderEmptyComponent}
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default TeachFetusMusicForMomStartScene;

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
        titleHeader: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        desc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
            marginBottom: scales(15),
        },
        image: {
            width: scales(50),
            height: scales(50),
        },
        itemContentContainer: {
            flexDirection: 'row',
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
        itemContent: {
            flex: 1,
            marginLeft: scales(10),
        },
        itemContentHeader: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemContentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        headerImg: {
            width: Sizes.scrWidth - scales(30),
            height: scales(188),
            marginBottom: scales(15),
        },
        imageEmpty: {
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
