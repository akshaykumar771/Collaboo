/*AutoComplete Input/ AutoSuggestion Input*/
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import all the components we are going to use.
import Autocomplete from 'react-native-autocomplete-input';
//import Autocomplete component
 
const API = 'http://81.89.193.99:3001/api/category';
//Demo base API to get the data for the Autocomplete suggestion
class CategoriesAC extends Component {
  constructor(props) {
    super(props);
    //Initialization of state
    //films will contain the array of suggestion
    //query will have the input from the autocomplete input
    this.state = {
      categories: [],
      query: '',
    };
  }
  componentDidMount() {
    //First method to be called after components mount
    //fetch the data from the server for the suggestion
    fetch(`${API}`)
      .then(res => res.json())
      .then(json => {
        const { results: categories } = json;
        this.setState({ categories });
        //setting the data in the films state
      });
  }
  findCategory(query) {
    //method called everytime when we change the value of the input
    if (query === '') {
      //if the query is null then return blank
      return [];
    }
 
    const { categories } = this.state;
    //making a case insensitive regular expression to get similar value from the film json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered film array according the query from the input
    return categories.filter(categories => categories.title.search(regex) >= 0);
  }
 
  render() {
    const { query } = this.state;
    const categories = this.findCategory(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
 
    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          //data to show in suggestion
          data={categories.length === 1 && comp(query, categories[0].catname) ? [] : categories}
          //default value if you want to set something in input
          defaultValue={query}
          /*onchange of the text changing the state of the query which will trigger
          the findFilm method to show the suggestions*/
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter your offered specializations"
          renderItem={({ item }) => (
            //you can change the view you want to show in suggestion from here
            <TouchableOpacity onPress={() => this.setState({ query: item.catname })}>
              <Text style={styles.itemText}>
                {item.catname}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {categories.length > 0 ? (
            <Text style={styles.infoText}>{this.state.query}</Text>
          ) : (
            <Text style={styles.infoText}></Text>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
     padding: 5,
     marginTop: 5,
     marginBottom:0
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    marginTop: 10
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
export default CategoriesAC;
