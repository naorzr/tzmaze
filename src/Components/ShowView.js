import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

export default class ShowView extends React.PureComponent {
  render() {
    const { id, name, summary, image, rating, onPress } = this.props;

    return (
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "column" }}
        onPress={onPress}
      >
        <Image
          resizeMode="contain"
          style={{
            flex: 4,
            aspectRatio: 8 / 12
          }}
          source={{ uri: image.original }}
        />
        <Text
          style={{
            flex: 2,
            color: "white",
            backgroundColor: "#700605",
            textAlign: "center"
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            flex: 2,
            color: "white",
            backgroundColor: "#600000",
            textAlign: "center"
          }}
        >{`${rating.average}/10`}</Text>
      </TouchableOpacity>
    );
  }
}
