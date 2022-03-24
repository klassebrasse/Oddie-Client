import React, {useEffect, useState} from "react";
import {Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Dimensions, FlatList} from "react-native";
import {Button, Slider} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useMyTheme} from "../../Context/MyThemeContext";
import {Timer} from "timer-node";

const  {width, height} = Dimensions.get('screen')


const SendOddModal = ({username, roomId, socket, color, currentUser, sumOfZips, alert, alertTextAndLoading, targetSocketId, myTimeOuts, refresh}) =>  {
    const {isDark, COLORS, toggleTheme} = useMyTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [zips, setZips] = useState(0);
    const [oddTimeOut, setOddTimeOut] = useState(false)
    const [duration, setDuration] = useState(0)

    function checkTimeOut() {
        if (myTimeOuts){
            const isTimeOut = myTimeOuts.findIndex((obj => obj.socketId === targetSocketId));

            if (isTimeOut >= 0){
                setOddTimeOut(true)
            }
            else if(isTimeOut < 0) {
                setOddTimeOut(false)
            }
        }
    }

    useEffect(() => {
        console.log("TIMEOUT: " + oddTimeOut)
        socket.on('timer', (id, duration) => {
            if (targetSocketId === id){
                setDuration(duration)
                console.log("duration" + duration)
            }
        })
        checkTimeOut()
    }, [myTimeOuts]);

    function sendOdds() {
        setModalVisible(false);
        alert(true, "Skickar odd");
//        refresh()

        socket.emit('sending odds', username, zips, roomId, targetSocketId, (callback) => {
            if (callback.oddsSent){
                alertTextAndLoading(false, 'Odds skickad!');
                console.log("odds skickad")
                refresh();
            }
            else if(!callback.oddsSent){
                alertTextAndLoading(false, 'Något gick fel')
            }
        })
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
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <Ionicons size={42} color="sandybrown" name="beer-outline"/>
                        <Text style={{fontSize: 24, color: COLORS.CONTRAST}}>Oddsa {username}</Text>
                        <Text style={{color: COLORS.PRIMARY, fontSize: 18}}>{zips}</Text>
                        <Slider
                            thumbStyle={{backgroundColor: COLORS.PRIMARY, width: 30, height: 30}}
                            step={1}
                            style={{width: width/1.5, height: 40}}
                            minimumValue={0}
                            maximumValue={15}
                            minimumTrackTintColor={COLORS.PRIMARY}
                            maximumTrackTintColor="#000000"
                            onValueChange={(zip) => setZips(zip)}
                        />
                        <TouchableOpacity
                            style={{
                                marginTop: height/20,
                                backgroundColor: COLORS.PRIMARY,
                                borderRadius: 5,
                                padding: 10,
                                elevation: 2
                            }}
                            onPress={() => sendOdds()}
                        >
                            <View style={{flexDirection: "row"}}>
                                <Text style={{color: COLORS.BACKGROUND, fontWeight: "bold", textAlign: "center", fontSize: 18}}>Oddsa </Text>
                                <Text style={{fontWeight: "bold", color: COLORS.CONTRAST, fontSize: 18}}>{username}</Text>
                                <Text style={{color: COLORS.BACKGROUND, fontWeight: "bold", textAlign: "center", fontSize: 18}}> med {zips} klunkar</Text>
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
            <TouchableOpacity disabled={username === currentUser || oddTimeOut} onPress={() => setModalVisible(true)} style={{
                flexDirection: "row",
                width: width / 1.1,
                alignSelf: 'center',
                marginHorizontal: 10,
                padding: 16,
                borderRadius: 10,
                backgroundColor: oddTimeOut?  COLORS.SECONDARY : color,
                shadowOffset: {
                    width: 1.5,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5
            }}>
                <View>
                    <Text style={{color: "black", fontSize: 22}}>{username}</Text>
                    {duration > 0 &&
                        <Text>{duration}</Text>
                    }
                </View>

                <View style={{position: "absolute", right: width/8, alignSelf: "center", flexDirection: "row"}} >
                    <Text>
                        {sumOfZips}x
                    </Text>
                    <Ionicons name="beer-outline" size={17}/>
                </View>

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