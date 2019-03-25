import React from "react";
import { Text, View, Button, Image, ActivityIndicator } from "react-native";
import { inject, observer } from "mobx-react";
import ListView from "../components/ListView";

@inject("counterStore")
@observer
export default class DishDetails extends React.Component {
  dishTitle;
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.previousComponentData}`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "#CE2027"
    },
    headerTintColor: "#fff"
  });

  constructor(props) {
    super(props);

    //getting dish name and removing spaces
    dish = this.props.navigation.state.params.previousComponentData;
    dishTitle = dish;
    for (i = 0; i < dish.length; i++) {
      dish = dish.replace(" ", "_");
    }
    this.state = {
      dishName: dish,
      isLoading: true,
      data: []
    };
  }
  //life cycle method
  componentWillMount() {
    //if food category is Pizza Deals then show a user, list of available flavour of Pizza to customize
    if (
      this.props.navigation.state.params.previousComponentData === "Pizza Deals"
    ) {
      databaseReference
        .database()
        .ref("Pizza_flavours")
        .on("value", snapshot => {
          console.log(snapshot.val());
          this.props.counterStore.setPizzaFlavours(snapshot.val());
        });
    }

    databaseReference
      .database()
      .ref("Drinks")
      .on("value", snapshot => {
        this.props.counterStore.setDrinkFlavours(snapshot.val());
      });
  }

  componentDidMount() {

    var dishesDetails = [];
    var ref = databaseReference.database().ref();
    var dishes = ref
      .child("Product_Details")
      .child(this.state.dishName)
      .once("value");
    dishes.then(items => {
      items.forEach(item => {

        console.log("************************Priority: "+item.val().priority);
        if (item.val().product_status === "yes") {
          if(this.state.dishName==="Buy_One_Get_One"){
            dishesDetails[item.val().priority]=item;
            
          }else{
          dishesDetails.push(item);
          }
        }
      });
      this.setState({
        dishName: dish,
        isLoading: false,
        data: dishesDetails
      });
    });
  }
  render() {
    console.log(this.state.data.length);
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#CE2027" />
        </View>
      );
    }
    if (this.state.data.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Image
            source={require("../assets/images/orders.png")}
            style={{ height: 235, width: 180, marginTop: 48 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "century-gothic-bold",
              fontSize: 20,
              margin: 10,
              color: "#CE2027",
            }}
          >
            {"Hey! We are sorry"}{"\n"}{"No item available for now."}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#F3F3F3"
        }}
      >
        <ListView
          isPriceVisible="true"
          data={this.state.data}
          actionScreen="itemDetails"
          dishTitle={dishTitle}
          changeScreen={this.props.navigation}
        />
      </View>
    );
  }
}
