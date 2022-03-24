import React, {useEffect, useState} from "react";
import {Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Dimensions, FlatList} from "react-native";
import {Button, Slider} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useMyTheme} from "../../Context/MyThemeContext";

const  {width, height} = Dimensions.get('screen')


const AllOddsRender = ({receiver, roomId,socket, sender, zips, senderUsername, status, oddId, receiverOdd, receiverGuess, senderGuess}) =>  {
    const {isDark, COLORS, toggleTheme} = useMyTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [myOdds, setMyOdds] = useState(1);
    const [myGuess, setMyGuess] = useState(1);

    useEffect(() => {

    }, []);

    const StatusText = () =>{
        switch(status) {
            case 0:
                return <Text>{receiver} ska gissa</Text>
            case 1:
                return <Text>Väntar på att {senderUsername} ska gissa</Text>
            case 2:
                return <Text>{receiverGuess}-{senderGuess}. Oddsen var 1/{receiverOdd}</Text>
            case 3:
                return <Text/>
            default:
                return <Text/>
        }
    }



    function st(){
        switch(status) {
            case 0:
                return COLORS.PRIMARY
            case 1:
                return COLORS.SECONDARY
            case 2:
                return "#8CEB97"
            case 3:
                return COLORS.SECONDARY
            default:
                return "red"
        }
    }

    function acceptOdd() {
        if (myGuess > myOdds){
            alert('Du kan inte gissa högre än oddsen')
        }
        else {
            socket.emit('accept odd', oddId, myOdds, myGuess)
            setModalVisible(!modalVisible)
        }

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

                        {status !== 2 ? (
                            <>
                                <Ionicons size={42} color="sandybrown" name="beer-outline"/>
                                <Text style={{fontSize: 24, color: COLORS.CONTRAST, marginVertical: 20}}>{senderUsername} oddsade dig </Text>
                                <Text style={{fontSize: 16, color: COLORS.CONTRAST}}>Vad är oddsen? 1-10</Text>
                                <Text style={{color: COLORS.PRIMARY, fontSize: 18}}>{myOdds}</Text>
                                <Slider
                                    thumbStyle={{backgroundColor: COLORS.PRIMARY, width: 30, height: 30}}
                                    step={1}
                                    style={{width: width/1.5, height: 40}}
                                    minimumValue={1}
                                    maximumValue={10}
                                    minimumTrackTintColor={COLORS.PRIMARY}
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(odds) => setMyOdds(odds)}
                                    value={myOdds}
                                />

                                <Text style={{fontSize: 16, color: COLORS.CONTRAST, marginTop: 20}}>Din gissning</Text>
                                <Text style={{color: COLORS.PRIMARY, fontSize: 18}}>{myGuess}</Text>
                                <Slider
                                    thumbStyle={{backgroundColor: COLORS.PRIMARY, width: 30, height: 30}}
                                    step={1}
                                    style={{width: width/1.5, height: 40}}
                                    minimumValue={1}
                                    maximumValue={10}
                                    minimumTrackTintColor={COLORS.PRIMARY}
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(odds) => setMyGuess(odds)}
                                    value={myGuess}
                                />
                                <Button
                                    title="Skicka oddsen"
                                    buttonStyle={{
                                        backgroundColor: COLORS.PRIMARY,
                                        borderRadius: 5,
                                    }}
                                    containerStyle={{
                                        marginTop: 20
                                    }}
                                    onPress={() => acceptOdd()}
                                />
                            </>
                        ) : (
                            <>
                                <View style={{alignItems: "center", marginVertical: 50}}>
                                    <Text style={{fontSize: 25, color: COLORS.PRIMARY}}>
                                        {receiver} gissade {receiverGuess}
                                    </Text>
                                    <Text style={{fontSize: 25, color: COLORS.PRIMARY}}>
                                        {senderUsername} gissade {senderGuess}
                                    </Text>
                                </View>
                                {senderGuess === receiverGuess ? (
                                    <View>
                                        <Text style={{fontSize: 22, marginHorizontal: 30, color: COLORS.PRIMARY}}>Du ska dricka {zips} klunkar</Text>
                                        <Button
                                            onPress={() => oddsDone()}
                                            title="Jag har druckit mina klunkar"
                                            buttonStyle={{
                                                backgroundColor: COLORS.PRIMARY,
                                                borderRadius: 5,
                                            }}
                                            containerStyle={{
                                                marginTop: 20
                                            }}
                                            icon={{
                                                name: 'check',
                                                type: 'font-awesome',
                                                size: 15,
                                                color: 'white',
                                            }}
                                            iconRight/>
                                    </View>
                                ) : (
                                    <Text style={{fontSize: 22, marginHorizontal: 30, color: COLORS.PRIMARY}}>Du klarade dig undan denna gången!</Text>
                                )}
                            </>
                        )}

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
            <TouchableOpacity disabled onPress={() => setModalVisible(true)} style={{
                width: width / 1.1,
                marginHorizontal: 10,
                padding: 8,
                borderRadius: 10,
                backgroundColor: st(),
                shadowOffset: {
                    width: 1.5,
                    height: 2
                },
                minHeight: height/16,
                maxHeight: height/16,
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5
            }}>

                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={{color: "black", fontSize: 20, fontWeight: "bold"}}>{senderUsername}</Text>
                    <Text style={{color: "black", fontSize: 20}}> oddsade </Text>
                    <Text style={{color: "black", fontSize: 20, fontWeight: "bold"}}>{receiver}</Text>
                    <View style={{position: "absolute", right: width/8, alignSelf: "center", flexDirection: "row"}} >
                        <Text style={{color: "black", fontSize: 16, fontWeight: "bold"}}>
                            {zips}x
                        </Text>
                        <Ionicons name="beer-outline" size={17}/>
                    </View>
                </View>
                <StatusText/>

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

export default AllOddsRender;