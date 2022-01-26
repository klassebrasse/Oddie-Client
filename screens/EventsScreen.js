import {View} from "react-native";
import MyHeader from "../Components/MyHeader";
import {useMyTheme} from "../Context/MyThemeContext";

const EventsScreen = ({route, navigation}) => {

    const {isDark, COLORS, toggleTheme} = useMyTheme();

    return(
        <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND}}>
            <MyHeader title="Händelser" leftIonIcon="arrow-back" leftAction={() => navigation.goBack()}  leftColor={COLORS.PRIMARY} rightColor={COLORS.SECONDARY}/>
        </View>
    )
}

export default EventsScreen;