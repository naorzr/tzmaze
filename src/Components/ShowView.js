import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import StarRating from "react-native-star-rating";
import AvgRating from "./AvgRating";

export default class ShowView extends React.PureComponent {
  render() {
    const { id, name, summary, image, rating, onPress } = this.props;
    const avg = rating.average;

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image
          resizeMode="contain"
          style={{
            flex: 4,
            aspectRatio: 8 / 12
          }}
          source={{ uri: image.original }}
        />
        <Text style={styles.name}>{name}</Text>
        <AvgRating
          avgRating={avg}
          containerStyle={{ flex: 2, backgroundColor: "#600000" }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column" },
  name: {
    flex: 2,
    color: "white",
    backgroundColor: "#700605",
    textAlign: "center"
  }
});
