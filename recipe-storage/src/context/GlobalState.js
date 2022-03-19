import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
   user : null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AppReducer, initialState);

   // Actions for changing state

   function setUser(user) {
       dispatch({
           type: 'SET_USER',
           payload: user,
       });
   }

   return(
      <GlobalContext.Provider value = {{user : state.user, setUser}}>
        {children}
   </GlobalContext.Provider>
   )
}
