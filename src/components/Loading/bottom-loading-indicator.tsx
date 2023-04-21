import * as React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';

import { getThemeColor } from 'utils/getThemeColor';

interface Props {
    style?: ViewStyle;
}

export const BottomLoadingIndicator = (props: Props) => (
    <View style={[styles.container, props.style]}>
        <ActivityIndicator size="small" color={getThemeColor().Color_Primary2} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
