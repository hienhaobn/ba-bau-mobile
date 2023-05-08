import React, { useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { goToAddHistoryFetus } from './src/utils';

import Images from 'assets/images';

import Button from 'components/Button/Button';
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';

const HistoryFetusScreen = () => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const bottomSheetRef = useRef<boolean>();

    const renderHeader = () => <Header title="Nhật ký thai nhi" />;

    const onImageLibraryPress = async () => {
        try {
            const image = await ImagePicker.openPicker({
                cropping: true,
                compressImageQuality: 0.5,
                mediaType: 'photo',
            });
            if (image.size > 1024 * 1024 * 2.5) {
                showCustomToast('Kích cỡ ảnh không vượt quá 2.5MB');
                return;
            }
            if (image) {
                // dispatch(userActionCreators.changeAvatar(formatImage(image)))
            }
        } catch (err) {
            if (err?.message?.includes?.('not grant library permission')) {
                showCustomToast('User did not grant library permission');
            }
        }
    };

    const onCameraPress = async () => {
        try {
            const image = await ImagePicker.openCamera({
                cropping: true,
                compressImageQuality: 0.5,
                mediaType: 'photo',
            });
            if (image) {
                // dispatch(userActionCreators.changeAvatar(formatImage(image)))
            }
        } catch (err) {
            if (err?.message?.includes?.('not grant camera permission')) {
                showCustomToast('User did not grant library permission');
            }
        }
    };

    const renderContent = () => (
        <View>
            <Text style={styles.desc}>Hãy lưu lại những khoảnh khắc đẹp với bé yêu nào mẹ bầu !</Text>
            <View>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                            <Text style={styles.week}>Tuần 39</Text>
                        </View>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                            <Text style={styles.week}>Tuần 39</Text>
                        </View>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                            <Text style={styles.week}>Tuần 39</Text>
                        </View>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                            <Text style={styles.week}>Tuần 39</Text>
                        </View>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                            <Text style={styles.week}>Tuần 39</Text>
                        </View>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                            <Text style={styles.week}>Tuần 39</Text>
                        </View>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContentContainer} activeOpacity={0.9}>
                    <Image source={Images.Babe3} style={styles.image} />
                    <View style={styles.itemContent}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemContentHeader}>Nhật ký thai nhi</Text>
                            <Text style={styles.week}>Tuần 39</Text>
                        </View>
                        <Text style={styles.itemContentDesc}>Bé yêu của mẹ nè.</Text>
                        <Text style={styles.itemContentDesc}>Ngày chụp: 12/11/2021</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderButton = () => (
        <Button title="Thêm nhật ký" customStyles={styles.button} onPress={goToAddHistoryFetus} />
    );

    return (
        <>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView
                    style={styles.wrapperContent}
                    contentContainerStyle={styles.contentContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
                {renderButton()}
            </View>
        </>
    );
};

export default HistoryFetusScreen;

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
        image: {
            width: scales(50),
            height: scales(50),
        },
        itemContentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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
            fontSize: scales(14),
            color: color.Text_Dark_1,
            lineHeight: scales(25),
        },
        itemContentDesc: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginBottom: scales(5),
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
        button: {
            marginBottom: Sizes.bottomSpace + scales(5),
            marginHorizontal: scales(15),
        },
        itemHeader: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        week: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Color_Primary,
            lineHeight: scales(25),
            marginLeft: scales(5),
        },
        blurContainer: {
            position: 'absolute',
            top: scales(0),
            right: scales(0),
            bottom: scales(0),
            left: scales(0),
        },
        popupView: {
            width: '100%',
            backgroundColor: color.white,
            borderTopRightRadius: scales(20),
            borderTopLeftRadius: scales(20),
            position: 'absolute',
            bottom: scales(0),
            paddingTop: scales(40),
        },
        chooseImg: {
            //    color: Colors[theme].white
            ...Fonts.inter600,
            fontWeight: 'bold',
            fontSize: scales(24),
            marginLeft: scales(20),
        },
        chooseOption1: {
            borderBottomWidth: scales(1),
            borderColor: color.Text_Dark_1,
            paddingTop: scales(30),
            paddingBottom: scales(20),
            paddingHorizontal: scales(20),
        },
        chooseOption: {
            borderBottomWidth: scales(1),
            borderColor: color.Text_Dark_1,
            paddingVertical: scales(20),
            paddingHorizontal: scales(20),
        },
        textOption: {
            //    color: Colors[theme].white
            ...Fonts.inter600,
            fontSize: scales(14),
        },
        buttonClose: {
            borderRadius: scales(50),
            backgroundColor: color.Color_Primary,
            marginVertical: scales(20),
            paddingVertical: scales(15),
            marginHorizontal: scales(20),
        },
        textClose: {
            ...Fonts.inter700,
            color: color.white,
            textAlign: 'center',
        },
    });
};
