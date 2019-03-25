import React from "react";
import { Text, View, } from "react-native";
export default class _TextView extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ fontFamily: "century-gothic" }}> {this.props.text}</Text>
      </View>
    );
  }
}
