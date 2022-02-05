import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {socket} from "../Constants/Socket";
import MyHeader from "../Components/MyHeader";
import {PushNotificationContext} from "../Context/PushNotificationContext";
import {useMyTheme} from "../Context/MyThemeContext";
import SendOddModal from "../Components/Modals/SendOddModal";
import AwesomeAlert from "react-native-awesome-alerts";
import { Timer, Time, TimerOptions } from 'timer-node';


const {width, height} = Dimensions.get('screen')

const RoomScreen = ({route, navigation}) => {

    const {isDark, COLORS, toggleTheme} = useMyTheme();
    const {username, roomId, color} = route.params;
    const [roomUsers, setRoomUsers] = useState([])
    const context = useContext(PushNotificationContext)
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState("sss")
    const [loadingOdd, setLoadingOdd] = useState(true)
    const [myTimeouts, setMyTimeouts] = useState([
        {
            socketId: null,
            time: Timer,
        },
    ])

    useEffect(() => {
        socket.connect()
        socket.emit('join room', roomId, username, context, color);

        socket.on('users', payload => {
            setRoomUsers(payload)
            renderMyTimeouts(payload)
        })



        return () => {
            setRoomUsers([])
            setMyTimeouts([
                {
                    socketId: null,
                    time: Timer,
                },
            ])
        }
    }, []);

    function renderMyTimeouts(payload){
        console.log("DETTA TRIGGAS. PAYLOAD: ")
        const myUserIndex = payload.findIndex((user => user.id === socket.id));
        const tempMyTimeout = (payload[myUserIndex]?.timeOuts)
        setMyTimeouts(tempMyTimeout);
        console.log(myTimeouts)
    }

    function exitRoom() {
        socket.emit('leave room', roomId)
        navigation.goBack()
    }

    function goToEvents() {
        navigation.navigate('Events')
    }

    const alertTextAndLoading = (loading, successText) => {
        setLoadingOdd(loading)
        setAlertText(successText)
    };

    const alertFunction = (loading, successText) => {
        setShowAlert(true)
        setLoadingOdd(loading)
        setAlertText(successText)
        setTimeout(() => {setShowAlert(false)},4000)
    };

    const refresh = () => {
        console.log("refresh")
        socket.emit('update user list', roomId)
    }

    const keyExtractor = (item, index) => index.toString()

    return (
        <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={loadingOdd}
                    title={alertText}
                    message="(Tryck för att stänga)"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    alertContainerStyle={{
                        backgroundColor: "rgba(0,193,203,0.24)"
                    }}
                    titleStyle={{fontSize: 20, color: COLORS.CONTRAST}}
                    contentContainerStyle={{
                        backgroundColor: COLORS.BACKGROUND
                    }}
                    customView={
                        <TouchableOpacity style={{height: height, width: width, position: 'absolute'}} onPress={() => setShowAlert(false)}/>
                    }
                />


            <MyHeader title={"Rum: " + roomId} leftIonIcon="arrow-back" leftAction={() => exitRoom()}
                      rightIonIcon="arrow-forward" rightAction={() => goToEvents()} leftColor={COLORS.SECONDARY}
                      rightColor={COLORS.PRIMARY}/>
            <FlatList keyExtractor={keyExtractor} data={roomUsers}
                      renderItem={({item}) => <SendOddModal refresh={refresh} myTimeOuts={myTimeouts} targetSocketId={item.id} alertTextAndLoading={alertTextAndLoading} alert={alertFunction} username={item.username}
                                                            roomId={item.roomId} socket={socket} color={item.color}
                                                            currentUser={username} sumOfZips={item.zips}/>}/>
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

