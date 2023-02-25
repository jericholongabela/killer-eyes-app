import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import screens here:
import Home from "./screens/home";
import Start from "./screens/start";
import Preparation from "./screens/preparation";
import InGame from "./screens/ingame";
import PostGame from "./screens/postgame";

const Stack = createStackNavigator();

export default function Navigator(props){
    return(
        <Stack.Navigator initialRouteName={'Home'} >
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
            <Stack.Screen name="Start" component={Start} options={{headerShown:true}} />
            <Stack.Screen name="Preparation" component={Preparation} options={{headerShown:true}} />
            <Stack.Screen name="In Game" component={InGame} options={{headerShown:true}} />
            <Stack.Screen name="Post Game" component={PostGame} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}