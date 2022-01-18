import * as React from "react";
import {useEffect, useState} from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View, Text, FlatList} from "react-native";
import {socket} from "../Constants/Socket";
import {COLORS} from "../Constants/Colors";
import MyHeader from "../Components/MyHeader";

import {Avatar, ListItem} from "react-native-elements";

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

    function goToEvents() {
        navigation.navigate('Events')
    }

    const list = [
        {
            name: 'Amy Farha',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
    ]

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <View style={{marginTop: 20, width: width/1.1, alignSelf: "center"}}>
            <ListItem containerStyle={{borderRadius: 10}}>
                <Avatar title={item.name[0]} source={item.avatar_url && { uri: item.avatar_url }}/>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </View>

    )

    return (
        <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
            <MyHeader title={"Rum: " + roomId} leftAction={() => exitRoom()} rightAction={() => goToEvents()} leftColor={COLORS.SECONDARY} rightColor={COLORS.PRIMARY}/>
            <FlatList keyExtractor={keyExtractor} data={list} renderItem={renderItem}/>
        </View>
    )

}


export default RoomScreen;