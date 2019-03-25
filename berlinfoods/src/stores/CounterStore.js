import { observable, action, computed } from "mobx";

Array.prototype.containsSelectFlavor = function(element) {
  return this.indexOf(element) > -1;
};
export default class CounterStore {
  //promo code stuff
  @observable
  promoCodeDiscount = "";
  @observable
  promoCode = "";

  @observable
  restaurantStatus = false;
  // user info details
  @observable
  phoneNumberValue = "+92";
  @observable
  deliveryTime = "45min";
  @observable
  deliveryAddress = "";
  @observable
  username = "";

  //selected Table information
  @observable
  availableTables = [];
  @observable
  selectedTable = "1";
  // time to collect order
  @observable
  orderTime = ["45 minute", "1 hour", "1.5 hour", "2 hour"];
  @observable
  selectedTime = "";
  // confirm order screen location picker
  @observable
  sectors = [];
  @observable
  selectedSector = "";

  // pizza data
  @observable
  isPizza = false;
  //By One get One Pizza Node
  @observable
  ByOneGetOneFreePizza=false;

  @observable
  isPizzaDeal = true;

  // pizza type personal, small, medium, large
  @observable
  pizzaType = "";

  @observable
  pizzaDealQuantity = 0;

  @observable
  pizza = {
    imageUri: "",
    foodName: "Cheese Lovers",
    productStatus: "Yes",
    personalPrice: 270,
    smallPrice: 580,
    mediumPrice: 880,
    largePrice: 1200
  };

  // dish category
  @observable
  dishCategory = "";

  //
  @observable
  selectedTime = "45 mint";

  //Add on items
  @observable
  addOnItems = [];

  //Make a meal
  @observable
  makeAmeal = [];

  // is Make A meal
  @observable
  isMakeAMeal = false;

  //Add on item is checked to include
  @observable
  addOnItemsChecked = [];

  //Make a meak is checked to include
  @observable
  makeAmealChecked = [];

  //Make a meak
  @observable
  makeAMealQuantity = 1;

  // Add TO cart list
  @observable
  addToCartList = [];

  // Pizza flavours list
  @observable
  pizzaFlavours = [];

  // this is the dynamic array which used to check does it consist of 'Select flavour' because to alet user to
  // select a flavor for pizza
  @observable
  arrayForPizzaSelection = [];

  @observable
  dealPizzaOne = "Select flavour";
  @observable
  dealPizzaTwo = "Select flavour";
  @observable
  dealPizzaThree = "Select flavour";

  // which type of segment is the user is selected
  @observable
  selectedSegment = "Personal";

  //drinks flavure select
  @observable
  isDrinkWithItem = false;

  //drink quantity
  @observable
  drinkQuantityWithItem = 0;

  //drink flavours
  @observable
  drinkSelectedArray = [];

  // Drinks Flavours list
  @observable
  drinksFlavours = [];

  // customize description
  @observable
  customizeDescription = "";

  // customize final description
  @observable
  finalOrderDescription = "";

  // take away order min and max time limit array
  @observable
  orderTime = ["45 mint", "1 hour", "1.5 hour", "2 hour"];

  // Item object food, price, image
  @observable
  item = {
    foodName: "",
    label: "",
    price: 0,
    image: "",
    quantity: 0
  };

  // Drinks variations and types
  @observable
  drinks = ["Coke", "7 up", "Sprite"];

  @observable
  isChargesApplied = true;
  @observable
  deliveryCharges = 50;
  @observable
  totalPrice = 0; //firstly delivery charges added and item price

  //set Restaurant status
  @action
  setRestaurantStatus(value) {
    this.restaurantStatus = value;
  }

  // makeAMealLimit
  @observable
  makeAMealLimit = 1;

  // add in the total
  @action
  addInTotal(value) {
    this.totalPrice = this.totalPrice + value;
  }
  // subtract from the total
  @action
  subInTotal(value) {
    this.totalPrice = this.totalPrice - value;
  }
  // set the total price while placin an order
  @action
  setTotalPrice(value) {
    this.totalPrice = value;
  }

  // set the phone number of user
  @action
  setPhoneValue(value) {
    this.phoneNumberValue = value;
  }
  // what is the delivery address of the user
  @action
  setDeliveryAddress(value) {
    this.deliveryAddress = value;
  }

  //set the username
  @action
  setUsername(value) {
    this.username = value;
  }

