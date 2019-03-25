import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from "react-native";
import styles from "../styles/styles";
import CustomButton from "../components/Button";
import TextLabel from "../components/TextLabel";
import { inject, observer } from "mobx-react";
import { SegmentedControls } from "react-native-radio-buttons";
import DealChoiceView from "../components/DealChoiceView";
import AddOn from "../components/AddOn";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import MakeAMeal from "../components/MakeAMeal";
import { AsyncStorage } from "react-native";
import * as Native from "native-base";
import ItemIncreaseDecrease from "../components/ItemIncreaseDecrease";

/**
 * What is Item? :
 * @ The item is the actual place order. Like Pizza, Burger.
 *
 * What is Pizza Deal?:
 * @ It contains number of pizza or sometime with drink also included
 *
 * What is
 */

const disabledColor = "#686b78";
const defaultColor = "#000000";

Array.prototype.containsSelectFlavor = function(element) {
  return this.indexOf(element) > -1;
};

const options = ["Personal", "Small", "Medium", "Large"];

@inject("counterStore")
@observer
export default class PlaceOrderScreen extends Component {
  static navigationOptions = {
    title: "Customize Your Order",
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "#CE2027"
    },
    headerTintColor: "#fff"
  };

  constructor(props) {
    super(props);
    console.log('Look at me bro '+this.props.counterStore.isPizza)

    this.state = {
      itemQuantityRequired: 1,
      isIncreaseDecrease: true,
      infoDialog: false,
      title: " ",
      alertMessage: " ",
      visible: false,
      limitForMakeAMeal: 1
    };

    //set the initial states
    this.props.counterStore.setTotalPrice(0);
    this.props.counterStore.setDescription("");
    this.props.counterStore.setInitAddItemInChecked();
    this.props.counterStore.setInitMakeAMealCheckedValue();

    // set the prices for pizza flavors of Personal, Small, Medium, Large
    this.props.counterStore.setPersonalPizzaPrice(
      parseInt(this.props.navigation.state.params.price)
    );
    this.props.counterStore.setSmallPizzaPrice(
      parseInt(this.props.navigation.state.params.smallPrice)
    );
    this.props.counterStore.setMediumPizzaPrice(
      parseInt(this.props.navigation.state.params.mediumPrice)
    );
    this.props.counterStore.setLargePizzaPrice(
      parseInt(this.props.navigation.state.params.largePrice)
    );

    //set the quantity of pizza in store
    this.props.counterStore.setPizzaDealQuantity(
      this.props.navigation.state.params.pizzaDealQuantity
    );

    // name of item
    this.props.counterStore.setItemFoodName(
      this.props.navigation.state.params.previousComponentData
    );

    // price of item
    this.props.counterStore.setItemPrice(
      parseInt(this.props.navigation.state.params.price)
    );

    // item description if its available
    this.props.counterStore.setItemLabel(
      this.props.navigation.state.params.descp
    );

    // Image of item
    this.props.counterStore.setItemImage(
      this.props.navigation.state.params.imagePath
    );

    // is Pizza
    this.props.counterStore.setPizzaState(
      this.props.navigation.state.params.title === "Pizza" ? true : false
    );

    // is Pizza Deal
    this.props.counterStore.setPizzaDealState(
      // this.props.navigation.state.params.title === "Pizza Deals" ? true : false
      this.props.navigation.state.params.isPizzaDeal
    );

    // is Make a meal
    this.props.counterStore.setIsMakeAMeal(
      this.props.navigation.state.params.isMakeAMeal
    );

    // set the drink quantity
    this.props.counterStore.setDrinkQuantityWithItem(
      this.props.navigation.state.params.drinkQuantity
    );

    // set the make meal quantity limit and main food item quanity default limit
    this.props.counterStore.setMakeAMealLimit(1);

    // set the state of isDrinkWithItem in store
    this.props.navigation.state.params.drinkQuantity > 0
      ? this.props.counterStore.setIsDrinkWithItem(true)
      : this.props.counterStore.setIsDrinkWithItem(false);

    {
      /* Make an array of pizza flavors to set Select flavour as 
    the initial value because to check the validity does user select any pizza */
      Array.from(Array(this.props.counterStore.pizzaDealQuantity)).map(
        (s, i) => {
          this.props.counterStore.setPizzaIndexValue(i, "Select flavour");
        }
      );
    }

    {
      /* Make an array of drink flavors  and set the initial value 
      Select flavour to check the validity does user select any drink flavour. */
      Array.from(Array(this.props.counterStore.drinkQuantityWithItem)).map(
        (s, i) => {
          this.props.counterStore.setDrinkIndexValue(i, "Select flavour");
        }
      );
    }
  }

  componentDidUpdate() {
    if (this.state.isIncreaseDecrease) {
      // Make a meal quanitity
      console.log(
        "Value of MakeAMeal Quantity: " + this.state.itemQuantityRequired
      );
      this.props.counterStore.setMakeAMealQuantity(
        this.state.itemQuantityRequired
      );
    } else {
      console.log(
        "Value of MakeAMeal Quantity: " + this.state.itemQuantityRequired
      );
      // Make a meal quanitity
      this.props.counterStore.setMakeAMealQuantity(
        this.state.itemQuantityRequired
      );
    }
  }

  // incraese the item quantity
  increaseItemQuantity = () => {
    this.setState({
      itemQuantityRequired: this.state.itemQuantityRequired + 1,
      limitForMakeAMeal: this.state.limitForMakeAMeal + 1,
      isIncreaseDecrease: false
    });

    // Quantity increase price add into total
    this.props.counterStore.addInTotal(this.props.counterStore.item.price);
  };

  // decrease the item quantity
  decreaseItemQuantity = () => {
    if (this.state.itemQuantityRequired > 1) {
      this.setState({
        itemQuantityRequired: this.state.itemQuantityRequired - 1,
        limitForMakeAMeal: this.state.limitForMakeAMeal - 1
      });

      // Quantity decrease price subtract into total
      this.props.counterStore.subInTotal(this.props.counterStore.item.price);
    }

    // at least 1 item will be appeared always
    if (this.state.itemQuantityRequired === 1) {
      this.setState({
        isIncreaseDecrease: true
      });
    }
  };

  handleOpen = (alertTxt, titleTxt) => {
    this.setState({
      infoDialog: true,
      alertMessage: alertTxt,
      title: titleTxt
    });
  };

  handleClose = () => {
    this.setState({ infoDialog: false, successDialog: false });
  };

  _hideDialog = () => this.setState({ visible: false });

  // add desire item into add to cart list
  addToCartProcess() {
    const itemAddToCart = {
      item: this.props.counterStore.item,
      totalPrice: this.props.counterStore.totalPriceValue,
      description: this.props.counterStore.getDescription
    };

    this.props.counterStore.setDishCategory(
      this.props.navigation.state.params.title
    );

    AsyncStorage.getItem("addToCartList")
      .then(addToCartList => {
        const list = addToCartList ? JSON.parse(addToCartList) : [];
        list.push(itemAddToCart);

        console.log(
          "******Data of list in Place Order Screen: " + JSON.stringify(list)
        );

        // Here I set the Add To Cart store list in store
        this.props.counterStore.setAddToCartList(list);
        AsyncStorage.setItem("addToCartList", JSON.stringify(list));
      })
      .then(e => {
        // if you full filled all condition now you can go to the AddToCartScreen to confirm your order order screen
        // this.props.navigation.navigate("AddToCartScreen");
        this.props.navigation.navigate("MainScreen");
      });
  }
  render() {
    // varying height of view on different devices added below snippet
    var spaceHeight = Dimensions.get("window").height;
    spaceHeight = (spaceHeight - 500) / 3;
    spaceHeight = spaceHeight * 5;

    return (
      <View
        style={{ flex: 1, backgroundColor: "white", flexDirection: "column" }}
      >
        <ScrollView>
          <View
            style={{
              flex: 1 / 2,
              flexDirection: "column",
              paddingBottom: 16
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingRight: 8
              }}
            >
              {/* Food Image */}
              <Image
                source={{ uri: this.props.counterStore.item.image }}
                style={{
                  flex: 1 - 1 / 4,
                  alignSelf: "center",
                  justifyContent: "center",
                  height: 120,
                  width: 120,
                  marginTop: 8
                }}
                resizeMode="contain"
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignSelf: "center",
                  justifyContent: "center"
                }}
              >
                {/* Foood Name */}
                <Text style={[styles.subHeadingCss, { color: "#CE2027" }]}>
                  {this.props.counterStore.item.foodName}
                </Text>

                {/* Food label */}
                <Text
                  style={[
                    styles.regularTextCss,
                    { marginRight: 8, marginBottom: 8 }
                  ]}
                >
                  {this.props.counterStore.item.label}
                </Text>

                {/* Food Price */}
                <TextLabel
                  labelText={"Rs. " + this.props.counterStore.item.price}
                />

                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <ItemIncreaseDecrease
                    itemPrice={this.props.price}
                    update={"SET_FRIES_TOTAL"}
                    isMakeAMeal={false}
                    isCheckboxChecked={this.state.isCheck} //if checked then no more increment
                    limit={50}
                    onPressIncrease={quantity => {
                      {
                        this.props.counterStore.setMakeAMealLimit(quantity);
                      }
                    }}
                    onPressDecrease={quantity => {
                      {
                        this.props.counterStore.setMakeAMealLimit(quantity);
                      }
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Free Delivery for orders View */}
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
                backgroundColor: "#ffffff",
                alignSelf: "baseline",
                alignSelf: "flex-end",
                marginRight: 14,
                marginBottom: 8
              }}
            >
              <Text
                style={{
                  color: "#CE2027",
                  fontFamily: "century-gothic-bold",
                  paddingHorizontal: 8,
                  fontSize: 11
                }}
              >
                {"* Free delivery for orders over 350"}
              </Text>
            </View>

            {/* If food type is pizza or pizza selected from by one get one free then render below view*/}
            {this.props.counterStore.isPizza || this.props.counterStore.ByOneGetOneFreePizza ? (
              <RenderSegmentControlClone />
            ) : null}
          </View>

          <View
            style={{
              flex: 1
            }}
          >
            {/* Is this Pizza deal? then it will show the pizza flavour selection drop down*/}

            {this.props.counterStore.isPizzaDeal ? ( //this view only appear if it is pizza deal
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start"
                }}
              >
                <View style={{ marginLeft: 16 }}>
                  <TextLabel labelText="Pizza Flavor" />
                </View>

                {Array.from(
                  Array(this.props.counterStore.pizzaDealQuantity)
                ).map((s, i) => (
                  <DealChoiceView
                    isPizzaItems={true}
                    text={"Pizza " + (i + 1)}
                    onValueChange={value => {
                      this.props.counterStore.setPizzaIndexValue(i, value);
                    }}
                  />
                ))}
              </View>
            ) : null}

            {/* Is the drinks included with item? then it will show the flavour selection for drink.  */}

            {this.props.counterStore.isDrinkWithItem ? (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start"
                }}
              >
                <View style={{ marginLeft: 16 }}>
                  <TextLabel labelText="Drink Flavor" />
                </View>

                {Array.from(
                  Array(this.props.counterStore.drinkQuantityWithItem)
                ).map((s, i) => (
                  <DealChoiceView
                    isPizzaItems={false}
                    text={"Drink " + (i + 1)}
                    onValueChange={value => {
                      this.props.counterStore.setDrinkIndexValue(i, value);
                    }}
                  />
                ))}
              </View>
            ) : null}

            {/* Make-A-Meal text View */}
            {this.props.counterStore.isMakeAMeal ? (
              <View>
                <View style={{ marginLeft: 16 }}>
                  <TextLabel labelText="Make IT A Meal" />
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 3,
                      flexDirection: "column"
                    }}
                  >
                    {Array.from(
                      Array(this.props.counterStore.makeAmeal.length)
                    ).map((s, i) => (
                      <MakeAMeal
                        itemName={this.props.counterStore.makeAmeal[i].itemName}
                        price={this.props.counterStore.makeAmeal[i].price}
                        limit={this.props.counterStore.makeAMealLimit}
                      />
                    ))}
                  </View>
                </View>
              </View>
            ) : null}

            {/* Add-Ons text View */}
            <View style={{ marginLeft: 16 }}>
              <TextLabel labelText="Add - on" />
            </View>

            {/* Add-Ons item View which included couple of add-ons which are placed on firebase*/}
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flex: 3,
                  flexDirection: "column"
                }}
              >
                {Array.from(
                  Array(this.props.counterStore.addOnItems.length)
                ).map((s, i) => (
                  <AddOn
                    itemName={this.props.counterStore.addOnItems[i].itemName}
                    price={this.props.counterStore.addOnItems[i].price}
                  />
                ))}
              </View>
            </View>

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
                <Native.Text style={{ fontFamily: "century-gothic" }}>
                  {"Item total"}
                </Native.Text>

                <Text
                  style={[
                    styles.subHeadingCss,
                    { paddingBottom: 8, color: "#CE2027" }
                  ]}
                >
                  {"Sub Total"}
                </Text>
              </View>

              {/* Restuarant Bill Right part: which contains prices */}
              <View
                style={{
                  width: undefined,
                  flexDirection: "column"
                }}
              >
                <Native.Text style={{ fontFamily: "century-gothic" }}>
                  {"Rs. "} {this.props.counterStore.item.price}
                  {" x "}
                  {this.props.counterStore.makeAMealLimit }
                </Native.Text>

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
                  {this.props.counterStore.totalPriceValue}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Add to cart Button to go the Cart screen to confirm order */}
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 16,
            marginBottom: 8,
            justifyContent: "flex-end",
            paddingHorizontal: 32
          }}
        >
          <CustomButton
            customStyle="signUpButtonRed"
            text="Add to cart"
            onPress={() => {
              // if this is the pizza deal
              if (this.props.counterStore.isPizzaDeal) {
                // alert messages if the deal pizza's flavor is not selected
                if (this.props.counterStore.isSelectPizaFlavor) {
                  this.setState({ visible: true });

                  this.handleOpen(
                    "Please select the flavour for Pizza.",
                    "Pizza Flavour"
                  );
                } else {
                  //Pizza deal check the drink selection && does the drink exist in this deal or item
                  if (
                    this.props.counterStore.isSelectDrinkFlavor &&
                    this.props.counterStore.isDrinkWithItem == true
                  ) {
                    this.handleOpen(
                      "Please select the flavour of your drink.",
                      "Drink Flavour"
                    );
                    // alert("Please select the flavor of your drink! ");
                    return;
                  }

                  //add to cart navigate and few processes
                  this.addToCartProcess();
                }
              } else {
                //Normal item deal check the drink selection
                if (
                  this.props.counterStore.isSelectDrinkFlavor &&
                  this.props.counterStore.isDrinkWithItem == true
                ) {
                  this.handleOpen(
                    "Please select the flavor of your drink.",
                    "Drink Flavour"
                  );

                  return;
                }

                //add to cart navigate and few processes
                this.addToCartProcess();
              }
            }}
          />
        </View>

        {/* Warning Dialog */}
        <SCLAlert
          theme="warning"
          show={this.state.infoDialog}
          title={this.state.title}
          subtitle={this.state.alertMessage}
          cancellable={true}
          onRequestClose={this.handleClose}
        >
          <SCLAlertButton theme="warning" onPress={this.handleClose}>
            Ok
          </SCLAlertButton>
        </SCLAlert>
      </View>
    );
  }
}

