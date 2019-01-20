import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  View
} from "react-native";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Dimensions } from "react-native";
import ShowView from "../Components/ShowView";

// Todo: Inspect the react-navigator header support

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], page: 0, isFetching: false };
  }
  async componentDidMount() {
    // Todo: handle a case of failure, consider adding lastFetchStatus state
    this.fetchShowItems();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={"TV-MAZE"} />
        <View style={styles.content}>
          <Modal visible={this.state.isFetching} transparent={true}>
            <View
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <ActivityIndicator size="large" color="white" />
            </View>
          </Modal>
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
            onEndReached={this.fetchShowItems}
          />
        </View>
        <Footer />
      </View>
    );
  }

  fetchShowItems = async () => {
    this.setState({ isFetching: true });
    const res = await fetch(
      `http://api.tvmaze.com/shows?page=${this.state.page}`
    );
    if (res.ok) {
      const curPag = this.state.page;
      const body = await res.json();
      this.setState({
        isFetching: false,
        data: this.state.data.concat(body),
        page: curPag + 1
      });
    }
    this.setState({
      isFetching: false
    });
  };

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