  // set the sector while confirm order order
  @action
  setSectorValues(value) {
    this.sectors = value;
  }
  @action
  setSector(value) {
    this.selectedSector = value;
  }
  // set the state of the pizza if available then show the types of Pizza P,S,M,L view
  @action
  setPizzaState(value) {
    this.isPizza = value;
  }
  // set the pizza deal state
  @action
  setPizzaDealState(value) {
    this.isPizzaDeal = value;
  }

  //set available pizza flavours
  @action
  setPizzaFlavours(value) {
    this.pizzaFlavours = value;
  }

  //set pizza type personall, small, medium or large
  @action
  setPizzaType(value) {
    this.pizzaType = value;
  }

  //set available drinks flavours
  @action
  setDrinkFlavours(value) {
    this.drinksFlavours = value;
  }
  // set pizza deal quantity of pizza
  @action
  setPizzaDealQuantity(value) {
    this.pizzaDealQuantity = value;
  }

  // set the is drink with the item
  @action
  setIsDrinkWithItem(value) {
    this.isDrinkWithItem = value;
  }

  // set the drink quanitity
  @action
  setDrinkQuantityWithItem(value) {
    this.drinkQuantityWithItem = value;
  }
  // set the place order food item name
  @action
  setItemFoodName(value) {
    this.item.foodName = value;
  }
  // set the quantity of the food item
  @action
  setItemQuantity(value) {
    this.item.quantity = value;
  }
  // set the description for the deals or for any dish which we called the label of dish
  @action
  setItemLabel(value) {
    this.item.label = value;
  }
  // set the place order food item price
  @action
  setItemPrice(value) {
    this.item.price = value;
  }

  // set the item object
  @action
  setItem(value) {
    this.item = value;
  }

  // image of the place order set
  @action
  setItemImage(value) {
    this.item.image = value;
  }

  // set the index in the array with value pizza flavour
  @action
  setPizzaIndexValue(index, value) {
    // console.log("Value is Index is: "+ index);
    // console.log("Value is set in the array of pizza selection: "+ value);
    this.arrayForPizzaSelection[index] = value;
  }

  // Does their any field user not selected for flavour checking validity
  @computed
  get isSelectPizaFlavor() {
    // console.log("Value is set in the array of pizza selection: "+this.arrayForPizzaSelection.containsSelectFlavor("Select flavour" ));
    return this.arrayForPizzaSelection.containsSelectFlavor("Select flavour");
  }

  // set the index in array with value of drink flavour
  @action
  setDrinkIndexValue(index, value) {
    console.log("Value is Index of Drink: " + index);
    this.drinkSelectedArray[index] = value;
  }

  // does user selected any flavour or not
  @computed
  get isSelectDrinkFlavor() {
    return this.drinkSelectedArray.containsSelectFlavor("Select flavour");
  }

  @computed
  get price() {

    return this.item.price * this.makeAMealLimit + this.totalPrice;
  }
  @computed
  get chargesApplied() {
    return this.price <= 350;
  }

  @computed
  get priceWithCharges() {
    //removed the condition of chargesApplied or not
    return this.price;
  }

  // total price of place order
  @computed
  get totalPriceValue() {
    var description = " ";


    // this make meal limit is also using as a constraint and quantity of food items
    description =
      description + this.makeAMealLimit + " " + this.item.foodName + ",";
    this.setDescription(description);

    // pizza type personal, small, medium, or largge
    if (this.isPizza || this.ByOneGetOneFreePizza) {
      description = description + " Pizza Type (" + this.pizzaType + ")";

      this.setDescription(description);
    }

    if (this.addOnItemsChecked.length > 0) {
      description = description + " Add-on (" + this.addOnItemsChecked + "),";
      this.setDescription(description);
    }

    if (this.makeAmealChecked.length > 0) {
      description =
        description + " Make a meal (" + this.makeAmealChecked + "),";
      this.setDescription(description);
    }

    // pizza deal flavours are cancatenate with description for devlivery boy
    if (this.isPizzaDeal) {
      description =
        description +
        " Pizza Deal Flavors (" +
        this.arrayForPizzaSelection +
        ")";

      this.setDescription(description);
    }

    if (this.isDrinkWithItem) {
      description =
        description + " Drink Flavour (" + this.drinkSelectedArray + ")";
      this.setDescription(description);
    }

    console.log("Here is the description: \n " + description);

    return this.priceWithCharges;
  }

