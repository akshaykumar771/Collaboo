import React, { Component } from 'react'
import {View} from 'react-native';
import {Item, Input, Icon} from 'native-base';
export default class AddCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            company:[]
        }
    }
    render() {
        return (
            <Item>
            <Icon active name="ios-business" />
            <Input placeholder=" Enter your Company Name"
                    onChangeText={(text) => {
                      this.setState({ company: text });
                    }}
                    value={this.state.company}/>
          </Item>
        )
    }
}
