import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

class CompanyAC extends Component {
  constructor(props) {
    super(props);
    //Initialization of state
    //Companies will contain the array of suggestion
    //query will have the input from the autocomplete input
    this.state = {
      companies: [],
      query: "",
    };
  }
  componentDidMount() {
    this.companyAutoComplete();
    //First method to be called after components mount
    //fetch the data from the server for the suggestion
  }

  companyAutoComplete = () => {
    const url = "http://81.89.193.99:3001/api/company";
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          const result = res;
          this.setState({ companies: result });
        }
      });
  };
  findCategory(query) {
    //method called everytime when we change the value of the input
    if (query === "") {
      //if the query is null then return blank
      return [];
    }

    const companies = this.state.companies;
    //making a case insensitive regular expression to get similar value from the category json
    const regex = new RegExp(`${query.trim()}`, "i");
    //return the filtered category array according the query from the input
    return (
      companies &&
      companies.filter((companies) => companies.compname.search(regex) >= 0)
    );
  }
  //
  handleChange = (item) => {
    console.log("company", item);
    this.setState({ query: item.compname }, () => {
      this.props.showCompanies(this.state.query);
    });
  };

  render() {
    const { query } = this.state;
    const companies = this.findCategory(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          //data to show in suggestion
          data={
            companies &&
            companies.length === 1 &&
            comp(query, companies[0].compname)
              ? []
              : companies
          }
          //default value if you want to set something in input
          defaultValue={query}
          /*onchange of the text changing the state of the query which will trigger
          the findFilm method to show the suggestions*/
          onChangeText={(text) => this.setState({ query: text })}
          placeholder="Gebe deinen Firmennamen ein"
          renderItem={({ item }) => (
            //you can change the view you want to show in suggestion from here
            <TouchableOpacity onPress={() => this.handleChange(item)}>
              <Text style={styles.itemText}>{item.compname}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    marginTop: 0,
    paddingTop: 10,
  },
  autocompleteContainer: {
    ...Platform.select({
      ios: {
        backgroundColor: "#ffffff",
        borderWidth: 0,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
      },
      android: {
        backgroundColor: "#ffffff",
        borderWidth: 0,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
      },
    }),
  },

  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
  },
});
export default CompanyAC;
