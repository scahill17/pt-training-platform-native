import React, { useState, useEffect } from "react";
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
import styles from "../styles/MainTabs.style";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "Training") {
                        iconName = focused ? "calendar" : "calendar-outline";
                    } else if (route.name === "Analytics") {
                        iconName = focused ? "stats-chart" : "stats-chart-outline";
                    }

                    return (
                        <View
                            style={focused ? styles.focusedTabContainer : styles.tabContainer}
                        >
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={focused ? styles.focusedTabIcon.color : styles.tabIcon.color}
                            />
                        </View>
                    );
                },
                // Apply different label styles based on focus state
                tabBarLabel: ({ focused }) => {
                    return (
                        <Text style={focused ? styles.focusedTabLabel : styles.tabLabel}>
                            {route.name}
                        </Text>
                    );
                },
                tabBarActiveTintColor: styles.focusedTabIcon.color,
                tabBarInactiveTintColor: styles.tabIcon.color,
                tabBarStyle: styles.tabBar,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Training" component={Training} />
            <Tab.Screen name="Analytics" component={Analytics} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Signin" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Training" component={Training} options={{ headerShown: false }} />
            <Stack.Screen name="Analytics" component={Analytics} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;