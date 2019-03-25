import React, { Component } from "react";
import { Text, View, Picker } from "react-native";
import styles from "../styles/styles";
import { inject } from "mobx-react";
import PropsTypes from "prop-types";

/**
 * This is another component which I am using for Pizza Deal and Drink Items.
 * I give value to these components from props. It behavie accordingly to the given props.
 */

@inject("counterStore")
class DealChoiceView extends Component {
  constructor() {
    super();
    this.state = {
      pizzaType: "",
      pizzaFlavours: ""
    };
  }

  render() {
    let pizzaItems = this.props.counterStore.pizzaFlavours.map((s, i) => {
      return (
        <Picker.Item
          style={{ fontFamily: "century-gothic" }}
          key={i}
          value={s}
          label={s}
        />
      );
    });

    let drinkItems = this.props.counterStore.drinksFlavours.map((s, i) => {
      return (
        <Picker.Item
          style={{ fontFamily: "century-gothic" }}
          key={i}
          value={s}
          label={s}
        />
      );
    });

    return (
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: 16
          }
        ]}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.addDetailSubheadings}>{this.props.text}</Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            width: undefined,
            alignItems: "center"
          }}
        >
          <Picker
            selectedValue={this.state.pizzaType}
            style={[styles.cell]}
            onValueChange={value => {
              this.props.onValueChange(value);
              this.setState({ pizzaType: value });
            }}
          >
            {/* Here I just simply show if this component provided props for Pizza Deal 
          then it will just show the Pizza Deal items otherwise it will show drinkItems */}
            {this.props.isPizzaItems ? pizzaItems : drinkItems}
          </Picker>
        </View>
      </View>
    );
  }
}

DealChoiceView.propsTypes = {
  onValueChange: PropsTypes.func
};

export default DealChoiceView;
