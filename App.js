import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from "./screens/StartScreen";
import JoinScreen from "./screens/JoinScreen";
import RoomScreen from "./screens/RoomScreen";
import {Button, Dimensions, Text, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const {width, height} = Dimensions.get('screen')
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={StartScreen}/>
                <Stack.Screen name="Join" component={JoinScreen}/>
                <Stack.Screen name="Room" component={RoomScreen}
                              options={{
                                  headerShown: false,
                                  gestureEnabled: false
/*                                  headerLeft: () => (
                                      <TouchableOpacity style={{flexDirection: "row", position: "absolute", left: -18}}>
                                          <Ionicons name="arrow-back-outline" style={{alignSelf: "center"}} size={37}/>
                                          <Text style={{alignSelf: "center", fontSize: 20}}>Dissa</Text>
                                      </TouchableOpacity>

                                  ),*/
                              }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

