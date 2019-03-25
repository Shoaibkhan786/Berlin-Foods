import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  Alert,
  Image
} from "react-native";
import styles from "../styles/styles";
import CustomButton from "../components/Button";
import { inject, observer } from "mobx-react";
import databaseReference from "../components/DatabaseConfig";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";
import { Notifications } from "expo";
import TextLabel from "../components/TextLabel";
import { Radio } from "native-base";
import * as Native from "native-base";

@inject("counterStore")
@observer
export default class ConfirmOrderScreen extends Component {
  static navigationOptions = {
    title: "Confirm Order",
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "#CE2027"
    },
    headerTintColor: "#fff"
  };

  constructor(props) {
    super(props);
    console.log("constructor");
    //check where user already gave his/her shipping address
    this.state = {
      location: "",
      specialInstructions: "",
      textDeliveryAddress: "",
      infoDialog: false,
      successDialog: false,
      alertMessage: "",
      title: "",
      isTakeaway: false,
      isDining: false,
      isHome: true,
      addToCartList: null
    };

    this.props.counterStore.setIsTakeAwayOrDining(false);
  }

  componentWillMount() {
    // getting Available table information from firebase
    let ref = databaseReference
      .database()
      .ref("Tables")
      .once("value");
    ref.then(item => {
      console.log("tables are :" + item.val());
      this.props.counterStore.availableTables = item.val();
    });
    //check where user already gave his/her shipping address
    AsyncStorage.getItem("userInfo", (err, item) => {
      if (item != null) {
        this.isItemNull = true;
        let parseData = JSON.parse(item);
        this.props.counterStore.setPhoneValue(parseData.phoneNumber);
        this.props.counterStore.setDeliveryAddress(parseData.address);
        this.props.counterStore.setSector(parseData.sector);
        this.props.counterStore.setUsername(parseData.username);
      } else {
        console.log("mehrbani kr yr");
      }
    });
  }

  /**
   * TODO:Below function would be updated in coming versios
   */

  isNumberPk(value) {
    console.log("Number half +92: " + value.slice(0, 3));
    console.log("Number half code: " + value.slice(3));
    console.log("Number half is correct: " + !isNaN(value.slice(3)));
    if (value.slice(0, 3) === "+92" && !isNaN(value.slice(3))) {
      return true;
    }
    return false;
  }

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

  /****
   * Function for saving user number phone,address and sector method for
   * getting device token and saving them into firebasereal-time database
   * */

  //Method for saving username, number phone,address and sector locally
  saveUserInfoLocally() {
    let userPostingAddress = {
      phoneNumber: this.props.counterStore.phoneNumberValue,
      address: this.props.counterStore.deliveryAddress,
      sector: this.props.counterStore.selectedSector,
      username: this.props.counterStore.username
    };
    AsyncStorage.setItem("userInfo", JSON.stringify(userPostingAddress));
  }
  pushData() {
    //alert message
    this.setState({ show: true });

    // success dialog state
    this.setState({ successDialog: true });

    //method call
    this.saveUserInfoLocally();

    const date = new Date();
    const time = date.getTime();
    // Order list
    console.log("takaway value is :" + this.state.isTakeaway);
    var object;

    if (this.state.isHome == true) {
      object = {
        username: this.props.counterStore.username,
        phoneNumber: this.props.counterStore.phoneNumberValue,
        address: this.props.counterStore.deliveryAddress,
        dishName: this.props.counterStore.item.foodName,
        customizeDescription: this.props.counterStore.finalOrderDescription, //total items description
        totalPrice: this.props.counterStore.totalPriceAddToCartItems, //total price of all items in add to cart added price
        sector: this.props.counterStore.selectedSector,
        dishCategory: this.props.counterStore.dishCategory,
        specialInstructions: this.state.specialInstructions,
        orderTime: time.toString(),
        status: "Pending",
        imagePath: this.props.counterStore.item.image,
        delivery_time: "Not Applicable"
      };
    }
    if (this.state.isTakeaway == true) {
      object = {
        username: this.props.counterStore.username,
        phoneNumber: this.props.counterStore.phoneNumberValue,
        address: "",
        dishName: this.props.counterStore.item.foodName,
        customizeDescription: this.props.counterStore.finalOrderDescription, //total items description
        totalPrice: this.props.counterStore.totalPriceAddToCartItems, //total price of all items in add to cart added price
        sector: "",
        dishCategory: this.props.counterStore.dishCategory,
        specialInstructions: this.state.specialInstructions,
        orderTime: time.toString(),
        status: "Pending",
        imagePath: this.props.counterStore.item.image,
        delivery_time: "Not Applicable",
        collectingOrder: this.props.counterStore.selectedTime
      };
    }

    if (this.state.isDining == true) {
      object = {
        username: this.props.counterStore.username,
        phoneNumber: this.props.counterStore.phoneNumberValue,
        address: "Table No. " + this.props.counterStore.selectedTable,
        dishName: this.props.counterStore.item.foodName,
        customizeDescription: this.props.counterStore.finalOrderDescription, //total items description
        totalPrice: this.props.counterStore.totalPriceAddToCartItems, //total price of all items in add to cart added price
        sector: "",
        dishCategory: this.props.counterStore.dishCategory,
        specialInstructions: this.state.specialInstructions,
        orderTime: time.toString(),
        status: "Pending",
        imagePath: this.props.counterStore.item.image,
        delivery_time: "Not Applicable",
        collectingOrder: ""
      };
    }

    const array = [];
    {
      this.props.counterStore.addToCartList.map((object, item) => {
        array.push(object);
      });
    }

    // History for the user profile object
    const object2 = {
      totalPrice: this.props.counterStore.totalPriceAddToCartItems, //total price of all items in add to cart added price
      orderTime: time.toString(),
      status: "Pending",
      delivery_time: "Not Applicable",
      orderList: array
    };

    // here the request to the cloud! :D
    databaseReference
      .database()
      .ref("Orders/new")
      .child("" + time)
      .set(object)
      .then(data => {
        //success callback
        console.log("data success", data);
      })
      .catch(error => {
        // //error callback
        console.log("Error callback", data);
      });

    //adding data to user history
    databaseReference
      .database()
      .ref("UsersHistory")
      .child(this.props.counterStore.phoneNumberValue)
      .child("" + time)
      .set(object2)
      // alert("Your order successfully placed!");
      .catch(error => {
        //error callback
        console.log("error success XD ", error);
      });

    //set the initial states
    this.props.counterStore.setFinalOrderDescription("");
    this.props.counterStore.setAddToCartList([]);
    AsyncStorage.setItem("addToCartList", JSON.stringify([]));
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
            {/* Delivery Charges */}
            {this.props.counterStore.totalChargesApplied ? (
              <Text style={[styles.regularTextCss, { paddingBottom: 8 }]}>
                {"Delivery charges"}
              </Text>
            ) : null}

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

            {/* Delivery Charges Price*/}
            {this.props.counterStore.totalChargesApplied ? (
              <Text
                style={[
                  styles.regularTextCss,
                  { marginRight: 8, paddingBottom: 8 }
                ]}
              >
                {"Rs. "}{" "}
                {!this.props.counterStore.isTakeAwayOrDining
                  ? this.props.counterStore.deliveryCharges
                  : "0"}
              </Text>
            ) : null}

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

  render() {
    // areas names
    let serviceItems = this.props.counterStore.sectors.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });

    // take away timing
    let takeawayTimings = this.props.counterStore.orderTime.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    //selected Tables
    let totalTables = this.props.counterStore.availableTables.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            flex: 1
          }}
        >
          <ScrollView>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={200}
              onKeyboardChange={() => console.log("Valeu is")}
            >
              {/* <Text style={[styles.subHeadingCss, { paddingLeft: 16 }]}>
                {"Add Details   "}
              </Text> */}

              <View style={{ padding: 12 }}>
                <TextLabel labelText="Delivery Options" />
              </View>
              {/* View for radio button selecting home or takeaway */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginLeft: 12
                }}
              >
                {/* Home Delivery View */}
                <Radio
                  color={"#CE2027"}
                  selectedColor={"#CE2027"}
                  selected={this.state.isHome === true ? true : false}
                  onPress={() => {
                    this.setState({
                      isTakeaway: false,
                      isDining: false,
                      isHome: !this.state.isHome
                    });
                    console.log("Home  is " + !this.state.isHome);

                    //this is the flag for take away and dining then don't apply charges of delivery
                    this.props.counterStore.setIsTakeAwayOrDining(false);
                  }}
                />
                <Text
                  style={{
                    fontFamily: "century-gothic",
                    marginLeft: 8,
                    marginTop: 2
                  }}
                >
                  Home delivery
                </Text>

                {/* Takeaway view */}
                <Radio
                  color={"#CE2027"}
                  selectedColor={"#CE2027"}
                  selected={this.state.isTakeaway ? true : false}
                  style={{ marginLeft: 16 }}
                  onPress={() => {
                    //if takeaway is true then dont apply charges
                    if (this.state.isTakeaway === true) {
                      this.props.counterStore.isTakeAwayOrDining = true;
                    }
                    this.setState({
                      isHome: false,
                      isDining: false,
                      isTakeaway: !this.state.isTakeaway
                    });

                    console.log("takeaway is " + this.state.isTakeaway);
                    this.props.counterStore.setIsTakeAwayOrDining(
                      !this.state.isTakeaway
                    );
                  }}
                />
                <Text
                  style={{
                    fontFamily: "century-gothic",
                    marginLeft: 8,
                    marginTop: 2,
                    marginRight: 16
                  }}
                >
                  Takeaway
                </Text>
                {/* Dining Table View */}
                <Radio
                  color={"#CE2027"}
                  selectedColor={"#CE2027"}
                  selected={this.state.isDining ? true : false}
                  style={{ marginLeft: 16 }}
                  onPress={() => {
                    //if isDining is true then dont apply charges
                    if (this.state.isDining === true) {
                      this.props.counterStore.isTakeAwayOrDining = true;
                    }
                    this.setState({
                      isTakeaway: false,
                      isHome: false,
                      isDining: !this.state.isDining
                    });
                    console.log("Dining vaues are  " + this.state.isDining);
                    this.props.counterStore.setIsTakeAwayOrDining(
                      !this.state.isDining
                    );
                  }}
                />
                <Text
                  style={{
                    fontFamily: "century-gothic",
                    marginLeft: 8,
                    marginTop: 2,
                    marginRight: 16
                  }}
                >
                  Dining
                </Text>
                {/* If user uncheck all the delivery option then select home by default */}
                {this.state.isDining === false &&
                this.state.isTakeaway === false &&
                this.state.isHome === false
                  ? this.setState({ isHome: true })
                  : null}
                {/* <RadioGroup radioButtons={this.state.data} onPress={this.onPress}  flexDirection='row' /> */}
              </View>

              {/* If takeaway and Dining is false then render sector information */}
              {this.state.isTakeaway == false &&
              this.state.isDining == false ? (
                <View
                  style={[
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 16,
                      borderBottomWidth: 0.5,
                      borderColor: "#c9c9c9"
                    }
                  ]}
                >
                  <View style={{ flex: 1 + 1 / 2, justifyContent: "center" }}>
                    <Native.Text style={{ fontFamily: "century-gothic" }}>
                      {"Select sector"}
                    </Native.Text>
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
                      selectedValue={this.props.counterStore.selectedSector}
                      style={[styles.cell]}
                      onValueChange={(itemValue, itemIndex) => {
                        this.props.counterStore.setSector(itemValue);
                      }}
                    >
                      {serviceItems}
                    </Picker>
                  </View>
                </View>
              ) : null}

              {/* Username */}

              <View
                style={[
                  {
                    padding: 16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.5,
                    borderColor: "#c9c9c9"
                  }
                ]}
              >
                <View style={{ flex: 1 + 1 / 2, justifyContent: "center" }}>
                  <Native.Text style={{ fontFamily: "century-gothic" }}>
                    {"Name"}
                  </Native.Text>
                  {/* <Text style={styles.addDetailSubheadings}>{"Name"}</Text> */}
                </View>

                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    width: undefined
                  }}
                >
                  {/* Custom Create One */}
                  <TextInput
                    value={this.props.counterStore.username}
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                      fontFamily: "century-gothic"
                    }}
                    onChangeText={username => {
                      // this.setState({ username })
                      this.props.counterStore.setUsername(username);
                    }}
                    placeholder="Enter your name"
                    underlineColorAndroid="transparent"
                    maxLength={20}
                    minLength={3}
                  />
                </View>
              </View>

              {/* Contact */}
              {/* If user selects the dining option then no need ask for his/her number */}
              <View
                style={[
                  {
                    padding: 16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.5,
                    borderColor: "#c9c9c9"
                  }
                ]}
              >
                <View style={{ flex: 1 + 1 / 2, justifyContent: "center" }}>
                  <Native.Text style={{ fontFamily: "century-gothic" }}>
                    {"Contact info"}
                  </Native.Text>
                </View>

                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    width: undefined
                  }}
                >
                  {/* TODO: Future release will restrict to only pakistan country and code restricted */}
                  {/* <PhoneInput
                    style={{ flex: 1 }}
                    maxLength={10}
                    value={this.props.counterStore.phoneNumberValue}
                    onPressFlag={() => null}
                    initialCountry="pk"
                    ref={ref => {
                      this.phone = ref;
                    }}
                    onChangePhoneNumber={phone => {
                      if (phone.length > 2 && phone.length < 14) {
                        // this.onChangePhoneNumber(onlyNumbers(phone));
                        console.log("Number 2: " + phone);

                        // set the user phone number in the store
                        this.props.counterStore.setPhoneValue(phone);
                      }
                    }}
                  /> */}

                  <Image
                    source={require("../assets/icons/pakistan.png")}
                    style={{
                      height: 24,
                      width: 24,
                      marginRight: 4,
                      margin: 2
                    }}
                    resizeMode="contain"
                  />

                  <TextInput
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                      fontFamily: "century-gothic"
                    }}
                    keyboardType={"numeric"}
                    maxLength={13}
                    onChangeText={phone => {
                      if (phone.length > 3 && phone.length < 14) {
                        // this.onChangePhoneNumber(onlyNumbers(phone));
                        console.log("Number 2: " + phone);

                        // set the user phone number in the store
                        this.props.counterStore.setPhoneValue(phone);
                      }
                    }}
                    value={this.props.counterStore.phoneNumberValue}
                    placeholder="Phone Number"
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>

              {/* Different Views rendering based on user action on radio buttons */}
              {this.state.isHome === true ? (
                <View>
                  <View
                    style={[
                      {
                        padding: 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottomWidth: 0.5,
                        borderColor: "#c9c9c9"
                      }
                    ]}
                  >
                    <View style={{ flex: 1 + 1 / 2, justifyContent: "center" }}>
                      <Native.Text style={{ fontFamily: "century-gothic" }}>
                        {"Delivery address"}
                      </Native.Text>
                    </View>

                    <View
                      style={{
                        flex: 2,
                        flexDirection: "row",
                        width: undefined
                      }}
                    >
                      <TextInput
                        style={{
                          flex: 1,
                          width: undefined,
                          height: undefined,
                          fontFamily: "century-gothic"
                        }}
                        multiline={true}
                        maxLength={100}
                        onChangeText={text => {
                          //this.setState({ textDeliveryAddress: text });
                          this.props.counterStore.setDeliveryAddress(text);
                          console.log("Delivery Address is: " + text);
                        }}
                        value={this.props.counterStore.deliveryAddress}
                        placeholder="Enter complete address"
                        underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>

                  {/* Delivery Time */}

                  <View
                    style={[
                      {
                        padding: 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottomWidth: 0.5,
                        borderColor: "#c9c9c9"
                      }
                    ]}
                  >
                    <View style={{ flex: 1 + 1 / 2, justifyContent: "center" }}>
                      <Native.Text style={{ fontFamily: "century-gothic" }}>
                        {"Delivery time"}
                      </Native.Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        flexDirection: "row",
                        width: undefined,
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={this.increaseItemQuantity}
                        style={{ flexDirection: "row" }}
                      >
                        <Text
                          style={[styles.selectPayment, { color: "#c9c9c9" }]}
                        >
                          {"ASAP"}{" "}
                          {"(" + this.props.counterStore.deliveryTime + ")"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : this.state.isTakeaway === true ? (
                <View
                  style={[
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 16,
                      borderBottomWidth: 0.5,
                      borderColor: "#c9c9c9"
                    }
                  ]}
                >
                  <View style={{ flex: 1 + 1 / 2, justifyContent: "center" }}>
                    <Native.Text style={{ fontFamily: "century-gothic" }}>
                      {"Time to Collect"}
                    </Native.Text>
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
                      selectedValue={this.props.counterStore.selectedTime}
                      style={[styles.cell]}
                      onValueChange={(itemValue, itemIndex) => {
                        this.props.counterStore.setSelectedTime(itemValue);
                      }}
                    >
                      {takeawayTimings}
                    </Picker>
                  </View>
                </View>
              ) : this.state.isDining === true ? (
                <View
                  style={[
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 16,
                      borderBottomWidth: 0.5,
                      borderColor: "#c9c9c9"
                    }
                  ]}
                >
                  <View style={{ flex: 1 + 1 / 2, justifyContent: "center" }}>
                    <Native.Text style={{ fontFamily: "century-gothic" }}>
                      {"Table Number"}
                    </Native.Text>
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
                      selectedValue={this.props.counterStore.selectedTable}
                      style={[styles.cell]}
                      onValueChange={(itemValue, itemIndex) => {
                        this.props.counterStore.selectedTable = itemValue;
                        console.log(
                          "table ye ha " + this.props.counterStore.selectedTable
                        );
                      }}
                    >
                      {totalTables}
                    </Picker>
                  </View>
                </View>
              ) : null}

              {/* TODO: In furthur release this location picker will be a component Select Sector Component */}

              {this.returnBillView()}

              {/* Special Instructions */}

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.regularTextCss,
                    {
                      marginTop: 8,
                      color: "#CE2027",
                      paddingLeft: 16,
                      fontFamily: "century-gothic-bold"
                    }
                  ]}
                >
                  {"Special Instructions"}
                </Text>

                <View>
                  <TextInput
                    style={{
                      width: undefined,
                      height: undefined,
                      marginLeft: 16,
                      marginRight: 16,
                      marginBottom: 16,
                      fontFamily: "century-gothic"
                    }}
                    multiline={true}
                    onChangeText={text => {
                      this.setState({ specialInstructions: text });
                    }}
                    value={this.state.text}
                    placeholder="Type here ..."
                    underlineColorAndroid="transparent"
                  />
                </View>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    marginTop: 16,
                    fontSize: 12,
                    marginRight: 24,
                    fontFamily: "century-gothic",
                    color: "#686b78"
                  }}
                >
                  {"*optional*"}
                </Text>
              </View>

              {/* Payment Method */}

              {/* <View
            style={[
              {
                padding: 16,
                flexDirection: "row",
                justifyContent: "space-between"
              }
            ]}
          >
            <View style={{ flex: 1 + 1 / 2, justifyContent: "center" }}>
              <Text style={styles.addDetailSubheadings}>
                {"Payment Method"}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                width: undefined,
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={this.increaseItemQuantity}
                style={{ flexDirection: "row" }}
              >
                <Text style={styles.selectPayment}>
                  {"Select payment method"}
                </Text>
                
              </TouchableOpacity>
            </View>
          </View> */}

              {/* View to show the terms and condition text */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  marginTop: 8
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontFamily: "century-gothic" }}>
                    {"By completeting this order, I agree to all"}
                  </Text>
                  <Text
                    style={{
                      color: "#CE2027",
                      fontFamily: "century-gothic",
                      fontWeight: "bold"
                    }}
                  >
                    {"Terms & Conditions."}
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>

        {/* Confirm Order Button to perform action */}
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
            text="Confirm Order"
            onPress={() => {
              // isTakeAway is true then the following constraints will be apply {Name,ContactInfo,TimeToCollect}

              if (this.state.isTakeaway == true) {
                this.props.counterStore.username.length < 1
                  ? this.handleOpen("Please enter your name.", "Name")
                  : this.props.counterStore.username.length < 3
                    ? this.handleOpen(
                        "The name is too short. Please enter at least more than 3 characters.",
                        "Name"
                      )
                    : this.props.counterStore.phoneNumberValue.length < 13
                      ? this.handleOpen(
                          "Please enter your complete number",
                          "Phone Number"
                        )
                      : this.props.counterStore.phoneNumberValue.slice(0, 3) !=
                        "+92"
                        ? this.handleOpen(
                            "Sorry, the service is only available in Pakistan",
                            "Phone Number"
                          )
                        : isNaN(
                            this.props.counterStore.phoneNumberValue.slice(3)
                          )
                          ? this.handleOpen(
                              "Please enter the correct number. It contains invalid characters.",
                              "Phone Number"
                            )
                          : this.props.counterStore.restaurantStatus === true
                            ? this.handleOpen(
                                "Sorry! Restaurant is closed.You can not place order at the moment.",
                                "Restaurant Close"
                              )
                            : this.pushData();
              }

              // isHome is true then the following constraints will be apply {Sector,Name,ContactInfo,Delivery Address}
              if (this.state.isHome == true) {
                this.props.counterStore.username.length < 1
                  ? this.handleOpen("Please enter your name.", "Name")
                  : this.props.counterStore.username.length < 3
                    ? this.handleOpen(
                        "The name is too short. Please enter at least more than 3 characters.",
                        "Name"
                      )
                    : this.props.counterStore.phoneNumberValue.length < 13
                      ? this.handleOpen(
                          "Please enter your complete number",
                          "Phone Number"
                        )
                      : this.props.counterStore.phoneNumberValue.slice(0, 3) !=
                        "+92"
                        ? this.handleOpen(
                            "Sorry, the service is only available in Pakistan",
                            "Phone Number"
                          )
                        : isNaN(
                            this.props.counterStore.phoneNumberValue.slice(3)
                          )
                          ? this.handleOpen(
                              "Please enter the correct number. It contains invalid characters.",
                              "Phone Number"
                            )
                          : this.props.counterStore.deliveryAddress == "" ||
                            this.props.counterStore.deliveryAddress.length < 15
                            ? this.handleOpen(
                                "Please enter your address properly.",
                                "Address"
                              )
                            : this.props.counterStore.selectedSector === "" ||
                              this.props.counterStore.selectedSector ==
                                "Select Sector"
                              ? this.handleOpen(
                                  "Please select your sector from drop down.",
                                  "Sector"
                                )
                              : this.props.counterStore.restaurantStatus ===
                                true
                                ? this.handleOpen(
                                    "Sorry! Restaurant is closed.You can not place order at the moment.",
                                    "Restaurant Close"
                                  )
                                : this.pushData();
              }

              // isDining is true then the following constraints will be apply {Name}
              if (this.state.isDining == true) {
                this.props.counterStore.username.length < 1
                  ? this.handleOpen("Please enter your name.", "Name")
                  : this.props.counterStore.username.length < 3
                    ? this.handleOpen(
                        "The name is too short. Please enter at least more than 3 characters.",
                        "Name"
                      )
                    : this.props.counterStore.phoneNumberValue.length < 13
                      ? this.handleOpen(
                          "Please enter your complete number",
                          "Phone Number"
                        )
                      : this.props.counterStore.phoneNumberValue.slice(0, 3) !=
                        "+92"
                        ? this.handleOpen(
                            "Sorry, the service is only available in Pakistan",
                            "Phone Number"
                          )
                        : isNaN(
                            this.props.counterStore.phoneNumberValue.slice(3)
                          )
                          ? this.handleOpen(
                              "Please enter the correct number. It contains invalid characters.",
                              "Phone Number"
                            )
                          : this.props.counterStore.restaurantStatus === true
                            ? this.handleOpen(
                                "Sorry! You can not place order at the moment.",
                                "Restaurant Close"
                              )
                            : this.pushData();
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

        {/* Success Dialog */}
        <SCLAlert
          theme="success"
          show={this.state.successDialog}
          cancellable={true}
          onRequestClose={() => {
            this.handleClose();
            this.props.navigation.navigate("MainScreen");
          }}
          title="Order Placed"
          subtitle={"Your order successfully placed"}
        >
          <SCLAlertButton
            theme="success"
            onPress={() => {
              this.handleClose();
              this.props.navigation.navigate("MainScreen");
            }}
          >
            Done
          </SCLAlertButton>
        </SCLAlert>
      </View>
    );
  }
}
