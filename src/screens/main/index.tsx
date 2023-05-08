import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import MyTabBar from './MyTabBar';

import { RootNavigatorParamList } from 'navigation/types';

import { Screen } from 'screens';

const Tab = createBottomTabNavigator<RootNavigatorParamList>();

const Main = (props) => {
    // const { route } = props;
    // const { stateFromPath } = route.params;
    // const refPaymentSuccess = useRef<IPaymentSuccessPopupRef>(null);
    // const refPaymentFailedPopup = useRef<IPaymentFailedPopupRef>(null);

    // if (stateFromPath?.includes('payment-success')) {
    //     refPaymentSuccess?.current?.showModal();
    // }
    // if (stateFromPath?.includes('payment-failed')) {
    //     refPaymentFailedPopup?.current?.showModal();
    // }
    const renderTabBar = (bottomTabBarProps: BottomTabBarProps) => {
        return <MyTabBar {...bottomTabBarProps} />;
    };

    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
            tabBar={renderTabBar}
        >
            <Tab.Screen name={'Home'} component={Screen.Home} />

            <Tab.Screen name={'Premium'} component={Screen.Premium} />

            <Tab.Screen name={'Account'} component={Screen.Account} />

        </Tab.Navigator>
    );
};

export default Main;
