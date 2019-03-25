import React, { Component } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import TextLabel from "./TextLabel";
import styles from "../styles/styles";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import { AsyncStorage } from "react-native";
// import FlatListWithEnd from "react-native-flatlist-with-end";
import FlatListWithEnd from "./FlatListWithEnd";
import ItemIncreaseDecrease from "../components/ItemIncreaseDecrease";

@inject("counterStore")
@observer
export default class AddToCartList extends Component {
  subTotalSum = 0;
  constructor(props) {
    super(props);

    this.state = {
      addToCartList: this.props.addToCartList      
    };
  }

  returnBillView() {
    return (
      <View>
        {/* Restaurant Bill text heading */}
        <Text
          style={[
            styles.subHeadingCss,
            { marginTop: 8, color: "#CE2027", paddingLeft: 16 }
          ]}
        >
          {"Restaurant bill"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 16,
            paddingRight: 16
          }}
        >
          {/* Restuarant Bill Left part:  which just contains headings */}
          <View
            style={{
              flex: 3,
              flexDirection: "column",
              paddingVertical: 8
            }}
          >
            {/* Item Total */}
            <Text style={[styles.regularTextCss, { paddingBottom: 8 }]}>
              {"Sub total"}
            </Text>
            {/* Delivery Charges */}
            <Text style={[styles.regularTextCss, { paddingBottom: 8 }]}>
              {"Delivery charges"}
            </Text>
            {/* To Pay */}
            <Text
              style={[
                styles.subHeadingCss,
                { paddingBottom: 8, color: "#CE2027" }
              ]}
            >
              {"To pay"}
            </Text>
          </View>

          {/* Restuarant Bill Right part: which contains prices */}
          <View
            style={{
              width: undefined,
              flexDirection: "column"
            }}
          >
            {/* Items sub Total Price*/}
            <Text
              style={[
                styles.regularTextCss,
                { marginRight: 8, paddingBottom: 8 }
              ]}
            >
              {/* {"Rs. "} {this.props.counterStore.item.price} */}
              {"Rs. "} {this.subTotalSum}
            </Text>

            {/* Delivery Charges Price*/}
            <Text
              style={[
                styles.regularTextCss,
                { marginRight: 8, paddingBottom: 8 }
              ]}
            >
              {"Rs. "}{" "}
              {this.props.counterStore.chargesApplied
                ? this.props.counterStore.deliveryCharges
                : "0"}
            </Text>

            {/* To Pay final price*/}
            <Text
              style={[
                styles.subHeadingCss,
                {
                  marginRight: 8,
                  paddingBottom: 8,
                  color: "#CE2027"
                }
              ]}
            >
              {/* Here ADDED the devlivery charges and item price */}
              {"Rs. "}
              {this.props.counterStore.totalPriceAddToCartItems}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  _renderItem(object, index) {
   
    const { item, totalPrice, description } = object;

    console.log("Index in add To cart item: "+index);

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-start",

          elevation: 5,
          borderRadius: 4,
          shadowOpacity: 0.7,
          backgroundColor: "white",
          justifyContent: "flex-start",
          padding: 8,
          marginTop: 4,
          marginRight: 8,
          marginLeft: 8,
          marginBottom: 4
        }}
      >
        {/* Left Image of card and below price */}
        {/* <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: 8
            }}
          >
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ height: 100, width: 100, margin: 8 }}
                resizeMode="center"
              />
            </View>
            <View>
              <TextLabel labelText={" Rs. " + item.price} />
            </View>
          </View>
        </View> */}