@inject("counterStore")
class RenderSegmentControlClone extends Component {
  constructor() {
    super();
    this.state = {
      selectedSegment: "Personal"
    };
  }

  onValueUpdate(value) {
    this.setState({
      selectedSegment: value
    });
  }

  render() {
    return (
      <View style={{}}>
        <SegmentedControls
          tint={"#CE2027"}
          selectedTint={"white"}
          separatorWidth={0}
          backTint={"white"}
          separatorWidth={0}
          options={options}
          optionStyle={{
            fontFamily: "century-gothic",
            fontSize: 11
          }}
          containerStyle={{
            marginLeft: 16,
            marginRight: 16
          }}
          onSelection={value => this.onValueUpdate(value)}
          selectedOption={this.state.selectedSegment}
        />
        {/* Set the pizza type */}
        {this.props.counterStore.setPizzaType(this.state.selectedSegment)}
        {this.state.selectedSegment === "Personal"
          ? this.props.counterStore.setItemPrice(
              this.props.counterStore.pizza.personalPrice
            )
          : this.state.selectedSegment === "Small"
            ? this.props.counterStore.setItemPrice(
                this.props.counterStore.pizza.smallPrice
              )
            : this.state.selectedSegment === "Medium"
              ? this.props.counterStore.setItemPrice(
                  this.props.counterStore.pizza.mediumPrice
                )
              : this.state.selectedSegment === "Large"
                ? this.props.counterStore.setItemPrice(
                    this.props.counterStore.pizza.largePrice
                  )
                : console.log("Somthing wrong in pizza name selecition")}
      </View>
    );
  }
}
