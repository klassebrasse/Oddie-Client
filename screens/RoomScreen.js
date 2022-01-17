import * as React from "react";
import {Text, View} from "react-native";

const RoomScreen = ({ route, navigation }) => {

    const { username, roomId } = route.params;

    return(
        <View style={{backgroundColor: "red", flex: 1}}>
            <Text>
                {username}
            </Text>

        </View>
    )

}

export default RoomScreen