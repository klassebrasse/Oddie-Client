import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";

const startDate = new Date();
export const Timer = ({ min }) => {
    const[rHour, setRHour] = useState(0); //countdown 2 hours.
    const[rMin, setRMin] = useState(2);
    const[rSec, setRSec] = useState(0);

    function getTime(){
        const finishHours = startDate.getHours() + 2 + startDate.getMinutes() / 60 + startDate.getSeconds() / 3600;
        const currentHours =  new Date().getHours() + new Date().getMinutes() / 60 + new Date().getSeconds() / 3600;
        const remainingHours = finishHours - currentHours;

        const remainingHour = Math.floor(remainingHours);
        const remainingMinute = Math.floor((remainingHours - remainingHour) * 60);
        const remainingSecond = Math.floor(((remainingHours - remainingHour) * 60 - remainingMinute)*60)

        setRHour(remainingHour);
        setRMin(remainingMinute);
        setRSec(remainingSecond);
        console.log("count")
    }

    useEffect(()=>{
        setInterval(function(){
            getTime()
        }, 1000);
    }, []);

    return(
        <View className="timer-container">

                <Text>{("0" + rHour).slice(-2)}</Text>
                <Text>:</Text>
                <Text>{("0" + rMin).slice(-2)}</Text>
                <Text>:</Text>
                <Text>{("0" + rSec).slice(-2)}</Text>

        </View>
    );
};


export default {Timer};