import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';
import BottomSheet, { CustomBottomSheetRefType } from 'components/BottomSheet/BottomSheet';
import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { hideLoading, showLoading } from 'components/Loading';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { RootNavigatorParamList } from 'navigation/types';
import { goBack } from 'navigation/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { EventBusName, onPushEventBus } from 'services/event-bus';
import { createFetalHistory, removeFetalHealthy, updateFetalHealthy } from 'states/fetal/fetchFetalHistory';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { formatImage } from 'utils/image';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';

interface ImageChoose {
    uri: string;
    name: string;
    type: string;
}

interface AddHistoryFetusScreenProps {
    route: RouteProp<RootNavigatorParamList, 'AddHistoryFetus'>;
}

const AddHistoryFetusScreen = (props: AddHistoryFetusScreenProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { route } = props;
    const { action, history } = route.params;

    const [selectDateVisible, setSelectDateVisible] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(action === 'EDIT' ? moment(history?.datePhoto ? history?.datePhoto : moment().toDate()).toDate() : moment().toDate());
    const [week, setWeek] = useState<string>(action === 'EDIT' ? `${history?.weeksOfPregnancy}` : '');
    const [note, setNote] = useState<string>(action === 'EDIT' ? history?.note || '' : '');
    const [imageChoose, setImageChoose] = useState<ImageChoose>( null);
    const bottomSheetRef = useRef<CustomBottomSheetRefType>(null);

    const onCreateFetalHistory = async () => {
        let body = { note, weeksOfPregnancy: week, file: {}, datePhoto: moment(date).toDate().toDateString() };
        if (imageChoose) {
            body = { ...body, file: imageChoose }
        }
        showLoading();
        const response = await createFetalHistory(body);
        hideLoading();

        if (response) {
            onPushEventBus(EventBusName.CREATE_FETAL_HISTORY_SUCCESS);
            goBack();
        }
    };

    const onUpdateFetalHistory = async () => {
        let body = { note, weeksOfPregnancy: week, file: {}, datePhoto: moment(date).toDate().toDateString() };
        if (imageChoose) {
            body = { ...body, file: imageChoose }
        }
        showLoading();
        const response = await updateFetalHealthy(body, history._id);
        hideLoading();
        if (response) {
            onPushEventBus(EventBusName.CREATE_FETAL_HISTORY_SUCCESS);
            goBack();
        }
    };

    const onHistory = async () => {
        if (action === 'EDIT') {
            await onUpdateFetalHistory();
        } else {
            await onCreateFetalHistory();
        }
    };

    const showBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.open();
        }
    };

    const dismissBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.dismiss();
        }
    };

    const onImageLibraryPress = async () => {
        try {
            const image = await ImagePicker.openPicker({
                mediaType: 'photo',
            });
            if (image.size > 1024 * 1024 * 2.5) {
                showCustomToast('Kích cỡ ảnh không vượt quá 2.5MB');
                return;
            }
            const imageCrop = await ImagePicker.openCropper({
                path: image.path,
                cropping: true,
                compressImageQuality: 0.5,
                mediaType: 'photo',
                height: 200,
                width: 200,
                cropperCircleOverlay: true,
            });
            if (imageCrop) {
                setImageChoose(formatImage(imageCrop));
                dismissBottomSheet();
            }
        } catch (err) {
            if (err?.message?.includes?.('not grant library permission')) {
                showCustomToast('Người dùng không cấp quyền cho thư viện');
            }
        }
    };

    const onCameraPress = async () => {
        try {
            const image = await ImagePicker.openCamera({
                cropping: true,
                compressImageQuality: 0.5,
                mediaType: 'photo',
                height: 200,
                width: 200,
                cropperCircleOverlay: true,
            });
            if (image) {
                setImageChoose(formatImage(image));
                dismissBottomSheet();
            }
        } catch (err) {
            if (err?.message?.includes?.('not grant camera permission')) {
                showCustomToast('Người dùng không cấp quyền cho thư viện');
            }
        }
    };

    const renderChooseImage = () => (
        <BottomSheet
            isDynamicSnapPoints
            ref={bottomSheetRef}
            handleCloseModal={dismissBottomSheet}
            enablePanDownToClose>
            <View style={styles.popupView}>
                <Text style={styles.chooseImg}>Chọn ảnh</Text>

                <TouchableOpacity onPress={onImageLibraryPress}>
                    <View style={styles.chooseOption1}>
                        <Text style={styles.textOption}>Chọn ảnh từ thư viện</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCameraPress}>
                    <View style={styles.chooseOption}>
                        <Text style={styles.textOption}>Chụp ảnh</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={dismissBottomSheet}>
                    <View style={styles.buttonClose}>
                        <Text style={styles.textClose}>Đóng</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );

    const renderRightIcon = () => {
        if (action === 'EDIT') {
            return (
                <View style={styles.iconRight}>
                    <SvgIcons.IcRemove width={scales(17)} height={scales(17)} color={getThemeColor().white} />
                </View>
            );
        }
        return null;
    };

    const onPressRight = async () => {
        if (action === 'EDIT') {
            // call api
            await removeFetalHealthy(history?._id)
            onPushEventBus(EventBusName.REMOVE_FETAL_HEALTHY_SUCCESS);
            goBack();
        }
    };

    const renderHeader = () => (
        <Header title="Nhật ký thai nhi" iconRight={renderRightIcon()} onPressRight={onPressRight} />
    );

    const onShowSelectDate = () => {
        setSelectDateVisible(true);
    };

    const onConfirmDate = (value: Date) => {
        setDate(value);
        setSelectDateVisible(false);
    };

    const onCancel = () => {
        setSelectDateVisible(false);
    };

    const getImageUrl = () => {
        if (action === 'EDIT' && history.image) {
            if (imageChoose?.uri) {
                return { uri: imageChoose?.uri };
            }
            return { uri: history.image }
        } else if (action === 'CREATE' && imageChoose?.uri) {
            return { uri: imageChoose?.uri }
        } else {
            return Images.Babe3;
        }
    }

    const renderContent = () => (
        <View style={styles.content}>
            <View style={styles.contentHeaderContainer}>
                <FastImage
                    source={getImageUrl()}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.pencilContainer} onPress={showBottomSheet}>
                    <SvgIcons.IcPencil width={scales(17)} height={scales(17)} color={getThemeColor().Color_Primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.date}>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.title}>Ngày chụp</Text>
                    </View>
                    <TouchableOpacity style={styles.dateContainer} onPress={onShowSelectDate}>
                        <Text style={styles.dateTxt}>{moment(date).format('DD/MM/YYYY')}</Text>
                        <SvgIcons.IcDateRange
                            width={scales(17)}
                            height={scales(17)}
                            color={getThemeColor().Text_Dark_1}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.title}>Tuần thứ</Text>
                    </View>
                    <Input placeholder="Nhập tuần" containerStyle={{ flex: 1 }} value={week} onChangeText={setWeek} />
                </View>
                <View style={styles.noteContainer}>
                    <Text style={styles.title}>Ghi chú</Text>
                    <Input
                        placeholder="Ghi chú..."
                        inputContainerStyle={{ marginTop: scales(15) }}
                        value={note}
                        onChangeText={setNote}
                    />
                </View>
            </View>
        </View>
    );

    const renderDatePicker = () => (
        <DatePicker
            modal
            mode="date"
            open={selectDateVisible}
            theme={'light'}
            date={date}
            onConfirm={onConfirmDate}
            onCancel={onCancel}
            title={null}
            confirmText={'Xác nhận'}
            cancelText={'Huỷ'}
        />
    );

    const renderButton = () => (
        <View style={styles.buttonContainer}>
            <Button title="Lưu" onPress={onHistory} />
        </View>
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
                {renderContent()}
            </KeyboardAwareScrollView>
            {renderButton()}
            {renderChooseImage()}
            {renderDatePicker()}
        </View>
    );
};

