import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import yelp from "../api/yelp";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ResultsShowScreen({ route }) {
  const [result, setResult] = useState(null);
  const id = route.params.id;

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);
  if (!result) {
    return null;
  }
  return (
    <View>
      <Text style={styles.title}>{result.name}</Text>
      <Text style={styles.phone}>{result.phone}</Text>
      <View style={styles.icon}>
        {result.is_closed ? (
         <AntDesign name="closecircleo" size={24} color="red" /> 
        ) : (
          <MaterialIcons name="delivery-dining" size={24} color="green" />
        )}
      </View>
      <FlatList
        data={result.photos}
        renderItem={({ item }) => {
          return <Image source={{ uri: item }} style={styles.image} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontSize: 25,
    marginVertical: 10,
  },
  phone: {
    alignSelf: "center",
    fontSize: 20,
  },
  icon: { alignSelf: "center" },

  image: {
    height: 180,
    margin: 10,
    borderRadius: 20,
  },
});
