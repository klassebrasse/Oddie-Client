import * as React from "react";
import {useEffect, useState} from "react";
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import MyHeader from "../Components/MyHeader";
import {useMyTheme} from "../Context/MyThemeContext";
import SendOddModal from "../Components/Modals/SendOddModal";
import socket from "../Constants/Socket";
import {io, Socket} from "socket.io-client";
import AwesomeAlert from "react-native-awesome-alerts";
const randomColor = require('randomcolor');

const {width, height} = Dimensions.get('screen')

const JoinScreen = ({navigation}) => {

    //const socket = io.connect()
    const {isDark, COLORS, toggleTheme} = useMyTheme();

    const [username, setUsername] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [loading, setLoading] = useState(false)


    const customColor = randomColor({
        hue: '#00C1CB'
    });

    useEffect(() => {

    }, []);

    async function joinRoom() {
        if (!roomId && !username) alert("Fyll i Användarnamn och Lobby-kod")
        else if (!roomId) alert("Fyll i Lobby-kod")
        else if (!username) alert("Fyll i Användarnamn")
        else {
            setLoading(true)
            socket.emit('check username', roomId, username, (response) => {
                if (response.usernameIsOk){
                    if (roomId && username) {
                        navigation.navigate('Room', {
                            username: username,
                            roomId: roomId,
                            color: customColor,

                        });
                        setLoading(false)
                    }
                }
                else {
                    setLoading(false)
                    alert("Användarnamn är upptaget")
                }
            })
        }
    }

//"arrow-forward"
    return (
        <View style={{alignItems: "center", backgroundColor: COLORS.BACKGROUND, flex: 1}}>

            <AwesomeAlert
                show={loading}
                showProgress={loading}
                title="Deltar"
                message="(Tryck för att avbryta)"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                alertContainerStyle={{
                    backgroundColor: "rgba(0,193,203,0.24)"
                }}
                titleStyle={{fontSize: 20, color: COLORS.CONTRAST}}
                contentContainerStyle={{
                    backgroundColor: COLORS.BACKGROUND
                }}
                customView={
                    <TouchableOpacity style={{height: height, width: width, position: 'absolute'}} onPress={() => setLoading(false)}/>
                }
            />

            <MyHeader title="Delta" leftIonIcon="arrow-back" leftAction={() => navigation.goBack()}
                      leftColor={COLORS.SECONDARY} rightColor={COLORS.PRIMARY}/>
            <View style={{marginTop: 50, width: width / 2}}>
                <Input autoCorrect={false} placeholder="Användarnamn" style={{fontSize: 24, color: COLORS.PRIMARY}}
                       onChangeText={(text) => setUsername(text)}/>
            </View>

            <View style={{marginTop: 35, width: width / 2}}>
                <Input autoCorrect={false} placeholder="Lobby-kod" style={{fontSize: 24, color: COLORS.PRIMARY}}
                       onChangeText={(text) => setRoomId(text)}/>
            </View>


            <Button title="Join"
                    onPress={() => joinRoom()}
                    titleStyle={{"fontSize": 24}}
                    buttonStyle={{
                        backgroundColor: COLORS.PRIMARY,
                        borderRadius: 5,
                    }}
                    containerStyle={{
                        "width": 100,
                        "marginHorizontal": 50,
                        "marginVertical": 10,
                    }}/>
        </View>
    )
}

export default JoinScreen;