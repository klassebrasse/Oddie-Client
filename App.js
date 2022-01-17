import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from "./screens/StartScreen";
import JoinScreen from "./screens/JoinScreen";
import RoomScreen from "./screens/RoomScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={StartScreen}/>
                <Stack.Screen name="Join" component={JoinScreen}/>
                <Stack.Screen name="Room" component={RoomScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}

