import {Header} from "react-native-elements";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../Constants/Colors";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";

function MyHeader(props) {
  return(
      <Header
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
              colors: [props.leftColor, props.rightColor],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
          }}
          leftComponent={
              <View style={styles.headerRight}>
                  <TouchableOpacity onPress={() => props.leftAction()}>
                      <Ionicons name="arrow-back" color={props.rightColor} size={37}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{marginLeft: 10}}

                  >
                  </TouchableOpacity>
              </View>
          }

          rightComponent={
              <View style={styles.headerRight}>
                  {props.rightAction ? (
                      <TouchableOpacity onPress={() => props.rightAction()}>
                          <Ionicons name="arrow-forward" color={props.leftColor} size={37}/>
                      </TouchableOpacity>
                  ) : (
                      <React.Fragment/>
                  )}
              </View>
          }
          centerComponent={{text: props.title, style: styles.heading}}
      />
  )
}

export default MyHeader;

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.SECONDARY,
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',

    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});