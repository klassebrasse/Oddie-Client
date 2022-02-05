import React, {useEffect, useState} from "react";
import {Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Dimensions, FlatList} from "react-native";
import {Button, Slider} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useMyTheme} from "../../Context/MyThemeContext";
import {Timer} from "../Timer";
import {socket} from "../../Constants/Socket";

const  {width, height} = Dimensions.get('screen')


const SendOddModal = ({receiver, roomId,socket, sender, zips}) =>  {
    const {isDark, COLORS, toggleTheme} = useMyTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [myOdds, setMyOdds] = useState(0);

    useEffect(() => {

    }, []);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 22
                }}>
                    <View style={{
                        width: width/1.2,
                        height: height/1.7,
                        backgroundColor: COLORS.BACKGROUND,
                        borderRadius: 20,
                        alignItems: "center",
                        shadowColor: "#000000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <Ionicons size={42} color="sandybrown" name="beer-outline"/>
                        <Text style={{fontSize: 24, color: COLORS.CONTRAST}}>{sender} oddsade dig </Text>
                        <Text style={{color: COLORS.PRIMARY, fontSize: 18}}>{zips}</Text>
                        <Slider
                            thumbStyle={{backgroundColor: COLORS.PRIMARY, width: 30, height: 30}}
                            step={1}
                            style={{width: width/1.5, height: 40}}
                            minimumValue={0}
                            maximumValue={15}
                            minimumTrackTintColor={COLORS.PRIMARY}
                            maximumTrackTintColor="#000000"
                            onValueChange={(odds) => setMyOdds(odds)}
                        />
                        <TouchableOpacity
                            style={{
                                marginTop: height/20,
                                backgroundColor: COLORS.PRIMARY,
                                borderRadius: 5,
                                padding: 10,
                                elevation: 2
                            }}

                        >
                            <View style={{flexDirection: "row"}}>
                                <Text style={{color: COLORS.BACKGROUND, fontWeight: "bold", textAlign: "center", fontSize: 18}}>Vad är oddsen? </Text>
                                <Text style={{fontWeight: "bold", color: COLORS.CONTRAST, fontSize: 18}}>sd</Text>
                                <Text style={{color: COLORS.BACKGROUND, fontWeight: "bold", textAlign: "center", fontSize: 18}}>HAJA</Text>
                            </View>


                        </TouchableOpacity>
                        <View style={{height:20}}/>
                        <Button
                            title="Gå tillbaka"
                            titleStyle={{"fontSize": 24}}
                            containerStyle={{
                                position: 'absolute',
                                bottom: height/20,

                            }}
                            buttonStyle={{
                                backgroundColor: COLORS.PRIMARY,
                                borderRadius: 5,

                            }}
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{
                flexDirection: "row",
                width: width / 1.1,
                alignSelf: 'center',
                marginHorizontal: 10,
                padding: 16,
                borderRadius: 10,
                backgroundColor: "red",
                shadowOffset: {
                    width: 1.5,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5
            }}>

                <Text style={{color: "black", fontSize: 22}}>{sender}</Text>
                <View style={{position: "absolute", right: width/8, alignSelf: "center", flexDirection: "row"}} >
                    <Text>
                        {zips}x
                    </Text>
                    <Ionicons name="beer-outline" size={17}/>
                </View>

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: width/1.2,
        height: height/1.7,
        backgroundColor: "rgba(255,18,109,0.92)",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: {
            width: 8,
            height: 14
        },
        shadowOpacity: 0.3,
        shadowRadius: 7,
        elevation: 2
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        flexDirection: "row",
        width: width / 1.1,
        alignSelf: 'center',
        marginHorizontal: 10,
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#ff188c",
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: '#3a3a3a',
        shadowOpacity: 0.9
    },
});

export default SendOddModal;