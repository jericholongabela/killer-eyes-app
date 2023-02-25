import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../../assets/styles/colors";

export default function Home(props){
    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Killer Eyes Game!</Text>
            <TouchableOpacity style={styles.startGame} onPress={()=>navigation.navigate('Start')}>
                <Text style={styles.startGameText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.howToPlay}>
                <Text style={styles.howToPlayText}>How to Play</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        marginBottom: Dimensions.get('screen').height * 0.1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    startGame: {
        height: Dimensions.get('screen').height * 0.08,
        width: Dimensions.get('screen').width * 0.5,
        marginVertical: Dimensions.get('screen').height * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red_shade_4,
    },
    startGameText:{
        fontSize: 20,
        color: colors.white,
    },
    howToPlay: {
        height: Dimensions.get('screen').height * 0.08,
        width: Dimensions.get('screen').width * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.red_shade_4,
    },
    howToPlayText: {
        fontSize: 20,
    },
});