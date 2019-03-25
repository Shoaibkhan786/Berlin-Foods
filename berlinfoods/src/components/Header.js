import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import databaseReference from "./DatabaseConfig";
import { inject, observer } from "mobx-react";
import StatusComponent from "./StatusComponent";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";

@inject("counterStore")
@observer
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      infoDialog: true,
      alertMessage:
        "Sorry! Restaurant is closed.You can not place order at the moment.",
      title: "Restaurant Close"
    };
  }
  componentDidMount() {
    //Check from firebase, either restaurant is closed or not.
    var messages = [];
    databaseReference
      .database()
      .ref("Restaurant_Status")
      .on("value", snapshot => {
        snapshot.val() === "Closed"
          ? this.props.counterStore.setRestaurantStatus(true)
          : this.props.counterStore.setRestaurantStatus(false);

        this.setState({
          status: snapshot.val(),
          infoDialog: true
        });
      });
  }

  handleClose = () => {
    this.setState({ infoDialog: false });
  };

  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            backgroundColor: "#CE2027",
            height: 24,
            alignItems: "stretch"
          }}
        />
        <View
          style={{
            height: 60,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#CE2027"
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              console.log("lala");
              this.props.toggle.toggleDrawer();
            }}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../assets/icons/hamburger.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: "century-gothic-bold",
              fontSize: 22,
              color: "white",
              textAlign: "center",
              marginBottom: 5
            }}
          >
            {this.props.text}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Text
              style={{
                fontFamily: "century-gothic-bold",
                color: "white",
                marginRight: 8
              }}
            >
              Restaurant:
            </Text>
            {/* if Berlin Foods is opened then show the text green otherwise black */}
            {this.state.status === "Closed" ? (
              <StatusComponent
                labelText={this.state.status}
                textColor={"black"}
              />
            ) : (
              <StatusComponent
                labelText={this.state.status}
                textColor={"green"}
              />
            )}
            {this.state.status === "Closed" ? (
              <View>
                <SCLAlert
                  theme="warning"
                  show={this.state.infoDialog}
                  title={"Restaurant Close"}
                  subtitle={
                    "Sorry! You can not place order at the moment."
                  }
                  cancellable={true}
                  onRequestClose={this.handleClose}
                >
                  <SCLAlertButton theme="warning" onPress={this.handleClose}>
                    Ok
                  </SCLAlertButton>
                </SCLAlert>
              </View>
            ) : null}
          </View>
        </View>

        <View />
      </View>
    );
  }
}
