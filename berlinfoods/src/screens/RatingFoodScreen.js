import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import styles from "../styles/styles";
import { Rating } from "react-native-elements";
import CustomButton from "../components/Button";

export default class RatingFoodScreen extends Component {
  render() {
    return (
      <ScrollView
        style={{
          flex: 1
        }}
      >
        <KeyboardAvoidingView behavior="position" style={{}}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              paddingTop: 16
            }}
          >
            {/* Food Image  */}
            <Image
              source={require("../assets/images/orders.png")}
              style={{
                height: 256,
                width: 256,
                alignSelf: "center"
              }}
              resizeMode="contain"
            />

            <View
              style={{
                flexDirection: "column",

                marginTop: 8,
                marginBottom: 16,
                paddingHorizontal: 64
              }}
            >
              <CustomButton
                customStyle="signUpButtonRed"
                text="Mighty Zinger"
                // onPressAction={this.props.navigation.navigate("SignUp")} //TODO: action listener
              />
            </View>

            {/* Quesetion*/}
            <Text
              style={[
                styles.regularTextCss,
                { alignSelf: "center", fontSize: 22 }
              ]}
            >
              {"How was the food?"}
            </Text>

            {/* Rating for the food */}
            <Rating
              type="star"
              ratingColor="#c8c7c8"
              startingValue={4}
              imageSize={22}
              onFinishRating={value => {
                console.log(value);
              }}
              style={{
                paddingVertical: 8,
                marginRight: 8,
                alignSelf: "center"
              }}
            />

            <View
              style={{
                flexDirection: "row",
                // width: undefined,
                paddingHorizontal: 16,
                marginHorizontal: 48,
                alignSelf: "center",
                marginBottom: 16
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined
                }}
                multiline={true}
                // onChangeText={text => this.setState({ text })}
                // value={this.state.text}
                placeholder="Add Comment ..."
                underlineColorAndroid="transparent"
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                marginHorizontal: 16,
                marginVertical: 16,
                paddingHorizontal: 32
              }}
            >
              <CustomButton
                text="Submit Review"
                customStyle="signUpButtonRed"
                onPress={() => {
                  console.log("Rating Button Star");
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
