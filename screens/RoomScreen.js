import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {socket} from "../Constants/Socket";
import MyHeader from "../Components/MyHeader";
import {ListItem} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {PushNotificationContext} from "../Context/PushNotificationContext";
import {useMyTheme} from "../Context/MyThemeContext";
import SendOddModal from "../Components/Modals/SendOddModal";


const {width, height} = Dimensions.get('screen')

const RoomScreen = ({route, navigation}) => {

    const {isDark, COLORS, toggleTheme} = useMyTheme();
    const {username, roomId, color} = route.params;
    const [roomUsers, setRoomUsers] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const context = useContext(PushNotificationContext)

    useEffect(() => {
        socket.connect()
        socket.emit('join room', roomId, username, context, color);

        return () => {
            setRoomUsers([])
        }
    }, []);

    socket.on('users', payload => {
        setRoomUsers(payload)
    })

    function exitRoom() {
        socket.emit('leave room', roomId)
        navigation.goBack()
    }

    function goToEvents() {
        navigation.navigate('Events')
    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}} disabled={username === item.username} style={{marginTop: 20, width: width / 1.1, alignSelf: "center"}}>
            <ListItem containerStyle={{borderRadius: 10, backgroundColor: item.color}}>
                <ListItem.Content>
                    <ListItem.Title style={{fontSize: 22}}>{item.username}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                    <ListItem.Title>
                        {item.zips} x <Ionicons name="beer-outline" size={15}/>
                    </ListItem.Title>
                </ListItem.Content>
                {username === item.username ? (
                    <Ionicons name="person-outline" size={15}/>
                ) : (
                    <ListItem.Chevron/>
                    )}
            </ListItem>
            <SendOddModal toggle={modalVisible} hideModal={() => {setModalVisible(!modalVisible)}} username={item.username}/>
        </TouchableOpacity>

    )

    return (
        <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
            <MyHeader title={"Rum: " + roomId} leftIonIcon="arrow-back" leftAction={() => exitRoom()}
                      rightIonIcon="arrow-forward" rightAction={() => goToEvents()} leftColor={COLORS.SECONDARY}
                      rightColor={COLORS.PRIMARY}/>

            <FlatList keyExtractor={keyExtractor} data={roomUsers} renderItem={renderItem}/>
        </View>
    )

}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default RoomScreen;

