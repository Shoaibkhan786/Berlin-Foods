import React, { Component } from "react";
import databaseReference from "../components/DatabaseConfig";
import { Text, View, ActivityIndicator, AsyncStorage } from "react-native";
import UserHistoryShow from "../components/UserHistoryShow";
let parseData = {};
export default class UserHistory extends Component {
  static navigationOptions = {
    title: "My Orders",
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "#c80000"
    },
    headerTintColor: "#fff"
  };
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userHistory: []
    };
  }
  componentWillMount() {
    AsyncStorage.getItem("userInfo")
      .then(value => {
        parseData = JSON.parse(value);
        if (parseData === null) {
          parseData = true;
        }
      })
      .then(res => {
        this.reterieveUserHistory();
      });
  }
  reterieveUserHistory() {
    let price;
    var historyList = [];
    var ref = databaseReference.database().ref();
    ref
      .child("UsersHistory")
      .child("" + parseData.phoneNumber)
      .on("value", snap => {
        historyList = [];
        snap.forEach(child => {
          historyList.push(child)
        });
        this.setState({
          isLoading: false,
          userHistory: historyList.reverse()
        });
      });

     
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#c80000" />
        </View>
      );
    }
    if (parseData === true) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "century-gothic-bold",
              fontSize: 20,
              color: "#c80000"
            }}
          >
            You didn't place any order yet!
          </Text>
        </View>
      );
    }
    return <UserHistoryShow data={this.state.userHistory} />;
  }
}
