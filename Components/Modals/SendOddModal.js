import React, { useState } from "react";
import {Modal, StyleSheet, Text, Pressable, View, Dimensions} from "react-native";
import {Button} from "react-native-elements";
import {useMyTheme} from "../../Context/MyThemeContext";

const {width, height} = Dimensions.get('screen')

const SendOddModal = ({toggle, hideModal, sendOdds, username}) => {
    const {isDark, COLORS, toggleTheme} = useMyTheme();
    const [modalVisible, setModalVisible] = useState(false);

    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={toggle}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={{backgroundColor: COLORS.SECONDBACKGROUND, height: height/1.6, width: width/1.2, borderRadius: 15, alignItems: "center", elevation: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                    }}>
                        <Text style={{color: COLORS.CONTRAST, fontSize: 20}}>Oddsa {username}</Text>
                        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-evenly", width: "100%"}}>
                            <Button
                                title="Stäng"
                                buttonStyle={{
                                    backgroundColor: COLORS.PRIMARY,
                                    borderRadius: 5,
                                }}
                                titleStyle={{fontSize: 20, color: COLORS.SECONDARY}}
                                onPress={() => hideModal()}
                            />
                            <Button
                                title="Stäng"
                                buttonStyle={{
                                    backgroundColor: COLORS.PRIMARY,
                                    borderRadius: 5,
                                }}
                                titleStyle={{fontSize: 20, color: COLORS.SECONDARY}}
                                onPress={() => hideModal()}
                            />
                        </View>

                    </View>
                </View>
            </Modal>

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
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default SendOddModal;