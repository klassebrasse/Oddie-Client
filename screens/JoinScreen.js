import * as React from "react";
import {useEffect, useState} from "react";
import {Dimensions, Text, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import MyHeader from "../Components/MyHeader";
import {useMyTheme} from "../Context/MyThemeContext";
import SendOddModal from "../Components/Modals/SendOddModal";
import socket from "../Constants/Socket";
import {io, Socket} from "socket.io-client";
const randomColor = require('randomcolor');

const {width, height} = Dimensions.get('screen')

const JoinScreen = ({navigation}) => {

    //const socket = io.connect()
    const {isDark, COLORS, toggleTheme} = useMyTheme();

    const [username, setUsername] = useState(null);
    const [roomId, setRoomId] = useState(null);

    const customColor = randomColor({
        hue: '#00C1CB'
    });

    useEffect(() => {

    }, []);

    async function joinRoom() {
        socket.emit('check username', roomId, username, (response) => {
            console.log("responsen är: " + response.usernameIsOk)
            if (response.usernameIsOk){
                if (roomId && username) {
                    navigation.navigate('Room', {
                        username: username,
                        roomId: roomId,
                        color: customColor,

                    });
                } else if (!roomId && !username) alert("Fyll i Användarnamn och Lobby-kod")
                else if (!roomId) alert("Fyll i Lobby-kod")
                else if (!username) alert("Fyll i Användarnamn")
            }
            else {
                alert("Användarnamn är upptaget")
            }
        })
    }

//"arrow-forward"
    return (
        <View style={{alignItems: "center", backgroundColor: COLORS.BACKGROUND, flex: 1}}>
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