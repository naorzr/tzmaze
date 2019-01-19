import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
export default () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Naor ~ Zruk</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6002ee",
    justifyContent: "center",
    alignItems: "center"
  },
  text: { color: "black", fontSize: 20 ,fontWeight: '500'}
});
