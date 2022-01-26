import * as React from "react";
import {Dimensions, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import MyHeader from "../Components/MyHeader";
import {useMyTheme} from "../Context/MyThemeContext";
import {Button, Switch} from "react-native-elements";
import {useContext, useEffect, useState} from "react";
import {PushNotificationContext} from "../Context/PushNotificationContext";
import {MyThemeContext} from "../Context/MyThemeContext";
import {socket} from "../Constants/Socket";

const {width, height} = Dimensions.get('screen')

const StartScreen = () => {

    const {isDark, COLORS, toggleTheme} = useMyTheme();

    const navigation = useNavigation();



    return (
        <View style={{alignItems: "center", backgroundColor: COLORS.BACKGROUND, flex: 1}}>
            <MyHeader title={"Start"} leftIonIcon="cog" leftAction={() => console.log("")} leftColor={COLORS.SECONDARY}
                      rightColor={COLORS.PRIMARY}/>

            <Button title="Spela"
                    onPress={() => navigation.navigate("Join")}
                    titleStyle={{fontSize: 28, color: COLORS.SECONDARY}}
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
            <View style={{bottom: 0, position: "absolute", marginBottom: height/22}}>
                <Text style={{fontSize: 20, color: COLORS.PRIMARY, paddingBottom: 20}}>
                    {isDark ? "Dark Mode" : "Light Mode"}
                </Text>
                <Switch
                    color={COLORS.PRIMARY}
                    style={{alignSelf: "center"}}
                    value={isDark}
                    onValueChange={() => toggleTheme()}/>
            </View>
        </View>
    )
}

export default StartScreen;