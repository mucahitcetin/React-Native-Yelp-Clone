import { StyleSheet, Text, View, FlatList, Image, Linking, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import yelp from "../api/yelp";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

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
      {/* İşletme Başlığı ve Yelp Bağlantısı */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{result.name || "İşletme Adı Mevcut Değil"}</Text>
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(result.url)} style={styles.linkTouch}>
            <Ionicons name="open-outline" size={18} color="#007aff" />
            <Text style={styles.linkText}>yelp</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Telefon ve Durum Bilgisi */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <AntDesign name="phone" size={20} color="#007aff" />
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${result.phone}`)}>
            <Text style={styles.phone}>{result.phone || "Telefon bilgisi mevcut değil"}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.infoRow]}>
          <MaterialIcons
            name={result.is_closed ? "cancel" : "check-circle"}
            size={16}
            color={result.is_closed ? "#f00" : "#28a745"}
          />
          <Text style={[styles.statusText, result.is_closed ? styles.closed : styles.open]}>
            {result.is_closed ? "Kapalı" : "Açık"}
          </Text>
        </View>
      </View>

      {/* İşletme Bilgileri */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <AntDesign name="star" size={20} color="#FFD700" />
          <Text style={styles.infoText}>Puan: {result.rating || "Bilgi Yok"} / 5</Text>
        </View>
        <View style={styles.infoRow}>
          <AntDesign name="message1" size={20} color="#1E90FF" />
          <Text style={styles.infoText}>Değerlendirme: {result.review_count || 0}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="pricetags-outline" size={20} color="#32CD32" />
          <Text style={styles.infoText}>Fiyat: {result.price || "Belirtilmemiş"}</Text>
        </View>
      </View>

      {/* Resim Galerisi */}
      <FlatList
        data={result.photos}
        horizontal
        keyExtractor={(photo) => photo}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
        style={styles.gallery}
      />

      {/* Kategori Bilgisi */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Kategoriler:</Text>
        {result.categories && result.categories.length > 0 ? (
          result.categories.map((category, index) => (
            <View key={index} style={styles.categoryRow}>
              <Ionicons
                name="folder-outline"
                size={16}
                color={index % 2 === 0 ? "#007aff" : "#FF6347"}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>{category.title}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.categoryText}>Kategori bilgisi mevcut değil</Text>
        )}
      </View>

      {/* Adres Bilgisi */}
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Adres:</Text>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={20} color="#007aff" style={styles.addressIcon} />
          <Text style={styles.addressText}>
            {result.location ? result.location.display_address.join(", ") : "Adres bilgisi mevcut değil"}
          </Text>
        </View>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkTouch: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#007aff",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    color: "#007aff",
    marginLeft: 10,
    textDecorationLine: "underline",
  },
  statusText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  open: {
    color: "#28a745",
  },
  closed: {
    color: "#f00",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#555",
  },
  gallery: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  categoryContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    color: "#555",
  },
  addressContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressIcon: {
    marginRight: 10,
  },
  addressText: {
    fontSize: 16,
    color: "#555",
    flex: 1,
  },
});
