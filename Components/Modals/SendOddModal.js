import React, {FC, useState} from "react";
import {Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Dimensions} from "react-native";
import {ListItem, Slider} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useMyTheme} from "../../Context/MyThemeContext";

const  {width, height} = Dimensions.get('screen')


const SendOddModal = ({username, roomId, socket, color, currentUser, sumOfZips}) =>  {
    const {isDark, COLORS, toggleTheme} = useMyTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [zips, setZips] = useState(0);

    function sendOdds() {
        socket.emit("sending odds", username, zips, roomId)
    }

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
                            width: 8,
                            height: 14
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 7,
                        elevation: 2
                    }}>
                        <Ionicons size={42} color="sandybrown" name="beer-outline"/>
                        <Text style={{fontSize: 24}}>Oddsa {username}</Text>
                        <Text>{zips}</Text>
                        <Slider
                            step={1}
                            style={{width: width/1.5, height: 40}}
                            minimumValue={0}
                            maximumValue={15}
                            minimumTrackTintColor="sandybrown"
                            maximumTrackTintColor="#000000"
                            onValueChange={(zip) => setZips(zip)}
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => sendOdds()}
                        >
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.textStyle}>Oddsa </Text>
                                <Text style={{fontWeight: "bold", color: "sandybrown"}}>{username}</Text>
                                <Text style={styles.textStyle}> med {zips} klunkar</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={{height:20}}/>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity disabled={username === currentUser} onPress={() => setModalVisible(true)} style={{
                flexDirection: "row",
                width: width / 1.1,
                alignSelf: 'center',
                marginHorizontal: 10,
                padding: 16,
                borderRadius: 10,
                backgroundColor: color,
                shadowOffset: {
                    width: 3,
                    height: 3
                },
                shadowColor: '#3a3a3a',
                shadowOpacity: 0.9
            }}>
                <Text style={{color: "black", fontSize: 22}}>{username}</Text>

                {username === currentUser ? (
                    <Ionicons style={{position: "absolute", right: 20, alignSelf: "center"}} size={20} name="person"/>
                ) : (
                    <Ionicons style={{position: "absolute", right: 20, alignSelf: "center"}} size={20} name="arrow-forward"/>
                )}

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
        color: "white",
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