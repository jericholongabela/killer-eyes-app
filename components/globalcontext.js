import React, { createContext, useState } from 'react';

const Context = createContext();
const Provider = ({ children }) => {
    // declare global states here
    const [ roles, setRoles ] = useState([]);
    const [ timer, setTimer ] = useState(120); //default to 2 mins

    const globalContext = {
        //  add your global state here
        roles,
        setRoles,
        timer,
        setTimer,
    }

    return <Context.Provider value={globalContext}>{children}</Context.Provider>
};

export { Context, Provider };