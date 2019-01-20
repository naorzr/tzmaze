import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Dimensions } from "react-native";
import ShowView from "../Components/ShowView";

// Todo: Inspect the react-navigator header support

export function dimensionPercToPixel(
  perc: number,
  dimension: "width" | "height"
): number {
  const screenDimension = Dimensions.get("window")[dimension];
  return (screenDimension * perc) / 100;
}

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], page: 0, isFetching: false };
  }
  async componentDidMount() {
    console.log("did mount");
    this.setState({ isFetching: true });
    const res = await fetch("http://api.tvmaze.com/shows?page=0");
    console.log("res", res);
    if (res.ok) {
      const curPag = this.state.page;
      const body = await res.json();
      console.log("body", body[0]);
      this.setState({
        isFetching: false,
        data: this.state.data.concat(body),
        page: curPag + 1
      });
    }
    this.setState({
      isFetching: false
    });
  }

  render() {
    const initFetch = this.state.data.length === 0 && this.state.isFetching;
    // if (this.state.data.length === 0 && this.state.isFetching) {
    //   return (
    //     <View
    //       style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
    //     >
    //     </View>
    //   );
    // }
    return (
      <View style={styles.container}>
        <Header title={"TV-MAZE"} />
        <View style={styles.content}>
          {initFetch ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <ShowView
                  onPress={this.onShowPress(item)}
                  rating={item.rating}
                  image={item.image}
                  id={item.id}
                  name={item.name}
                  summary={item.summary}
                />
              )}
              keyExtractor={({ id }) => id + ""}
            />
          )}
        </View>
        <Footer />
      </View>
    );
  }

  onShowPress = item => {
    const { id, name, summary, image } = item;
    return () =>
      this.props.navigation.navigate("Show", {
        show: {
          id,
          name,
          summary,
          image: image.original
        }
      });
  };
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#212121"
  },
  content: {
    flex: 12,
    justifyContent: "center",
    backgroundColor: "#212121",
    paddingHorizontal: 30,
    paddingVertical: 60
  }
});
