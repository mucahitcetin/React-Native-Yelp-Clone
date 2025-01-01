import { StyleSheet, Text, View, FlatList, Image, Linking, TouchableOpacity } from "react-native";
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
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* İşletme Başlığı */}
      <Text style={styles.title}>{result.name || "İşletme Adı Mevcut Değil"}</Text>

      {/* Telefon Numarası */}
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${result.phone}`)}>
        <Text style={styles.phone}>{result.phone || "Telefon bilgisi mevcut değil"}</Text>
      </TouchableOpacity>

      {/* Açık/Kapalı Durumu */}
      <View style={[styles.statusContainer, result.is_closed ? styles.closed : styles.open]}>
        <Text style={styles.statusText}>{result.is_closed ? "Kapalı" : "Açık"}</Text>
      </View>

      {/* İşletme Bilgileri */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Puan: {result.rating || "Bilgi Yok"} / 5</Text>
        <Text style={styles.infoText}>Değerlendirme: {result.review_count || 0}</Text>
        <Text style={styles.infoText}>Fiyat: {result.price || "Belirtilmemiş"}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(result.url)}>
          <Text style={styles.link}>Yelp'te Görüntüle</Text>
        </TouchableOpacity>
      </View>

      {/* Resim Galerisi */}
      <FlatList
        data={result.photos}
        horizontal
        keyExtractor={(photo) => photo}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        style={styles.gallery}
      />

      {/* Kategori Bilgisi */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Kategoriler:</Text>
        {result.categories && result.categories.length > 0 ? (
          result.categories.map((category, index) => (
            <Text key={index} style={styles.categoryText}>
              {category.title}
            </Text>
          ))
        ) : (
          <Text style={styles.categoryText}>Kategori bilgisi mevcut değil</Text>
        )}
      </View>

       {/* Adres Bilgisi */}
       <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Adres:</Text>
        <Text style={styles.addressText}>
          {result.location ? result.location.display_address.join(", ") : "Adres bilgisi mevcut değil"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loaderText: {
    fontSize: 18,
    color: "#999",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    color: "#007aff",
    textAlign: "center",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  statusContainer: {
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  open: {
    backgroundColor: "#d4edda",
  },
  closed: {
    backgroundColor: "#f8d7da",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  link: {
    fontSize: 16,
    color: "#007aff",
    textDecorationLine: "underline",
  },
  gallery: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#e1e1e1",
  },
  addressContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    color: "#555",
  },
  categoryContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});
