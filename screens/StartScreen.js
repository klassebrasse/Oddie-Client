import * as React from "react";
import {Dimensions, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import MyHeader from "../Components/MyHeader";
import {COLORS} from "../Constants/Colors";
import {Button} from "react-native-elements";

const {width, height} = Dimensions.get('screen')

const StartScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{alignItems: "center", backgroundColor: COLORS.BACKGROUND, flex: 1}}>
            <MyHeader title={"Start"} leftIonIcon="cog" leftAction={() => console.log("")} leftColor={COLORS.SECONDARY}
                      rightColor={COLORS.PRIMARY}/>

            <Button title="Spela"
                    onPress={() => navigation.navigate("Join")}
                    titleStyle={{fontSize: 24, color: COLORS.SECONDARY, fontWeight: "bold"}}
                    buttonStyle={{
                        backgroundColor: COLORS.PRIMARY,
                        borderRadius: 5,
                    }}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 50,
                        marginVertical: 10,
                        marginTop: height/5
                    }}/>
        </View>
    )
}

export default StartScreen;