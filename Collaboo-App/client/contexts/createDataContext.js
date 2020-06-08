import React, {useReducer} from 'react';
import userReducer from "../reducers/reducer";

export default (reducer, actions, defualtValue) => {
    const Context = React.createContext();

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, defualtValue);

        const boundActions = {};
        for(let key in actions) {
            boundActions[key] = actions[key] (dispatch)
        }

        return <Context.Provider value = {{state, ...boundActions}}>
            {children}
        </Context.Provider>
    }

    return { Context, Provider };
}