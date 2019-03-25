import React from "react";
import { Text, View } from "react-native";
export default class TextLabel extends React.Component {
  render() {
    return (
      <View
        style={{
          borderWidth: 0.5,
          borderRadius: 2,
          borderColor: "#ddd",
          borderBottomWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1,
          flexDirection: "row",
          backgroundColor: "#CE2027",
          alignSelf: "baseline"
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontFamily: "century-gothic",
            paddingHorizontal: 8,
            paddingVertical: 2
          }}
        >
          {this.props.labelText}
        </Text>
      </View>
    );
  }
}
