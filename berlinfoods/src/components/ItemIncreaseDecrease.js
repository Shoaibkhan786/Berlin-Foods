import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

const disabledColor = "#686b78";
const defaultColor = "#000000";

/**
 * isCallToComponentFunction :
 * @ the purpose is to call the component function.
 * @ i want to update total price when check box is checked.
 */
const isCallToComponentFunction = true;

@inject("counterStore")
@observer
class ItemIncreaseDecrease extends Component {
  constructor() {
    super();
    this.state = {
      itemQuantityRequired: 1, //for  Add on items this is not necessary to be at least one
      isIncreaseDecrease: true
    };
  }

  componentDidUpdate() {

    if (isCallToComponentFunction) {
        this.props.onPressIncrease(this.state.itemQuantityRequired);
    } else {
        this.props.onPressDecrease(this.state.itemQuantityRequired);
    }
  }
  increaseItemQuantity = () => {
    let limitValue = 0;
    this.props.isMakeAMeal
      ? (limitValue = this.props.counterStore.makeAMealLimit)
      : (limitValue = this.props.limit);

    if (this.state.itemQuantityRequired < limitValue) {
      this.setState({
        itemQuantityRequired: this.state.itemQuantityRequired + 1,
        isIncreaseDecrease: false
      });
    }
  };

  decreaseItemQuantity = () => {
    if (this.state.itemQuantityRequired > 1) {
      this.setState({
        itemQuantityRequired: this.state.itemQuantityRequired - 1
      });
    }
    if (this.state.itemQuantityRequired === 1) {
      this.setState({
        isIncreaseDecrease: true
      });
    }

  };

  getValue =  () =>{
    if(this.state.itemQuantityRequired > this.props.counterStore.makeAMealLimit){
      this.props.counterStore.setMakeAMealQuantity(this.props.counterStore.makeAMealLimit);
      this.setState({itemQuantityRequired:this.props.counterStore.makeAMealLimit })
      return this.props.counterStore.valueOfMakeAMeal;
    }else{
      return this.state.itemQuantityRequired;
    }
  }

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
          marginLeft: 8,
          flexDirection: "row",
          paddingTop: this.props.paddingTop > 0? this.props.paddingTop : 0
        }}
      >
        <TouchableOpacity
          /**
           * Will be in future release to increase the quantity of fries, BBQ Wings and Drink
           */

          onPress={() => {
            this.decreaseItemQuantity();
            isCallToComponentFunction = false;
          }}
          disabled={
            this.state.isIncreaseDecrease || this.props.isCheckboxChecked
          }
        >
          <Text
            style={{
              color:
                // item quanitiy equal to 1 then color is gray in case of greater then one will be green.
                this.state.isIncreaseDecrease ||
                this.state.itemQuantityRequired === 1
                  ? disabledColor
                  : defaultColor,
              fontSize: 16,
              fontFamily: "century-gothic",
              paddingHorizontal: 4
            }}
          >
            {" - "}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "#CE2027",
            fontSize: 14,
            fontFamily: "century-gothic",
            paddingHorizontal: 4
          }}
        >

          {this.props.isMakeAMeal
            ?  this.getValue()
            : this.state.itemQuantityRequired}

          {console.log(
            "Value of MakeMealQuantity: " +
              this.props.counterStore.valueOfMakeAMeal
          )}
        </Text>
        <TouchableOpacity
          disabled={this.props.isCheckboxChecked}
          onPress={() => {
            this.increaseItemQuantity();
            isCallToComponentFunction = true;
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              fontFamily: "century-gothic",
              paddingHorizontal: 4
            }}
          >
            {" + "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ItemIncreaseDecrease.propTypes = {
  onPressIncrease: PropTypes.func,
  onPressDecrease: PropTypes.func,
};

export default ItemIncreaseDecrease;
