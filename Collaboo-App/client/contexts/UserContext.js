import React, { createContext, Component } from 'react'

export const UserContext = createContext();

class UserContextProvider extends Component{
    state ={
        email:"",
        password:""
    }
    saveUser = (email, password) => {
        this.setState({
            email: email,
            password: password
        })
        console.log("User context file",this.state)
    }
    // handleLoginSubmit = () =>{
    //     fetch(`http://81.89.193.99:3001/api/user/login?email=${this.state.email}&password=${this.state.password}`, {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     // this.setState({
    //     //   isLoading: false,
    //     //   dataSource: responseJson,
    //     // });
    //     if(responseJson.role === 'CUSTOMER'){
    //       this.props.navigation.navigate("Customer")
    //     }
    //     else if(responseJson.role === 'CRAFTSMEN'){
    //       this.props.navigation.navigate("App")
    //     }
    //     else if(responseJson.role === 'AGENT'){
    //       this.props.navigation.navigate("Agent")
    //     }
    //     console.log("testing purpose", this.state.dataSource);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // }
    render(){
    return <UserContext.Provider value={{state: this.state, saveUser: this.saveUser}}>
        {this.props.children}
    </UserContext.Provider>
    }
}

export default UserContextProvider;