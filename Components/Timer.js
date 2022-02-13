import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";

export const Timer = ({ timer, getTimeFromTimerComponent }) => {
    const [timeLeft, setTimeLeft] = useState()


    useEffect(()=>{
        setInterval(function(){
            const newTime = new Date();
            const stopTime = new Date(timer)
            const diff = (stopTime - newTime.getTime()) / 1000
            if (diff < 1) {
                getTimeFromTimerComponent()
            }
            setTimeLeft(Math.trunc(diff))
        }, 1000);
    }, []);

    return(
        <Text>{timeLeft}</Text>
    );
};


export default {Timer};