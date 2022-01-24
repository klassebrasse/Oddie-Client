import React, {useEffect, useRef, useState} from 'react';
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from "./screens/StartScreen";
import JoinScreen from "./screens/JoinScreen";
import RoomScreen from "./screens/RoomScreen";
import {Dimensions, Platform} from "react-native";
import EventsScreen from "./screens/EventsScreen";
import * as Notifications from 'expo-notifications';
import {PushNotificationContext} from "./Context/PushNotificationContext";

const {width, height} = Dimensions.get('screen')
const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function App() {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    useEffect(() => {
        console.log("asdas")
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);

        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <PushNotificationContext.Provider value={expoPushToken}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Start">
                    <Stack.Screen name="Start" component={StartScreen}
                                  options={{
                                      headerShown: false,
                                  }}/>
                    <Stack.Screen name="Join" component={JoinScreen}
                                  options={{
                                      headerShown: false,
                                  }}/>
                    <Stack.Screen name="Room" component={RoomScreen}
                                  options={{
                                      headerShown: false,
                                      gestureEnabled: false,
                                  }}
                    />
                    <Stack.Screen name="Events" component={EventsScreen}
                                  options={{
                                      headerShown: false,
                                  }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PushNotificationContext.Provider>
    )
}

async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: {someData: 'goes here'},
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}



