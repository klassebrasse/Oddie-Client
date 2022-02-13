import {Dimensions, FlatList, Text, TouchableOpacity, View} from "react-native";
import MyHeader from "../Components/MyHeader";
import {useMyTheme} from "../Context/MyThemeContext";
import AwesomeAlert from "react-native-awesome-alerts";
import SendOddModal from "../Components/Modals/SendOddModal";
import socket from "../Constants/Socket";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {PushNotificationContext} from "../Context/PushNotificationContext";
import ReceiverListRender from "../Components/Modals/ReceiverListRender";
import {Tab, TabView} from "react-native-elements";
import SenderListRender from "../Components/Modals/SenderListRender";
import AllOddsRender from "../Components/Modals/AllOddsRender";

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
    const [receivedOdds, setReceivedOdds] = useState([])
    const [sentOdds, setSentOdds] = useState([])
    const [index, setIndex] = React.useState(0);

    useEffect(() => {

        socket.emit('get odds', roomId, (response) => {
            const res = response.oddsList

            const myReceivedOdds = res.filter((o) => o.receiverSocketId === socket.id)
            const mySentOdds = res.filter((o) => o.sender === socket.id)
            setOdds(res)
            setReceivedOdds(myReceivedOdds)
            setSentOdds(mySentOdds)
        })

        socket.on('update list', (res) => {
            const myReceivedOdds = res.filter((o) => o.receiverSocketId === socket.id)
            const mySentOdds = res.filter((o) => o.sender === socket.id)
            setOdds(res)
            setReceivedOdds(myReceivedOdds)
            setSentOdds(mySentOdds)
        })

        return () => {
            setOdds([])
            setSentOdds([])
            setReceivedOdds([])
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

            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                style={{backgroundColor: "red"}}
                indicatorStyle={{
                    backgroundColor: COLORS.PRIMARY,
                    height: 5,
                }}
            >
                <Tab.Item
                    title="Mottagna"
                    titleStyle={{ fontSize: 12, color: index === 0 ? COLORS.PRIMARY : COLORS.SECONDARY}}
                    icon={{ name: 'move-to-inbox', type: 'material', color: index === 0 ? COLORS.PRIMARY : COLORS.SECONDARY}}
                />
                <Tab.Item
                    title="Skickade"
                    titleStyle={{ fontSize: 12, color: index === 1 ? COLORS.PRIMARY : COLORS.SECONDARY}}
                    icon={{ name: 'outbox', type: 'material', color: index === 1 ? COLORS.PRIMARY : COLORS.SECONDARY}}
                />
                <Tab.Item
                    title="Alla odds"
                    titleStyle={{ fontSize: 12, color: index === 2 ? COLORS.PRIMARY : COLORS.SECONDARY}}
                    icon={{ name: 'library-books', type: 'material', color: index === 2 ? COLORS.PRIMARY : COLORS.SECONDARY}}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{width: '100%' }}>
                    <FlatList keyExtractor={keyExtractor}
                              data={receivedOdds}
                              renderItem={({item}) => <ReceiverListRender receiver={item.receiver} status={item.status} oddId={item.id} receiverOdd={item.receiverOdd}
                                                                          roomId={item.roomId} socket={socket} receiverGuess={item.receiverGuess} senderGuess={item.senderGuess}
                                                                          sender={item.sender} senderUsername={item.senderUsername} zips={item.zips}/>}/>
                </TabView.Item>
                <TabView.Item style={{width: '100%' }}>
                    <FlatList keyExtractor={keyExtractor}
                              data={sentOdds}
                              renderItem={({item}) => <SenderListRender receiver={item.receiver} status={item.status} oddId={item.id} receiverOdd={item.receiverOdd}
                                                                    roomId={item.roomId} socket={socket} receiverGuess={item.receiverGuess} senderGuess={item.senderGuess}
                                                                    sender={item.sender} senderUsername={item.senderUsername} zips={item.zips}/>}/>
                </TabView.Item>
                <TabView.Item style={{width: '100%'}}>
                    <FlatList keyExtractor={keyExtractor}
                              data={odds}
                              renderItem={({item}) => <AllOddsRender receiver={item.receiver} status={item.status} oddId={item.id} receiverOdd={item.receiverOdd}
                                                                     roomId={item.roomId} socket={socket} receiverGuess={item.receiverGuess} senderGuess={item.senderGuess}
                                                                     sender={item.sender} senderUsername={item.senderUsername} zips={item.zips}/>}/>
                </TabView.Item>
            </TabView>
        </View>
    )
}

export default EventsScreen;