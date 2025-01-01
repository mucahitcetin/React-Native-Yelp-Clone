import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import useResult from "../hooks/useResult";
import ResultList from "../components/ResultList";

export default function SearchScreen() {
  const [searchApi, results, errorMessage] = useResult();
  const [term, setTerm] = useState("");

  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : (
        <ScrollView>
          {results.length === 0 ? (
            <Text style={styles.noResults}>Aradığınız kriterlere uygun ürün bulunamadı</Text>
          ) : (
            <>
              <ResultList
                title="Ekonomik Restoranlar"
                results={filterResultsByPrice("₺")}
              />
              <ResultList
                title="Orta Seviye Restoranlar"
                results={filterResultsByPrice("₺₺")}
              />
              <ResultList
                title="Lüks Restoranlar"
                results={filterResultsByPrice("₺₺₺")}
              />
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  noResults: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#333",
  },
});
