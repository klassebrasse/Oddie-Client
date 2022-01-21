import {View} from "react-native";
import MyHeader from "../Components/MyHeader";
import {COLORS} from "../Constants/Colors";

const EventsScreen = ({route, navigation}) => {
    return(
        <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
            <MyHeader title="Händelser" leftIonIcon="arrow-back" leftAction={() => navigation.goBack()}  leftColor={COLORS.PRIMARY} rightColor={COLORS.SECONDARY}/>
        </View>
    )
}

export default EventsScreen;