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
            <View style={styles.modalView}>
              <ActivityIndicator size="large" color="white" />
            </View>
          </Modal>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            onEndReached={this.fetchShowItems}
            removeClippedSubviews={true}
          />
        </View>
        <Footer />
      </View>
    );
  }

  keyExtractor = ({ id }) => id + "";
  renderItem = ({ item }) => (
    <ShowView
      onPress={this.onShowPress(item)}
      rating={item.rating}
      image={item.image}
      id={item.id}
      name={item.name}
      summary={item.summary}
    />
  );

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
    const {
      id,
      name,
      summary,
      image,
      rating,
      schedule,
      genres,
      network,
      language
    } = item;
    return () =>
      this.props.navigation.navigate("Show", {
        show: {
          id,
          name,
          genres,
          summary,
          rating,
          network,
          language,
          schedule,
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
  modalView: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  content: {
    flex: 12,
    justifyContent: "center",
    backgroundColor: "#212121",
    paddingHorizontal: 30,
    paddingVertical: 60
  }
});
