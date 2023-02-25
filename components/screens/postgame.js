import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../components/globalcontext";

export default function PostGame(){
    const navigation = useNavigation();
    const { roles, setRoles } = useContext(Context);

    function restart (){
        setRoles([]);
        navigation.navigate("Start");
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.restartGame} onPress={restart}>
                <Text style={styles.restartGameText}>Restart Game?</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    restartGame: {
        height: Dimensions.get('screen').height * 0.08,
        width: Dimensions.get('screen').width * 0.5,
        marginVertical: Dimensions.get('screen').height * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    restartGameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
