import React, { Component } from "react";
import { View, Text, TextInput, Picker } from "react-native";
import CustomButton from "../components/Button";
import styles from "../styles/styles";
import _Text from "../components/_Text";

export default class SignUpInputScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      location: "",
      sectors: ["Sector F-10", "Sector F-11", "Sector G-10", "Sector G-11"]
    };
  }
  render() {
    // areas names
    let serviceItems = this.state.sectors.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });

    return (
      <View
        style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
      >
        <View
          style={{
            backgroundColor: "#8c1b20",
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
            backgroundColor: "#cb242d"
          }}
        >
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
            BerlinFoods
          </Text>
        </View>

        <View
          style={{
            flex: 1 - 1 / 3,
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          {/* Enter your Location */}

          <Picker
            selectedValue={this.state.location}
            style={styles.cell}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ location: itemValue })
            }
          >
            {serviceItems}
          </Picker>

          {/* Enter your phone number */}
          <TextInput
            placeholder="Enter phone number"
            style={styles.singUpInputTextField}
            multiline={true}
            //   onChangeText={text => this.setState({ text })}
            //   value={this.state.text}
            underlineColorAndroid="#CE2027"
          />

          {/* Enter verification Code */}
          <TextInput
            placeholder="Enter verification code"
            style={styles.singUpInputTextField}
            multiline={true}
            //   onChangeText={text => this.setState({ text })}
            //   value={this.state.text}
            underlineColorAndroid="#CE2027"
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 16,
            marginVertical: 16,
            justifyContent: "flex-end"
          }}
        >
          <CustomButton
            customStyle="signUpButtonRed"
            text="Register"
            onPress={() => {
              this.props.navigation.navigate("MainScreen");
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 8,
              marginTop: 8
            }}
          >
            <_Text text="By signing up, you accept the" />
            <_Text colorCode="#CE2027" text=" T&Cs " />
            <_Text text="and" />
            <_Text colorCode="#CE2027" text="Privacy Policy." />
          </View>
        </View>
      </View>
    );
  }
}
