import * as React from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";


const StartScreen = () => {

    const navigation = useNavigation();

    return(
        <View style={{alignItems: "center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("Join")}>
                <Text style={{marginTop: 50}}>
                    SÖSSE
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default StartScreen;