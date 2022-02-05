import {Dimensions, FlatList, TouchableOpacity, View} from "react-native";
import MyHeader from "../Components/MyHeader";
import {useMyTheme} from "../Context/MyThemeContext";
import AwesomeAlert from "react-native-awesome-alerts";
import SendOddModal from "../Components/Modals/SendOddModal";
import {socket} from "../Constants/Socket";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {PushNotificationContext} from "../Context/PushNotificationContext";
import ReceiverListRender from "../Components/Modals/ReceiverListRender";

const  {width, height} = Dimensions.get('screen')

const EventsScreen = ({route, navigation}) => {

    const {isDark, COLORS, toggleTheme} = useMyTheme();
    const {roomId} = route.params;
    const [roomUsers, setRoomUsers] = useState([])
    const context = useContext(PushNotificationContext)
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState("sss")
    const [loadingOdd, setLoadingOdd] = useState(true)
    const [odds, setOdds] = useState([])

    useEffect(() => {

        socket.emit('get odds', roomId, (response) => {
            setOdds(response.oddsList)
        })

        return () => {
            setOdds([])
        }
    }, []);

    const keyExtractor = (item, index) => index.toString()

    return(
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
            <MyHeader title="Händelser" leftIonIcon="arrow-back" leftAction={() => navigation.goBack()}  leftColor={COLORS.PRIMARY} rightColor={COLORS.SECONDARY}/>


                <FlatList keyExtractor={keyExtractor} data={odds}
                          renderItem={({item}) => <ReceiverListRender receiver={item.receiver}
                                                                roomId={item.roomId} socket={socket}
                                                                sender={item.sender} zips={item.zips}/>}/>
        </View>
    )
}

export default EventsScreen;