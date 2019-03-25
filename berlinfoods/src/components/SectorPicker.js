import React from "react";
import { Text, View, } from "react-native";
import styles from "../styles/styles";
import PropTypes from "prop-types";
class SectorPicker extends React.Component {


    // Component was not compleleted yet and will work later
    constructor() {
        super();
        this.state = {
          location: "",
          sectors: ["F 8", "F 10", "G 8", "G 9", "G 10", "G 11"]
        };
      }

  render() {
    // areas names
    let serviceItems = this.state.sectors.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });

    return (
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
          <Text style={styles.addDetailSubheadings}>
            {"Select your sector"}
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
          <Picker
            selectedValue={this.state.language}
            style={styles.cell}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
          >
            {serviceItems}
          </Picker>
        </View>
      </View>
    );
  }
}

SectorPicker.propTypes = {
    onValueChange: PropTypes.onValueChange
};

export default SectorPicker;
