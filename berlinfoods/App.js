import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { Font, Permissions, Notifications } from "expo";
import { StyleSheet, Text, View} from "react-native";
import { Provider,inject } from "mobx-react";
import MainScreen from './src/screens/MainScreen'
import DishDetails from './src/screens/DishDetails'
import PlaceOrderScreen from "./src/screens/PlaceOrderScreen";
import ConfirmOrderScreen from "./src/screens/ConfirmOrderScreen";
import RatingFoodScreen from "./src/screens/RatingFoodScreen";
import CounterStore from "./src/stores/CounterStore";
import UserHistory from "./src/screens/UserHistoryScreen";
import AddToCartScreen from "./src/screens/AddToCartScreen";

const Navigation = createStackNavigator(
   { 
     MainScreen:MainScreen,
     DishDetails:DishDetails,
     itemDetails:PlaceOrderScreen,
     ConfirmOrderScreen:ConfirmOrderScreen,
     UserHistory:UserHistory,
     AddToCartScreen:AddToCartScreen,
   },
 );


const counterStore = new CounterStore();



export default class App extends Component {
  state = {
    isReady: true,
  };
  constructor(props) {
    super(props);
  }

  componentWillMount(){
  console.disableYellowBox = true;
  }
  componentDidMount(){
     Font.loadAsync({
        "century-gothic": require("./src/assets/fonts/CenturyGothic.ttf") ,
        "century-gothic-bold": require("./src/assets/fonts/CenturyGothicBold.ttf")
      }).then(()=>{
        this.setState({
          isReady:false
        })
      }).then;
    }
  render() {
    if(this.state.isReady){
      return(
        <Text>Loading...</Text>
      )
    }  
    return (
     <Provider counterStore={counterStore}>
       <Navigation/>
       {/* <MainView/> */}
     </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});

// import React, { Component } from "react";
// import { createStackNavigator } from "react-navigation";
// import { Font} from "expo";
// import { StyleSheet, View} from "react-native";
// import { Provider, inject } from "mobx-react";
// import Splash from "./src/screens/Splash";
// import MainScreen from "./src/screens/MainScreen";
// import DishDetails from "./src/screens/DishDetails";
// import PlaceOrderScreen from "./src/screens/PlaceOrderScreen";
// import ConfirmOrderScreen from "./src/screens/ConfirmOrderScreen";
// import CounterStore from "./src/stores/CounterStore";
// import UserHistory from "./src/screens/UserHistoryScreen";

// const Navigation = createStackNavigator(
//    { 
//      MainScreen:MainScreen,
//      DishDetails:DishDetails,
//      itemDetails:PlaceOrderScreen,
//      ConfirmOrderScreen:ConfirmOrderScreen,
//      UserHistory:UserHistory
//    },
//  );


// const counterStore = new CounterStore();

// export default class App extends Component {
 
//   constructor(props) {
//     super(props);

//     this.state ={
//       loading :true
//     }
    
//   }

//   componentWillMount() {
//     console.disableYellowBox = true;

//     setTimeout(() => {

//       console.log("Done with Waiting stuff");
//       // TODO: we have tovigation to sing in or sign up screeen 
//       // this.props.navigation.navigate("MainScreen");

//       this.setState({loading :false})
//     }, 1000);
   
//   }

//   async componentDidMount(){
//     await Font.loadAsync({
//       "century-gothic": require("./src/assets/fonts/CenturyGothic.ttf") ,
//       "century-gothic-bold": require("./src/assets/fonts/CenturyGothicBold.ttf")
//     });
//   }

//   render() {

//     if(this.state.loading){
//       return(
//         <Splash/>
//       )
//     }
//     return (
//       <Provider counterStore={counterStore}>
//         <Navigation />
//       </Provider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column"
//   }
// });

// // Separate Screen Testing
// @inject("counterStore")
// class MainView extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <PlaceOrderScreen />
//       </View>
//     );
//   }
// }
