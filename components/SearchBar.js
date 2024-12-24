import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SearchBar() {
  return (
    <View style={styles.backgroundStyle}>
      <AntDesign
        style={styles.iconStyle}
        name="search1"
        size={24}
        color="black"
      />
      <TextInput
        placeholder="Ara"
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.inputStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    height: 50,
    borderRadius: 20,
  },
  iconStyle: {
    marginHorizontal: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
});
