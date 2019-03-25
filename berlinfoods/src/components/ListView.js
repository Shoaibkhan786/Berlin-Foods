import React from "react";
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import TextLabel from "./TextLabel";
import { inject, observer } from "mobx-react";

@inject("counterStore")
@observer
export default class ListView extends React.Component {
  renderAvailableDishes(item,isVisible){
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          elevation: 3,
          shadowOpacity: 0.5,
          justifyContent:'center',
          margin: 3,
          alignItems: "center",
          backgroundColor: "white"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log('main tou pizza hn 0000000000'+item.val().pizza);
            if(item.val().pizza===true){
              this.props.counterStore.ByOneGetOneFreePizza=true;
            }else{
              this.props.counterStore.ByOneGetOneFreePizza=false;
            }
            //if the pizza item then its persional, medium, large option will be available other wise not
            

            this.props.changeScreen.push(this.props.actionScreen, {
              previousComponentData: item.val().name_of_product,
              imagePath: item.val().image_uri,
              price: item.val().price_of_product,
              smallPrice:item.val().small_price,
              mediumPrice:item.val().medium_price,
              largePrice:item.val().large_price,
              descp: item.val().description,
              title:this.props.dishTitle,
              pizzaDealQuantity:item.val().quantity,
              drinkQuantity:item.val().drink_qty,
              isPizzaDeal:item.val().isPizzaDeal,
              isMakeAMeal:item.val().isMakeAMeal

            });
          }} 
        >
          <View
            style={{
              height: 100,
              width: 100,
              flexDirection:'column',
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <Image
              source={{ uri: item.val().image_uri }}
              style={{ height: 100, width: 100 }}
              resizeMode="contain"
            />
          </View>
          </TouchableOpacity>
          <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <View>
          <Text
            style={{  
              textAlign: "center",
              fontFamily: "century-gothic-bold",
              color: "#CE2027",
              borderRadius: 4
            }}
          >
            {item.val().name_of_product}
          </Text>
          </View>
          <View style={{marginTop:4, marginBottom:8}}>
          {isVisible === true ? (
            <TextLabel labelText={"Rs. " + item.val().price_of_product}/>
        ) : null}
        </View>
        </View>
      </View>
    );
    
  }
  _renderItem(item) {
    let isVisible = this.props.isPriceVisible == "true" ? true : false;
    return(this.renderAvailableDishes(item,isVisible))
  }
  render() {
    return (
      <FlatList
        numColumns={2}
        renderItem={({ item }) => this._renderItem(item)}
        data={this.props.data}
        keyExtractor={item => item.val().name_of_product}
      />
    );
  }
}