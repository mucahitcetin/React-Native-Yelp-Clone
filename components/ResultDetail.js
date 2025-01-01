import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function ResultDetail({ result }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={result.image_url ? { uri: result.image_url } : null}
      />
      <Text style={styles.name}>{result.name}</Text>
      <Text>
        {result.rating} Yıldızlı Restoran, {result.review_count} Değerlendirme
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    padding:10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 15,
  },
  image: {
    width: 250,
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
    color: "#333",
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
