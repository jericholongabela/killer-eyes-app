import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from "react-native";
import { Overlay } from '@rneui/themed';
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import colors from "../../assets/styles/colors";
import { Context } from "../../components/globalcontext";

export default function Start(){
    let [ numberOfPlayers, setNumberOfPlayers ] = useState(0);
    let [ Error, setError ] = useState(false);
    let [ showError, setShowError ] = useState(false);
    let { roles, setRoles } = useContext(Context);

    const navigation = useNavigation();

    function startGame(){
        console.log("Game Started");
        console.log("Number of Players: " + numberOfPlayers);
        if (numberOfPlayers == 0){
            setError("Please enter the number of players");
            setShowError(true);
        } else if (numberOfPlayers < 6 || numberOfPlayers > 20){
            setError("Number of players must be between 6 and 20");
            setShowError(true);
        } else {
            generateRolesDefault();
        }
    };

    function generateRolesDefault(){
        let judge = 0;
        let killer = 0;
        let doctor = 0;
        let police = 0;
        let civilian = 0;
        let tempRoles = [];

        if (numberOfPlayers >= 6 && numberOfPlayers <= 8){
            judge = 1;
            killer = 1;
            doctor = 1;
            police = 1;
            civilian = numberOfPlayers - 4;
        } else if (numberOfPlayers > 8 && numberOfPlayers <= 13){
            judge = 1;
            killer = 2;
            doctor = 1;
            police = 2;
            civilian = numberOfPlayers - 6;
        } else {
            judge = 2;
            killer = 3;
            police = 3;
            doctor = 2;
            civilian = numberOfPlayers - 10;
        }

        for (let i = 0; i < judge; i++){
            tempRoles.push("Judge");
        }
        for (let i = 0; i < killer; i++){
            tempRoles.push("Killer");
        }
        for (let i = 0; i < doctor; i++){
            tempRoles.push("Doctor");
        }
        for (let i = 0; i < police; i++){
            tempRoles.push("Police");
        }
        for (let i = 0; i < civilian; i++){
            tempRoles.push("Civilian");
        }

        shuffle(tempRoles);
        setRoles(tempRoles);

        console.log(tempRoles);
    }

// The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    return(
        <SafeAreaView style={styles.container}>
            {roles != "" ?
                <View style={styles.viewContainers}>
                    <Text style={styles.defaultText}>Pass the device to the first player</Text>
                    <TouchableOpacity style={styles.viewRole} onPress={()=>navigation.navigate("Preparation")}>
                        <Text style={styles.viewRoleText}>View Role</Text>
                    </TouchableOpacity>
                </View>
            : 
            <View style={{alignItems: 'center', marginBottom: Dimensions.get('screen').height * .2,}}>
                <Text style={styles.numberOfPlayers}>Number of Players:</Text>
                <TextInput
                    style={styles.defaultInputContainer}
                    onChangeText={text => setNumberOfPlayers(text)}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.startGame} onPress={startGame}>
                    <Text style={styles.startGameText}>Done</Text>
                </TouchableOpacity>
                <Overlay overlayStyle={styles.error} isVisible={showError}>
                    <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                        <Icon name="warning" type="material" color={colors.red_shade_1} size={30} onPress={()=>setShowError(false)} />
                        <Icon name="close" type="material" size={30} onPress={()=>setShowError(false)} />
                    </View>
                    <Text style={styles.errorText}>{Error}</Text>
                </Overlay>
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
    },
    numberOfPlayers: {
        marginVertical: Dimensions.get('screen').height * 0.,
        fontSize: 24,
        color: colors.red_shade_1
    },
    defaultInputContainer: {
        height: Dimensions.get('screen').height * 0.07,
        width: Dimensions.get('screen').width * 0.25,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.black_shade_1,
        fontSize: 24,
        textAlign: 'center',
    },
    startGame: {
        height: Dimensions.get('screen').height * 0.08,
        width: Dimensions.get('screen').width * 0.5,
        marginTop: Dimensions.get('screen').height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red_shade_4,

        borderRadius: 10,
    },
    startGameText:{
        fontSize: 20,
        color: colors.white
    },
    error : {
        height: Dimensions.get('screen').height * 0.3,
        width: Dimensions.get('screen').width * 0.8,
        paddingHorizontal: Dimensions.get('screen').width * 0.05,
    },
    errorText : {
        marginTop: Dimensions.get('screen').height * 0.05,
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black_shade_1,
    },
    viewRole: {
        height: Dimensions.get('screen').height * 0.1,
        width: Dimensions.get('screen').width * 0.5,
        marginVertical: Dimensions.get('screen').height * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red_shade_4,
    },
    viewRoleText:{
        fontSize: 20,
        color: colors.white,
    },
    viewContainers: {
        alignItems: 'center',
    },
    defaultText: {
        fontSize: 48,
        marginBottom: Dimensions.get('screen').height * 0.1,
        paddingHorizontal: Dimensions.get('screen').width * 0.1,
    },
});