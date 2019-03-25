import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { inject, observer } from "mobx-react";
import AddToCartList from "../components/AddToCartList";
import CustomButton from "../components/Button";

@inject("counterStore")
@observer
export default class AddToCartScreen extends Component {
  addToCartList = [];
  static navigationOptions = {
    title: "Your cart",
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
      addToCartList: []
    };
  }

  componentWillMount() {
    //check where user already gave his/her shipping address
    AsyncStorage.getItem("addToCartList", (err, item) => {
      if (item != null) {
        console.log("Item is : " + item);
        var list = JSON.parse(item);
        list = list.reverse();
        this.setState({ addToCartList: list });

        // set the store list
        this.props.counterStore.setAddToCartList(list);
      } else {
        console.log("mehrbani kr yr");
      }
    }).then(e => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#CE2027" />
        </View>
      );
    }

    if (this.props.counterStore.addToCartList.length == 0) {
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
            Your cart looks empty.
          </Text>
          <Text
            style={{
              fontFamily: "century-gothic-bold",
              fontSize: 16,
              color: "#c80000"
            }}
          >
            Feed it with a meal now!.
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("MainScreen");
            }}
          >
            <Text
              style={{
                fontFamily: "century-gothic",
                fontSize: 16,
                color: "#c80000"
              }}
            >
              Back to home
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
      >
        <AddToCartList addToCartList={this.state.addToCartList} />

    
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 16,
            marginBottom: 8,
            justifyContent: "flex-end",
            paddingHorizontal: 32,
            
          }}
        >
          <CustomButton
            customStyle="signUpButtonRed"
            text="Place Order"
            onPress={() => {
              this.props.navigation.navigate("ConfirmOrderScreen");
            }}
          />
        </View>
      </View>
    );
  }
}
