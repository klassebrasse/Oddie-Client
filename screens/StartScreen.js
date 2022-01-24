import * as React from "react";
import {Dimensions, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import MyHeader from "../Components/MyHeader";
import {COLORS} from "../Constants/Colors";
import {Button} from "react-native-elements";
import {useContext} from "react";
import {PushNotificationContext} from "../Context/PushNotificationContext";

const {width, height} = Dimensions.get('screen')

const StartScreen = () => {

    const context = useContext(PushNotificationContext)

    const navigation = useNavigation();

    return (
        <View style={{alignItems: "center", backgroundColor: COLORS.BACKGROUND, flex: 1}}>
            <MyHeader title={"Start"} leftIonIcon="cog" leftAction={() => console.log("")} leftColor={COLORS.SECONDARY}
                      rightColor={COLORS.PRIMARY}/>
            <Text style={{fontSize: 32, color: "white"}}>
                {context}
            </Text>

            <Button title="Spela"
                    onPress={() => navigation.navigate("Join")}
                    titleStyle={{fontSize: 28}}
                    buttonStyle={{
                        width: 120,
                        height: 70,
                        backgroundColor: COLORS.PRIMARY,
                        borderRadius: 5,
                    }}
                    containerStyle={{
                        marginHorizontal: 50,
                        marginVertical: 10,
                        marginTop: height/5
                    }}/>
        </View>
    )
}

export default StartScreen;