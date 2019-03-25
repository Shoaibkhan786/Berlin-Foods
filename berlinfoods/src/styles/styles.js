import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  signUpButtonWhite: {
    backgroundColor: "#ffffff",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    color: "#CE2027",
    fontSize: 20,
    fontFamily: "century-gothic-bold"
  },

  signUpButtonRed: {
    backgroundColor: "#CE2027",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "century-gothic-bold"
  },

  singUpInputTextField: {
    fontFamily: "century-gothic",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    paddingLeft: 8,
    paddingBottom: 8
  },

  button: {
    backgroundColor: "#CE2027",
    color: "#ffffff",
    textAlign: "center",
    color: "white",
    fontFamily: "century-gothic-bold"
  },

  /**
   * Text Styles Headings
   */

  subHeadingCss: {
    fontSize: 22,
    fontFamily: "century-gothic-bold",
    color: "#3e4152"
  },

  subHeadingWithoutBoldCss: {
    fontSize: 22,
    fontFamily: "century-gothic",
    color: "#3e4152"
  },

  regularTextCss: {
    fontSize: 14,
    fontFamily: "century-gothic",
    color: "#686b78"
  },

  smallTextCss: {
    fontSize: 13,
    fontFamily: "century-gothic",
    color: "#686b78"
  },


  cell: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    width:30,
    marginLeft: 8,
    marginRight: 8,
  },

   /***********************************
   * Start Confirm Order CSS Style Sheet
   ***********************************/
  addDetailSubheadings: {
    fontSize: 14,
    fontFamily: "century-gothic",
    color: "#3e4152"
  },
  heading: {
    fontSize: 32,
    fontFamily: "century-gothic-bold",
    color: "#3E4152",
    marginLeft: 16
  },
  selectPayment: {
    color: "#C7C7CD",
    fontFamily: "century-gothic",
    fontSize: 14
  },


  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  /***********************************
   * End Confirm Order CSS Style Sheet
   ***********************************/
});

export default styles;
