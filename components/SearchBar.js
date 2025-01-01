import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SearchBar({term, onTermChange,onTermSubmit} ) {
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
        autoCorrect={false} //otomatik öneri
        autoCapitalize="none" //büyük harfle başlamayı kapat
        style={styles.inputStyle}
        onChangeText={onTermChange} //yazıldığı anda
        onEndEditing={onTermSubmit} //yazma işlemi bitip enterlandığında
        value={term}  //güncel değer
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#f1f3f4",
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    height: 50,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconStyle: {
    marginHorizontal: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});