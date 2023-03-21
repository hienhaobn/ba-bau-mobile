import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import { RootNavigatorParamList } from './types';
import { getCurrentRoute, navigationRef } from './utils';

import { EThemeColor, GlobalVariables } from 'constants/index';

import { useTheme } from 'hooks/useTheme';

import ForgotPasswordScreen from 'screens/forgotPassword/ForgotPasswordScreen';
import SplashScreen from 'screens/launch/LaunchScreen';
import LoginScreen from 'screens/login/LoginScreen';
import MainScreen from 'screens/main';

import { getThemeColor } from 'utils/getThemeColor';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }} initialRouteName="Login">
            <Stack.Screen name="Splash" component={SplashScreen} />

            <Stack.Screen name="Main" component={MainScreen} options={{ animation: 'fade' }} />

            <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'fade_from_bottom' }} />

            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
    );
};

const StackNavigator = () => {
    const { theme } = useTheme();
    const onSetStatusBar = (screenName: string) => {
        if (!screenName) {
            return;
        }
    };

    const onStateChange = (): void => {
        const screenName = getCurrentRoute();
        if (screenName) {
            onSetStatusBar(screenName);
            GlobalVariables.activeRouteKey = screenName;
        }
    };

    return (
        <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
            <StatusBar
                backgroundColor={getThemeColor().Color_Bg}
                barStyle={theme === EThemeColor.Light ? 'dark-content' : 'light-content'}
                translucent
            />
            <RootStack />
        </NavigationContainer>
    );
};

export default StackNavigator;
