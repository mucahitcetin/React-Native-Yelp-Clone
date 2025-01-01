import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ResultDetail({ result }) {
  // Yıldız sayısını görsel olarak göstermek için yardımcı bir fonksiyon
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <View style={styles.starsContainer}>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <AntDesign key={`full-${index}`} name="star" size={14} color="#FFD700" />
          ))}
        {halfStar === 1 && <AntDesign name="staro" size={14} color="#FFD700" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <AntDesign key={`empty-${index}`} name="staro" size={14} color="#ccc" />
          ))}
        {/* Yıldız Sayısını ve "Yıldızlı" Etiketini Ekledik */}
        <Text style={styles.ratingText}>{` ${rating} Yıldızlı`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Restoran Görseli */}
      <Image
        style={styles.image}
        source={result.image_url ? { uri: result.image_url } : null}
      />

      {/* Restoran Detayları*/}
      <View style={styles.infoContainer}>
        {/* Başlık ve Fiyat */}
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {result.name}
          </Text>
          <Text style={styles.price}>Fiyat: {result.price || "₺₺"}</Text>
        </View>

        {/* Yıldızlar ve Değerlendirme Sayısı */}
        <View style={styles.row}>
          <View style={styles.starsContainer}>{renderStars(result.rating)}</View>
          <View style={styles.reviewContainer}>
            <AntDesign name="message1" size={14} color="#1E90FF" />
            <Text style={styles.reviewCount}>{result.review_count} yorum</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
    width: 250,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },
  name: {
    fontWeight: "700",
    fontSize: 17,
    color: "#333",
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#28a745",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: "hidden",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "#FFD700",
    marginLeft: 5,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  reviewCount: {
    fontSize: 14,
    color: "#1E90FF",
    marginLeft: 5,
  },
});
