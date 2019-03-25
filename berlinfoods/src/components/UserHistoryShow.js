import React, { Component } from "react";
import { Text, View, FlatList, Image } from "react-native";
import { AsyncStorage } from "react-native";
import TextLabel from "./TextLabel";
import _Text from "./_Text";
import _TextView from "./_TextView";
import styles from "../styles/styles";

export default class UserHistoryShow extends Component {
  constructor(props) {
    super(props);
  }
  _renderItem(item, index) {
    // console.log("My order list item: "+item.val().orderList[0].description);
    var object = item.val().orderList;
    console.log("look at that : " + item.val().totalPrice);
    //object=JSON.stringify(object)
    var dateTime = parseInt(item.val().orderTime);
    dateTime = new Date(dateTime);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          elevation: 3,
          shadowOpacity: 0.5,
          backgroundColor: "white",
          justifyContent: "flex-start",
          elevation: 5,
          borderRadius: 4,
          shadowOpacity: 0.7,
          padding: 8,
          margin: 8
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            // backgroundColor:'green',
            marginLeft: 8,
            marginRight:8,
            marginBottom: 8,
            marginTop: 4,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center", }}>
            <TextLabel labelText={dateTime.toDateString()} />
            {/* <Text
              style={{
                fontFamily: "century-gothic-bold",
                fontSize: 14
              }}
            >
              {dateTime.toDateString()}
            </Text> */}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginRight: 8,
              marginTop: 3
            }}
          >
            {item.val().status === "Pending" ? (
              <Image
                source={require("../assets/images/Pending.png")}
                style={{ height: 25, width: 25, resizeMode: "contain" }}
              />
            ) : item.val().status === "Accepted" ? (
              <Image
                source={require("../assets/images/Approved.png")}
                style={{ height: 25, width: 25, resizeMode: "contain" }}
              />
            ) : (
              <Image
                source={require("../assets/images/Rejected.png")}
                style={{ height: 25, width: 25, resizeMode: "contain" }}
              />
            )}
          </View>
        </View>
        {/* Custome View for dynamic rendering of Dishes */}
        {/* <CustomView data={object} ></CustomView> */}
        {object.map(item => {
          return (
            <View style={{ marginLeft: 8, marginRight:8, marginTop:4, marginBottom:4,  elevation: 3, flexDirection: "row", flex: 1 }}>
              <Text
                style={[styles.subHeadingCss, { fontSize: 16, color: "black" }]}
              >
                {item.item.foodName}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginRight: 8
                }}
              >
                <Text
                  style={[
                    styles.subHeadingCss,
                    { fontSize: 16, color: "black" }
                  ]}
                >
                  {" "}
                  {"Rs. "}
                  {item.totalPrice}
                </Text>
              </View>
            </View>
          );
        })}

        <View style={{flex:1,flexDirection:'row', }}>
        <View
          style={{
            flex:1,
            flexDirection:"row",
            marginTop: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#c9c9c9",
            width:10,
          }}
        />
        </View>
       
        {/* View for total Price of the item */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginLeft: 8,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={[styles.subHeadingCss, {  fontSize:18, color: "#CE2027" }]}
          >
            Total Price
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              margin: 8
            }}
          >
            <Text
              style={[styles.subHeadingCss, { fontSize:18, color: "#CE2027" }]}
            >
              {" "}
              {"Rs. "}
              {item.val().totalPrice}
            </Text>
          </View>
        </View>
        {/* View for date and time */}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexDirection: "row"
          }}
        />
      </View>
    );
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor: "white" }}>
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={{ width: 5, height: 5 }} />
          )}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          data={this.props.data}
          keyExtractor={(item, index) => item.val().orderTime}
        />
      </View>
    );
  }
}
