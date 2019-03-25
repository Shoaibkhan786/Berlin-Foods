import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import * as Native from "native-base";
import ItemIncreaseDecrease from "../components/ItemIncreaseDecrease";
import { observable } from "mobx";

@inject("counterStore")
@observer
export default class MakeAMeal extends React.Component {
  totalValue = 0;
  itemQuantity = 1;
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      total: this.props.price
    };
    totalValue = this.props.price;
    isPriceAddedInTotal = false;
  }

  addedInTotal(totalValue){
    isPriceAddedInTotal = true;
    this.props.counterStore.addInTotal(totalValue);
  }

  subtractedInTotal(totalValue){

    if(isPriceAddedInTotal){
      this.props.counterStore.subInTotal(totalValue);
      isPriceAddedInTotal = false;
    }
  }

  subInTotal(){
    this.props.counterStore.subInTotal(this.props.price);
  }

  componentDidUpdate() {
    // this.totalValue = this.props.counterStore.makeAMealQuantity * this.props.price;
    this.totalValue = this.itemQuantity * this.props.price;

    this.state.isCheck
      ? this.addedInTotal(this.totalValue)
      : this.subtractedInTotal(this.totalValue);

      if(this.state.isCheck){
        this.props.counterStore.setMakeAMealChecked(this.itemQuantity+" "+this.props.itemName);
      }else{
        this.props.counterStore.setFilterMakeAMeal(this.props.itemName);
      }

  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  render() {
    return (
      <View>
        <Native.Content>
          {/* Fries  */}
          <Native.ListItem>
            <Native.CheckBox
              checked={this.state.isCheck}
              color="#2ecc71"
              onPress={() => {
                this.setState(prevState => {
                  totalValue = this.state.total;

                  return { isCheck: !prevState.isCheck };
                });

                this.forceUpdateHandler();

              }}
            />
            <Native.Body>
              <Native.Text style={{ fontFamily: "century-gothic" }}>
                {this.props.itemName}
              </Native.Text>
            </Native.Body>

            <Native.Right>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start"
                }}
              >
                <Native.Text style={{ fontFamily: "century-gothic" }}>
                  {"Rs. "} {this.props.price}
                </Native.Text>
                <ItemIncreaseDecrease
                  itemPrice={this.props.price}
                  limit={this.props.limit}
                  isMakeAMeal={true}
                  update={"SET_FRIES_TOTAL"}
                  isCheckboxChecked={this.state.isCheck} //if checked then no more increment
                  onPressIncrease={quantity => {

                    if (this.state.isCheck) {
                      this.setState({ total: this.props.price * this.props.counterStore.makeAMealQuantity });
                      totalValue = this.props.price * this.props.counterStore.makeAMealQuantity;
                      this.itemQuantity = quantity;
                    }
                   
                  }}
                  onPressDecrease={quantity => {

                    if (this.state.isCheck) {
                      this.setState({ total: this.props.price * this.props.counterStore.makeAMealQuantity });
                      totalValue = this.props.price * this.props.counterStore.makeAMealQuantity;
                      this.itemQuantity = quantity;
                    }
                  
                  }}
                />
              </View>
            </Native.Right>
          </Native.ListItem>
        </Native.Content>
      </View>
    );
  }
}
