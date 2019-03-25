import React from "react";
import { View,  } from "react-native";
import { inject, observer } from "mobx-react";
import * as Native from "native-base";
import ItemIncreaseDecrease from "../components/ItemIncreaseDecrease";

@inject("counterStore")
@observer
export default class AddOn extends React.Component {

  totalValue = 0;
  itemQuantity = 1;
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      total: this.props.price,
    };
    totalValue = this.props.price;
  }

  componentDidUpdate() {
    this.state.isCheck
      ? this.props.counterStore.addInTotal(totalValue)
      : this.props.counterStore.subInTotal(totalValue);

    if(this.state.isCheck){
      this.props.counterStore.setAddItemInChecked(itemQuantity+" "+this.props.itemName);
    }else{
      this.props.counterStore.setFilterAddItem(this.props.itemName);
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
              checked={this.state.isCheck} //kind of jugar here
              color="#2ecc71"
              onPress={() => {
                this.setState(prevState => {
                  totalValue = this.state.total;
                  return { isCheck: !prevState.isCheck };
                });

                this.forceUpdateHandler();
               
                /**
                 * The problem I faced is to update the state of isCheck. When I click checkbox
                 * it update the state but it create loops and maximum update error occure.
                 * I commment below the issue here (https://github.com/withspectrum/spectrum/issues/3159#issuecomment-416563911)
                 * ryota-murakami suggested the docs link. I learn to setState update with prevState.
                 * I implemendted but didn't work. To resolve the maximum update for that reasone I call 
                 * explicitly shouldComponentUpdate. Now the freeze and maximum update error is resolved.
                 * The state is also update but the view still not update. I used this.foreceUpdate()
                 * to forecefully update at least once to update the view
                 */
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
                  update={"SET_FRIES_TOTAL"}
                  isMakeAMeal={false}
                  isCheckboxChecked={this.state.isCheck} //if checked then no more increment
                  limit={50}
                  onPressIncrease={quantity => {
                    if (this.state.isCheck) {
                      this.setState({ total: this.props.price * quantity });
                      totalValue = this.props.price * quantity;
                      itemQuantity = quantity;

                    }
                  }}
                  onPressDecrease={quantity => {
                    if (this.state.isCheck) {
                      this.setState({ total: this.props.price * quantity});
                      totalValue = this.props.price * quantity;
                      itemQuantity = quantity;
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
