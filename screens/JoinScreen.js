import * as React from "react";
import {Dimensions, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {Button, Input} from "react-native-elements";
import {COLORS} from "../Constants/Colors";
import {useState} from "react";

const {width, height} = Dimensions.get('screen')

const JoinScreen = ({ navigation }) => {

    const [username, setUsername] = useState(null);
    const [roomId, setRoomId] = useState(null)
    
    function joinRoom() {
        navigation.navigate('Room', {
            username: username,
            roomId: roomId,

        });
    }

    return (
        <View style={{alignItems: "center", backgroundColor: COLORS.BACKGROUND, flex: 1}}>
            <View style={{marginTop: 50, width: width / 2}}>
                <Input autoCorrect={false} placeholder="Användarnamn" style={{fontSize: 24}} onChangeText={(text) => setUsername(text)}/>
            </View>

            <View style={{marginTop: 35, width: width / 2}}>
                <Input autoCorrect={false} placeholder="Lobby-kod" style={{fontSize: 24}} onChangeText={(text) => setRoomId(text)}/>
            </View>

            <Button title="Join"
                    onPress={()=>joinRoom()}
                    titleStyle={{fontSize: 24}}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}/>


        </View>
    )
}

export default JoinScreen;