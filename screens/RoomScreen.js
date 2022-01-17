import * as React from "react";
import {useEffect, useState} from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {socket} from "../Constants/Socket";
import {COLORS} from "../Constants/Colors";
import MyHeader from "../Components/MyHeader";

const {width, height} = Dimensions.get('screen')

const RoomScreen = ({route, navigation}) => {
    const {username, roomId} = route.params;
    const [roomUsers, setRoomUsers] = useState([])

    useEffect(() => {
        socket.emit("join room", roomId, username);
        return () => {
            setRoomUsers([])
        }
    }, []);

    function exitRoom (){
        socket.disconnect()
        navigation.goBack()
    }


    return (
        <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
            <MyHeader title={"Rum: " + roomId} leftAction={() => exitRoom()}/>

        </View>
    )

}


export default RoomScreen