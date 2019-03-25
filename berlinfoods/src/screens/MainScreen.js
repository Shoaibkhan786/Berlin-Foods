import React, { Component } from "react";
import Header from "../components/Header";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import TextLabel from "../components/TextLabel";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  AsyncStorage
} from "react-native";
import Slider from "../components/Slider";
import ListView from "../components/ListView";
import { Notifications } from "expo";
import CustomButton from "../components/Button";
import { inject, observer } from "mobx-react";

import Dialog, {
  SlideAnimation,
  DialogButton,
  DialogTitle
} from "react-native-popup-dialog";

@inject("counterStore")
@observer
class MainScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={require("../assets/icons/copy-rights.png")}
          style={{ width: 16, height: 16 }}
        />
        <Text
          style={{
            fontFamily: "century-gothic",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 8
          }}
        >
          All rights are reserved.
        </Text>
      </View>
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      bool:false
    };
  }
   // //method for getting device token and saving them into firebase real-time database
   registerForPushNotificationsAsync() {
    // Get the token that uniquely identifies this device
    AsyncStorage.getItem("deviceToken", (err, item) => {
    if(item==null){
      console.log("lala main tou null tha")
    const date = new Date();
    const time = date.getTime();
    console.log("time is"+time)
    console.log("registerPushnooticatio call ");
    let parseData;
    //getting device token from firebase;
    Notifications.getExpoPushTokenAsync().then(token => {
      databaseReference
        .database()
        .ref()
        .child("deviceTokens")
        .child(""+time)
        .set({
          deviceToken: token
        });
    });
    // save device token locally
    let devicToken={
      token:time,
    }
    AsyncStorage.setItem("deviceToken", JSON.stringify(devicToken));
  }else{
      console.log("lala mhrbani kr")
  }
    });
  }
  //Close
  handleClose = () => {
    console.log("comming")
    //this.setState({ infoDialog: false, successDialog: false });
  };

  componentWillMount() {
     //save device token
     this.registerForPushNotificationsAsync();
    Notifications.addListener(this._handleNotification);

    AsyncStorage.getItem("addToCartList").then(addToCartList => {
      const list = addToCartList ? JSON.parse(addToCartList) : [];
      
      // Here I set the Add To Cart store list in store
      this.props.counterStore.setAddToCartList(list);
    });
  }

  _handleNotification = notification => {
    var newNode = databaseReference
      .database()
      .ref(
        "Product_Details/" +
          notification.data.category +
          "/" +
          notification.data.dishName
      )
      .once("value");
    newNode.then(item => {
      this.props.navigation.navigate("itemDetails", {
        previousComponentData: item.val().name_of_product,
        imagePath: item.val().image_uri,
        price: item.val().price_of_product,
        smallPrice: item.val().small_price,
        mediumPrice: item.val().medium_price,
        largePrice: item.val().large_price,
        descp: item.val().description,
        title: notification.data.category,
        pizzaDealQuantity: item.val().quantity,
        drinkQuantity: item.val().drink_qty
      });
    });
  };  
  componentDidMount() {
    var dishesDetails = [];
    var ref = databaseReference.database().ref();
    var dishes = ref.child("Products/others/").once("value");
    dishes.then(items => {
      items.forEach(item => {
        dishesDetails[item.val().priority]=item
      });
      this.setState({
        isLoading: false,
        data: dishesDetails,
        bool:true
      });
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems:"flex-start", justifyContent:'flex-start' }}
        >
          <ActivityIndicator size="large" color="#CE2027" />
        </View>
      );
    }
    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "#f2f3f5" }}
      >
        <Header text="BerlinFoods" toggle={this.props.navigation} />
        <View
          style={{
            justifyContent: "center",
            marginTop:4,
            marginBottom:8
          }}
        >
          <View style={{ marginLeft: 8 }}>
            <TextLabel labelText="Deals of the day!" />
          </View>
        </View>
        <View
          style={{
            flex: 0.9,
            marginTop: 5
          }}
        >
          <Slider
            actionScreen="itemDetails"
            changeScreen={this.props.navigation}
          />
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "#F3F3F3",
            marginTop: 5,
            elevation: 3
          }}
        >
          <ListView
            isPriceVisible="false"
            data={this.state.data}
            actionScreen="DishDetails"
            dishTitle=""
            changeScreen={this.props.navigation}
          />
        </View>
        {/* Application is closed becuae of technical issues */}
        
        {/* <Dialog
              visible={this.state.bool}
              width={0.9}
              height={0.44}
              dialogAnimation={
                new SlideAnimation({
                  slideFrom: "bottom"
                })
              }
            >
              <DialogTitle
                title="Technical Issues"
                textStyle={{ color: "red" }}
              />
              <View style={{ margin:8,flex:1,flexDirection: "column",justifyContent:'flex-start',alignItems:'flex-start' }}>
              <Text style={{fontSize:16}}>{"Application is down because of technical issues but you can book the order by call. "}</Text>
              <View style={{marginTop:8,flex:1,justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'row'}}>
              <View>
              <Text style={{fontSize:16}}>{"Sorry for inconvenience!"}</Text>
              <Text style={{marginTop:4,fontSize:16,fontWeight:'bold'}}>Contact Number: 0336-1117272</Text>
              </View>
              </View>
              </View>
            </Dialog> */}
        
        {this.props.counterStore.addToCartList.length > 0 ? (
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 16,
              marginBottom: 4,
              marginTop: 4,
              justifyContent: "flex-end",
              paddingHorizontal: 32,
            }}
          >
            <CustomButton
              customStyle="signUpButtonRed"
              text={"View cart"}
              count={true}
              onPress={() => {
                this.props.navigation.navigate("AddToCartScreen");
              }}
            />
          </View>
        ) : null}
      </View>
    );
  }
} 
const CustomComponentForDrawer = props => (
  <View style={{ flex: 1, flexDirection: "column" }}>
    <Image
      style={{ flex: 1, height: "100%", width: "100%" }}
      source={require("../assets/icons/drawerImg.png")}
      resizeMode="center"
    />
    <ScrollView>
      <View style={{ flex: 2, flexDirection: "column" }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("UserHistory");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <Image
              source={require("../assets/icons/your-orders.png")}
              style={{ height: 32, width: 32, marginLeft: 8 }}
            />
            <Text
              style={{
                textAlign: "center",
                marginLeft: 8,
                fontFamily: "century-gothic-bold"
              }}
            >
              My Orders
            </Text>
          </View>
        </TouchableOpacity>

        {/* Add Cart to item */}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("AddToCartScreen");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <Image
              source={require("../assets/icons/cart_black.png")}
              style={{ height: 24, width: 24, marginLeft: 12 }}
              resizeMode="contain"
            />
            <Text
              style={{
                textAlign: "center",
                marginLeft: 11,
                fontFamily: "century-gothic-bold"
              }}
            >
              My Cart
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <View style={{ marginBottom: 16, flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://www.facebook.com/berlinfoods.pk/");
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: 8,
            marginLeft: 5
          }}
        >
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
              alignSelf: "baseline",
              width: 120,
              paddingLeft: 8,
              paddingTop: 8,
              paddingBottom: 8
            }}
          >
            <Image
              source={require("../assets/icons/Facebook.png")}
              style={{ height: 24, width: 24, borderRadius: 0.8 }}
            />

            <Text
              style={{
                textAlign: "center",
                marginLeft: 8,
                fontFamily: "century-gothic-bold"
              }}
            >
              Facebook
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://www.instagram.com/berlinfoods.pk/");
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginLeft: 5
          }}
        >
          <View
            style={{
              borderWidth: 0.5,
              borderRadius: 2,
              borderBottomWidth: 0,
              borderColor: "#ddd",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 1,
              flexDirection: "row",
              alignSelf: "baseline",
              width: 120,
              marginBottom: 8,
              paddingLeft: 8,
              paddingTop: 8,
              paddingBottom: 8
            }}
          >
            <Image
              source={require("../assets/icons/insta.png")}
              style={{ height: 23, width: 23, borderRadius: 0.8 }}
            />

            <Text
              style={{
                textAlign: "center",
                marginLeft: 8,
                fontFamily: "century-gothic-bold"
              }}
            >
              Instagram
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    <DrawerItems {...props} />
  </View>
);
const DrawerExample = createDrawerNavigator(
  {
    HomeRoute: {
      screen: MainScreen
    }
  },
  {
    contentComponent: CustomComponentForDrawer
  }
);
DrawerExample.navigationOptions = {
  header: null
};
export default DrawerExample;
