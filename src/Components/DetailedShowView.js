import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet
} from "react-native";
import React from "react";
import HTML from "react-native-render-html";

export default props => {
  const { summary, image, rating, schedule, genres, network, language } = props;
  const avg = rating.average;
  return (
    <View style={styles.container}>
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.text}>{`Avg Rating   ${
          Math.floor(avg) === avg ? avg : avg.toFixed(1)
        }/10`}</Text>
        <View>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>
              {`Genres: ${genres}\n`}
              {`Network: ${network.name}\n`}
              {`Language: ${language}\n`}
              {`${schedule.days} ${schedule.time}\n`}
            </Text>
            <HTML
              html={summary}
              imagesMaxWidth={Dimensions.get("window").width}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", flex: 1 },
  scrollView: { height: 140, marginTop: 20, backgroundColor: "teal" },
  posterContainer: { flex: 1.5, backgroundColor: "green" },
  detailsContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "column"
  },
  text: {
    backgroundColor: "teal",
    width: "100%",
    textAlign: "center",
    color: "white"
  }
});
