import { Text, View } from "react-native";
import React from "react";
import StarRating from "react-native-star-rating";

export default props => {
  const { avgRating, containerStyle } = props;
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        },
        containerStyle
      ]}
    >
      <StarRating
        starSize={20}
        disabled={true}
        maxStars={5}
        rating={avgRating / 2}
      />
      <Text
        style={{
          color: "white"
        }}
      >{`${
        Math.floor(avgRating) === avgRating ? avgRating : avgRating.toFixed(1)
      }/10`}</Text>
    </View>
  );
};