export default AddHistoryFetusScreen;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        content: {
            marginHorizontal: scales(15),
            marginTop: scales(20),
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(50),
        },
        image: {
            width: scales(120),
            height: scales(120),
            borderRadius: scales(12),
        },
        contentHeaderContainer: {
            alignSelf: 'center',
        },
        itemContainer: {
            marginTop: scales(20),
        },
        pencilContainer: {
            position: 'absolute',
            bottom: scales(5),
            right: -scales(5),
            padding: scales(5),
            backgroundColor: color.Color_Gray6,
            borderRadius: scales(20),
        },
        date: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        dateContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: scales(8),
            paddingHorizontal: scales(10),
            backgroundColor: color.Color_Gray6,
            borderRadius: scales(8),
        },
        dateTxt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginRight: scales(5),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scales(15),
        },
        noteContainer: {
            marginTop: scales(15),
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: Sizes.bottomSpace + scales(5),
            marginHorizontal: scales(15),
        },
        popupView: {
            backgroundColor: color.white,
            borderTopRightRadius: scales(20),
            borderTopLeftRadius: scales(20),
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
            borderBottomWidth: scales(0.5),
            borderColor: color.Text_Dark_5,
            paddingTop: scales(30),
            paddingBottom: scales(20),
            paddingHorizontal: scales(20),
            marginHorizontal: scales(15),
        },
        chooseOption: {
            borderBottomWidth: scales(0.5),
            borderColor: color.Text_Dark_5,
            paddingVertical: scales(20),
            paddingHorizontal: scales(20),
            marginHorizontal: scales(15),
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
        iconRight: {
            backgroundColor: color.Color_Primary,
            borderRadius: 100,
            padding: scales(5),
        },
    });
};
