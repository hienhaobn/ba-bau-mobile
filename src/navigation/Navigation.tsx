import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import { RootNavigatorParamList } from './types';
import { getCurrentRoute, navigationRef } from './utils';

import { EThemeColor, GlobalVariables } from 'constants/index';

import { useTheme } from 'hooks/useTheme';

import { Screen } from 'screens';

import SplashScreen from 'screens/launch/LaunchScreen';
import MainScreen from 'screens/main';

import { getThemeColor } from 'utils/getThemeColor';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
            initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />

            <Stack.Screen name="Main" component={MainScreen} options={{ animation: 'fade' }} />

            <Stack.Screen name="Login" component={Screen.Login} options={{ animation: 'fade' }} />

            <Stack.Screen name="ForgotPassword" component={Screen.ForgotPassword} />

            <Stack.Screen name="Register" component={Screen.Register} />

            <Stack.Screen name="VerifyOTP" component={Screen.VerifyOTP} />

            <Stack.Screen name="FetalMovement" component={Screen.FetalMovement} />

            <Stack.Screen name="PregnancyDueDateCalculator" component={Screen.PregnancyDueDateCalculator} />

            <Stack.Screen name="PrenatalCareCheckups" component={Screen.PrenatalCareCheckups} />

            <Stack.Screen name="PregnancyWeekByWeek" component={Screen.PregnancyWeekByWeek} />

            <Stack.Screen name="NutritionalRegimen" component={Screen.NutritionalRegimen} />

            <Stack.Screen name="PregnancyProducts" component={Screen.PregnancyProducts} />

            <Stack.Screen name="RegisterSuccess" component={Screen.RegisterSuccess} />

            <Stack.Screen name="FetalHealth" component={Screen.FetalHealth} />

            <Stack.Screen name="HistoryFetus" component={Screen.HistoryFetus} />

            <Stack.Screen name="TeachFetus" component={Screen.TeachFetus} />

            <Stack.Screen name="RegisterUpdateInfo" component={Screen.RegisterUpdateInfo} />

            <Stack.Screen name="FetalMovementChart" component={Screen.FetalMovementChart} />

            <Stack.Screen name="RoutineCheckups" component={Screen.RoutineCheckups} />

            <Stack.Screen name="PrenatalCareCheckupsChartMom" component={Screen.PrenatalCareCheckupsChartMom} />

            <Stack.Screen name="PrenatalCareCheckupsChartBaby" component={Screen.PrenatalCareCheckupsChartBaby} />

            <Stack.Screen name="TeachFetusPhotoBaby" component={Screen.TeachFetusPhotoBaby} />

            <Stack.Screen name="TeachFetusMusicForMom" component={Screen.TeachFetusMusicForMom} />

            <Stack.Screen name="TeachFetusVideoBaby" component={Screen.TeachFetusVideoBaby} />

            <Stack.Screen name="TeachFetusMomRead" component={Screen.TeachFetusMomRead} />

            <Stack.Screen name="TeachFetusMomReadDetail" component={Screen.TeachFetusMomReadDetail} />

            <Stack.Screen name="Foods" component={Screen.Foods} />

            <Stack.Screen name="FoodDetail" component={Screen.FoodDetail} />

            <Stack.Screen name="DishDetail" component={Screen.DishDetail} />

            <Stack.Screen name="FetalHealthAnalysis" component={Screen.FetalHealthAnalysis} />

            <Stack.Screen name="FetalHealthInfo" component={Screen.FetalHealthInfo} />

            <Stack.Screen name="AddHistoryFetus" component={Screen.AddHistoryFetus} />
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
