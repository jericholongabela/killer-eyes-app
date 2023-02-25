import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../../assets/styles/colors";
import { Context } from "../globalcontext";

export default function Preparation(){
    let { roles, setRoles } = useContext(Context);
    let { timer, setTimer } = useContext(Context);
    let [ toggleProtect, setToggleProtect ] = useState(true);
    let [ iteration, setIteration ] = useState(0);
    let [ stop, setStop ] = useState(false);

    const navigation = useNavigation();

    function viewRole(){
        if (iteration < roles.length - 1){
            setIteration(iteration + 1);
            setToggleProtect(true);
        }
    };

    function nextPlayer(){
        if (iteration < roles.length - 1){
            setToggleProtect(false);
        } else {
            setToggleProtect(false);
            setStop(true);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            {toggleProtect ? 
                <View style={styles.viewContainers}>
                    <Text style={styles.defaultText}>You are a <Text style={
                        roles[iteration] == "Judge" ? styles.judge :
                        roles[iteration] == "Killer" ? styles.killer :
                        roles[iteration] == "Doctor" ? styles.doctor :
                        roles[iteration] == "Police" ? styles.police :
                        styles.civilian
                    }>{roles[iteration]}</Text></Text>
                    <TouchableOpacity style={styles.viewRole} onPress={nextPlayer}>
                        <Text style={styles.viewRoleText}>Next Player</Text>
                    </TouchableOpacity>
                </View>
                : stop ?
                <View style={styles.viewContainers}>
                    <TouchableOpacity style={styles.viewRole} onPress={()=>navigation.navigate('In Game')}>
                        <Text style={styles.viewRoleText}>Start the game</Text>
                    </TouchableOpacity>
                    <View style={styles.countdownView}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: Dimensions.get('screen').height * .01}}>Set countdown time in seconds:</Text>
                        <TextInput
                            placeholder="60"
                            style={styles.defaultInputContainer}
                            onChangeText={text => setTimer(text)}
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={styles.defaultText}>All players have their roles!</Text>
                </View>
                :
                <View style={styles.viewContainers}>
                    <Text style={styles.defaultText}>Pass the device to the next player</Text>
                    <TouchableOpacity style={styles.viewRole} onPress={viewRole}>
                        <Text style={styles.viewRoleText}>View Role</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    container:{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    viewContainers: {
        alignItems: 'center',
    },
    defaultText: {
        textAlign: 'center',
        fontSize: 48,
        paddingHorizontal: Dimensions.get('screen').width * 0.1,
        paddingBottom: Dimensions.get('screen').height * 0.05,
    },
    defaultInputContainer: {
        height: Dimensions.get('screen').height * 0.07,
        width: Dimensions.get('screen').width * 0.25,
        marginBottom: Dimensions.get('screen').height * 0.05,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.black_shade_1,
        fontSize: 24,
        textAlign: 'center',
    },
    countdownView: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: Dimensions.get('screen').height * 0.05,
    },
    viewRole: {
        height: Dimensions.get('screen').height * 0.1,
        width: Dimensions.get('screen').width * 0.5,
        marginBottom: Dimensions.get('screen').height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red_shade_4,
    },
    viewRoleText:{
        fontSize: 20,
        color: colors.white,
    },
    judge: {
        color: colors.brown,
        fontWeight: 'bold'
    },
    killer: {
        color: colors.red_shade_4,
        fontWeight: 'bold'
    },
    doctor: {
        color: colors.green,
        fontWeight: 'bold'
    },
    police: {
        color: colors.blue,
        fontWeight: 'bold'
    },
    civilian: {
        color: colors.black_shade_1,
        fontWeight: 'bold'
    },
    
});