  @computed
  get totolPrice() {
    let totalPriceAddToCartItems = 0;
    let finalOrderDescription = "";

    this.addToCartList.map((object, index) => {
      const { item, totalPrice, description } = object;

      totalPriceAddToCartItems = totalPriceAddToCartItems + totalPrice;

      //final order description cancatination
      finalOrderDescription = finalOrderDescription + description + "\n";
    });

    //set the description of the final order
    this.setFinalOrderDescription(finalOrderDescription);
    return totalPriceAddToCartItems; //TODO: make a add to cart item total price
  }
  @computed
  get totalChargesApplied() {
    return this.totolPrice <= 350;
  }

  @observable
  isTakeAwayOrDining = false;

  @action
  setIsTakeAwayOrDining(value){
    this.isTakeAwayOrDining = value;
  }

  @computed
  get totalPriceWithCharges() {
    if (this.totalChargesApplied) {

      let total = 0;
      if(this.isTakeAwayOrDining){
        total = this.price;
      }else{
        total = this.price + this.deliveryCharges;
      }

      return total;
    } else {
      return this.price;
    }
  }

  // Add to cart list items total
  @computed
  get totalPriceAddToCartItems() {
    return this.totalPriceWithCharges;
  }

  // set description
  @action
  setDescription(value) {
    this.customizeDescription = value;
  }

  // get description
  @computed
  get getDescription() {
    return this.customizeDescription;
  }

  //set the iss charges applied
  @action
  setChargesApplied(value) {
    console.log("Set the charge value: " + value);
    this.isChargesApplied = value;
  }

  //get the chage value
  @computed
  get getChargesApplied() {
    console.log("get the charge value: " + this.isChargesApplied);
    return this.isChargesApplied;
  }

  // Segment for Pizza Types, P,S,M,L
  @action
  setSelectedSegment(value) {
    this.selectedSegment = value;
  }

  @computed
  get getSelectedSegment() {
    return this.selectedSegment;
  }

  @computed
  get getAddress() {
    return this.deliveryAddress;
  }

  @computed
  get valueOfMakeAMeal() {
    let value = this.makeAMealLimit;
    if (this.makeAMealQuantity > this.makeAMealLimit) {
      value = this.makeAMealLimit;
    } else {
      value = this.makeAMealQuantity;
    }
    return value;
  }

  @action
  setSmallPizzaPrice(value) {
    this.pizza.smallPrice = value;
  }

  @action
  setPersonalPizzaPrice(value) {
    this.pizza.personalPrice = value;
  }

  @action
  setMediumPizzaPrice(value) {
    this.pizza.mediumPrice = value;
  }

  @action
  setLargePizzaPrice(value) {
    this.pizza.largePrice = value;
  }

  // set the total adds on
  @action
  setAddOnItems(value) {
    this.addOnItems = value;
  }

  // set make meal
  @action
  setMakeAMeal(value) {
    this.makeAmeal = value;
  }

  // set isMake a meal true or false mean include or not
  @action
  setIsMakeAMeal(value) {
    this.isMakeAMeal = value;
  }

  // set initial value for add items checked
  @action
  setInitAddItemInChecked() {
    this.addOnItemsChecked = [];
  }
  //this will add the item those are checked now
  @action
  setAddItemInChecked(value) {
    this.addOnItemsChecked.push(value);
  }

  //this set initial value
  @action
  setInitMakeAMealCheckedValue() {
    this.makeAmealChecked = [];
  }

  //this will add the Make-A-Meal those are checked
  @action
  setMakeAMealChecked(value) {
    this.makeAmealChecked.push(value);
  }

  // this will remove from the list in the add on items those are recently unchecked
  @action
  setFilterAddItem(value) {
    this.addOnItemsChecked = this.addOnItemsChecked.filter(
      e => !e.includes(value)
    );
  }

  // this will remove the item from list those are recently unchecked from Make-A-Meal
  @action
  setFilterMakeAMeal(value) {
    this.makeAmealChecked = this.makeAmealChecked.filter(
      e => !e.includes(value)
    );
  }

  // make a meal limit (Depends on the quantity of the item order)
  @action
  setMakeAMealLimit(value) {
    this.makeAMealLimit = value;
  }

  // make a meal quantity
  @action
  setMakeAMealQuantity(value) {
    this.makeAMealQuantity = value;
  }

  //set the dish category
  @action
  setDishCategory(value) {
    this.dishCategory = value;
  }

  //set the add to cart list
  @action
  setAddToCartList(value) {
    this.addToCartList = value;
  }

  // set final order description
  @action
  setFinalOrderDescription(value) {
    this.finalOrderDescription = value;
  }

  // set the selected time for the take away
  @action
  setSelectedTime(value) {
    this.selectedTime = value;
  }
}
