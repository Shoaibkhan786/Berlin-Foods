import React from "react";
import { View, ImageBackground } from "react-native";
export default class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    //setting time out of navigation screen

    // Font.loadAsync({
    //   "century-gothic": require("../assets/fonts/CenturyGothic.ttf") ,
    //   "century-gothic-bold": require("../assets/fonts/CenturyGothicBold.ttf")
    // });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/images/BG1.jpg")}
          resizeMode="cover"
        />
      </View>
    );
  }
}
