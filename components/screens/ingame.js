import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../components/globalcontext";

export default function InGame(){
    const navigation = useNavigation();
    let { timer, setTimer } = useContext(Context);

    const [seconds, setSeconds] = useState(timer);

    useEffect(() => {
        const intervalId = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.timerLabel}>Time remaining for the killer to kill the judge:</Text>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
        <TouchableOpacity style={styles.resetTimer} onPress={()=>setSeconds(180)}>
            <Text style={styles.resetTimerText}>Reset Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gameOver} onPress={()=>navigation.navigate('Post Game')}>
            <Text style={styles.gameOverText}>Game Over</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        paddingHorizontal: Dimensions.get('screen').width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerLabel:{
        paddingHorizontal: Dimensions.get('screen').width * 0.2,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: Dimensions.get('screen').height * 0.01,
    },
    timer: {
        fontSize: 96,
        fontWeight: 'bold',
        marginBottom: Dimensions.get('screen').height * 0.1,
    },
    resetTimer: {
        height: Dimensions.get('screen').height * 0.08,
        width: Dimensions.get('screen').width * 0.5,
        marginVertical: Dimensions.get('screen').height * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    resetTimerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    gameOver: {
        height: Dimensions.get('screen').height * 0.08,
        width: Dimensions.get('screen').width * 0.5,
        marginVertical: Dimensions.get('screen').height * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    gameOverText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});