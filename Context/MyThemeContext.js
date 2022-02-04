import React, {useState} from "react";
import {darkColors, lightColors} from "../Constants/Colors";

export const MyThemeContext = React.createContext(null);

export const ThemeProvider = (props) => {
    const [isDark, setIsDark] = useState(true)

    function toggleTheme() {
        setIsDark(!isDark);
    }

    const defaultTheme = {
        isDark,
        COLORS: isDark ? darkColors : lightColors,
        toggleTheme
    }

    return(
        <MyThemeContext.Provider value={defaultTheme}>
            {props.children}
        </MyThemeContext.Provider>
    )

}

export const useMyTheme = () => React.useContext(MyThemeContext);