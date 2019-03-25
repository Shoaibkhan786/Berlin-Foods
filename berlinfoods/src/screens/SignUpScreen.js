import React, { Component } from "react";
import { View, ImageBackground } from "react-native";
import CustomButton from "../components/Button";
export default class SignUpScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
          source={require("../assets/icons/logo.png")}
        >
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 20,
              marginVertical: 20,
              justifyContent: "center",
              paddingBottom: 40
            }}
          >
            <CustomButton
              customStyle="signUpButtonWhite"
              text="Register"
              onPress={() => {
                this.props.navigation.navigate("SignUpInput");
              }}
            />

            {/* <Text
             style={{ color: "#FFFFFF", marginTop: 8, alignSelf: "center" }}
           >
             Have an acount? Login
           </Text> */}
          </View>
        </ImageBackground>
      </View>
    );
  }
}