        {/* Right side more than half side which you description and dish name*/}
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            flexDirection: "column"
            // backgroundColor:"#AFF345"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            {/* Food Heading */}
            <View
              style={{
                flex: 1
                //  backgroundColor: "#CE2345"
              }}
            >
              <Text style={[styles.subHeadingCss, { color: "#CE2027" }]}>
                {item.foodName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity
                onPress={() => {

             

                  this.state.addToCartList.splice(index, 1);
                  this.setState({ addToCartList: this.state.addToCartList });

                  // subtract that price when delete
                  // this.subTotalSum = this.subTotalSum - totalPrice ;
                  // console.log("Value is after delete: "+this.subTotalSum);

                  AsyncStorage.setItem(
                    "addToCartList",
                    JSON.stringify(this.state.addToCartList)
                  );

                  // Here I set the Add To Cart store list in store
                  this.props.counterStore.setAddToCartList(
                    this.state.addToCartList
                  );
                }}
              >
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/icons/delete_black.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={
              {
                // backgroundColor: "#CE7745"
              }
            }
          >
            <Text style={styles.smallTextCss}>{description}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // justifyContent: "flex-end",

              flex: 1,
              marginTop: 8
              //  backgroundColor: "#CE9999"
            }}
          >

            {/* TODO: The user can increase the quantity in the Add TO cart item  */}
           {/* <ItemIncreaseDecrease
                  itemPrice={object.item.price}
                  update={"SET_FRIES_TOTAL"}
                  isMakeAMeal={false}
                  paddingTop={2}
                  limit={50}
                  onPressIncrease={quantity => {
                    console.log("Increament  Add to cart item " + quantity);
                    object.totalPrice = quantity * object.item.price;

                    console.log("Total is increase: "+ quantity * object.item.price);
                  }}
                  onPressDecrease={quantity => {
                    console.log("Decrement  Add to cart item "+ quantity);
                    object.totalPrice = quantity * object.item.price;
                    console.log("Total is decrease: "+ quantity * object.item.price);
                  }}
                /> */}

            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-end",
                marginBottom: 8,
                alignItems: "flex-end"
                // backgroundColor: "#ABC999"
              }}
            >
              <TextLabel labelText={" Rs. " + totalPrice} />
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    this.subTotalSum = 0;

    {
      /* Add to cart Button to go the Cart screen to confirm order */
    }
    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
      >
        {/* <FlatList
          ItemSeparatorComponent={() => (
            <View style={{ width: 5, height: 5 }} />
          )}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          data={this.state.addToCartList}
          keyExtractor={(item, index) => index.toString()}
        /> */}

        <FlatListWithEnd
          scrollEnabled
          renderItem={({ item, index }) => this._renderItem(item, index)}
          data={this.state.addToCartList}
        
          renderEndComponent={() => {
            return (
              <View>
                {/* <View style={{ paddingVertical: 15 }}>
                  <Text style={{ textAlign: "center" }}>
                    No more items, check back later!
                  </Text>
                </View> */}
                {this.returnBillView()}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />

        {/*When list is successfully show then update the total price */}
        {this.props.counterStore.setTotalPrice(0)}
        {this.props.counterStore.setItem(
          (item = {
            foodName: "",
            label: "",
            price: 0,
            image: "",
            quantity: 0
          })
        )}

        {this.state.addToCartList.map((object, index) => {
          const { item, totalPrice, description } = object;
          this.props.counterStore.addInTotal(totalPrice);
          this.subTotalSum = this.subTotalSum + totalPrice;
        })}
      </View>
    );
  }
}

@inject("counterStore")
class CartItem extends Component {
  constructor() {
    super();
  }

  render() {
    const { item, totalPrice, description } = this.props.object;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-start",

          elevation: 5,
          borderRadius: 4,
          shadowOpacity: 0.7,
          backgroundColor: "white",
          justifyContent: "flex-start",
          padding: 8,
          marginTop: 4,
          marginRight: 8,
          marginLeft: 8,
          marginBottom: 4
        }}
      >
        {/* Left Image of card and below price */}
        {/* <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginBottom: 8
                }}
              >
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 100, width: 100, margin: 8 }}
                    resizeMode="center"
                  />
                </View>
                <View>
                  <TextLabel labelText={" Rs. " + item.price} />
                </View>
              </View>
            </View> */}

        {/* Right side more than half side which you description and dish name*/}
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            flexDirection: "column"
            // backgroundColor:"#AFF345"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            {/* Food Heading */}
            <View
              style={{
                flex: 1
                //  backgroundColor: "#CE2345"
              }}
            >
              <Text style={[styles.subHeadingCss, { color: "#CE2027" }]}>
                {item.foodName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.state.addToCartList.splice(index, 1);
                  this.setState({ addToCartList: this.state.addToCartList });

                  // subtract that price when delete
                  // this.subTotalSum = this.subTotalSum - totalPrice ;
                  // console.log("Value is after delete: "+this.subTotalSum);

                  AsyncStorage.setItem(
                    "addToCartList",
                    JSON.stringify(this.state.addToCartList)
                  );

                  // Here I set the Add To Cart store list in store
                  this.props.counterStore.setAddToCartList(
                    this.state.addToCartList
                  );
                }}
              >
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/icons/delete_black.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={
              {
                // backgroundColor: "#CE7745"
              }
            }
          >
            <Text style={styles.smallTextCss}>{description}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              flex: 1,
              marginTop: 16
              // backgroundColor: "#CE9999"
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-end",
                marginBottom: 8,
                alignItems: "flex-end"
              }}
            >
              <TextLabel labelText={" Rs. " + totalPrice} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
