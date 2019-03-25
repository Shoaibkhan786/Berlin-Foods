import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

/**
 * Button is a custom component and we get behavouir
 * of this button by chaning props.
 */

@inject("counterStore")
class Button extends React.Component {
  render() {
    const { text, onPress } = this.props;
    let customStyle =
      this.props.customStyle == "signUpButtonWhite"
        ? styles.signUpButtonWhite
        : styles.signUpButtonRed;
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        activeOpacity={0.9}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor:
              this.props.customStyle == "signUpButtonWhite"
                ? "#ffffff"
                : "#CE2027",

            justifyContent: "center",
            borderWidth: 0.5,
            borderRadius: 4,
            borderColor: "#ddd",
            borderBottomWidth: 0,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1
          }}
        >
          {/* to show the count in the start */}
          {this.props.count == true ? (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 100 / 2,
                backgroundColor: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 4,
                marginRight: 16
              }}
            >
              <Text
                style={[
                  {
                    paddingTop: 8,
                    paddingBottom: 8,
                    textAlign: "center",
                    color: "#CE2027",
                    fontFamily: "century-gothic-bold",
                    fontSize: 14
                  }
                ]}
              >
                {this.props.counterStore.addToCartList.length}
              </Text>
            </View>
          ) : null}

          <Text style={[customStyle, { paddingRight: 24 }]}> {text}</Text>
        </View>
      </TouchableOpacity>

             
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
};

export default Button;
