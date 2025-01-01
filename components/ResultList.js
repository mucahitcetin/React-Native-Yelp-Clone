import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import ResultDetail from "./ResultDetail";
import { useNavigation } from "@react-navigation/native";

export default function ResultList({ title, results, titleColor }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { backgroundColor: titleColor }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ResultsShow", {
                  id: item.id,
                })
              }
            >
              <ResultDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  titleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
