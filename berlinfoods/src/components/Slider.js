import React from "react";
import {
  View,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { inject, observer } from "mobx-react";
import databaseReference from "../components/DatabaseConfig";
@inject("counterStore")
@observer
export default class Slider extends React.Component {
  deviceWidth = Dimensions.get("window").width;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }
  componentWillMount() {
    //setting drink flavours
    databaseReference
      .database()
      .ref("Drinks")
      .on("value", snapshot => {
        this.props.counterStore.setDrinkFlavours(snapshot.val());
      });

    //set pizza flavours
    databaseReference
      .database()
      .ref("Pizza_flavours")
      .on("value", snapshot => {
        this.props.counterStore.setPizzaFlavours(snapshot.val());
      });

    let addOnItems = [];
    this.props.counterStore.setAddOnItems(addOnItems);

    //AddOn items
    databaseReference
      .database()
      .ref("AddOn")
      .on("value", snapshot => {
        let value = snapshot.val();

        snapshot.forEach(child => {
          addOnItems.push(child.val());
        });

        this.props.counterStore.setAddOnItems(addOnItems);
      });

    //Sectors of islamabad
    databaseReference
      .database()
      .ref("Sectors")
      .on("value", snapshot => {
        this.props.counterStore.setSectorValues(snapshot.val());
      });

    let makeAMealItems = [];
    this.props.counterStore.setMakeAMeal(makeAMealItems);
    //Make A Meal items
    databaseReference
      .database()
      .ref("MakeAMeal")
      .on("value", snapshot => {
        let value = snapshot.val();

        snapshot.forEach(child => {
          makeAMealItems.push(child.val());
        });

        this.props.counterStore.setMakeAMeal(makeAMealItems);

        // console.log("ObjectOne: "+value.addOn0.itemName);
      });
  }
  componentDidMount() {
    var dishesDetails = [];
    var ref = databaseReference.database().ref();
    var dishes = ref.child("Product_Details/Deals_of_the_day/").once("value");
    dishes.then(items => {
      items.forEach(item => {
        // console.log( item.val().name_of_product)
        dishesDetails.push(item);
      });
      this.setState({
        isLoading: false,
        data: dishesDetails
      });
    });
  }
  _renderItem(item) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.changeScreen.push(this.props.actionScreen, {
            previousComponentData: item.val().name_of_product,
            imagePath: item.val().image_uri,
            price: item.val().price_of_product,
            descp: item.val().description,
            title: item.val().food_category,
            drinkQuantity: item.val().drink_qty
          })
        }
      >
        <View
          style={{
            flex: 1,
            flexWrap: "wrap"
          }}
        >
          <Image
            source={{ uri: item.val().image_uri }}
            style={{ flex: 1, height: 150, width: 150 }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#c80000" />
        </View>
      );
    }
    return (
      <FlatList
        horizontal={true}
        data={this.state.data}
        ItemSeparatorComponent={() => <View style={{ width: 4 }} />}
        renderItem={({ item }) => this._renderItem(item)}
        keyExtractor={item => item.val().image_uri}
      />
    );
  }
}
