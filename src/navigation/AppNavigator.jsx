import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Analytics from '../screens/AnalyticsScreen';
import Training from '../screens/TrainingScreen';
import AddWorkoutScreen from "../screens/AddWorkoutScreen";
import StartWorkoutScreen from "../screens/StartWorkoutScreen";

import styles from "../styles/MainTabs.style";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Stack navigator for the Training flow.
 * @returns {JSX.Element} - Training stack navigator.
 */
function TrainingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TrainingMain" component={Training} options={{ headerShown: false }} />
            <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

/**
 * Bottom tab navigator for main sections: Home, Profile, Analytics, and Training.
 * @returns {JSX.Element} - Bottom tab navigator.
 */
function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        case 'Analytics':
                            iconName = focused ? 'analytics' : 'analytics-outline';
                            break;
                        case 'Training':
                            iconName = focused ? 'barbell' : 'barbell-outline';
                            break;
                        default:
                            iconName = 'ellipse-outline';
                    }

                    return (
                        <View style={focused ? styles.focusedTabContainer : styles.tabContainer}>
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={focused ? styles.focusedTabIcon.color : styles.tabIcon.color}
                            />
                        </View>
                    );
                },
                tabBarLabel: ({ focused }) => {
                    return (
                        <Text style={focused ? styles.focusedTabLabel : styles.tabLabel}>{route.name}</Text>
                    );
                },
                tabBarActiveTintColor: styles.focusedTabIcon.color,
                tabBarInactiveTintColor: styles.tabIcon.color,
                tabBarStyle: styles.tabBar,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Training" component={TrainingStack} />
            <Tab.Screen name="Analytics" component={Analytics} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

/**
 * Main app navigator managing authentication flow and main tabs.
 * @returns {JSX.Element} - Main navigator component.
 */
const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Signin" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;