import React from "react";
import { Text, View } from "react-native";
export default class _Text extends React.Component {
  render() {

    return (
      <View
        style={{
            flexDirection:'row'
        }}
      >
          <Text style={{color:this.props.colorCode, fontSize:13}}> {this.props.text}</Text>
      </View>
    );
  }
}
