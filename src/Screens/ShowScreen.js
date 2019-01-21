import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import DetailedShowView from "../Components/DetailedShowView";

// Todo: Inspect the react-navigator header support


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
    const params = this.props.navigation.state.params;
    if (!params || !params.show) {
      return;
      // Todo: display error message, and allow the user to return to the back page
    }
    const { name } = params.show;
    return (
      <View style={styles.container}>
        <Header
          title={name}
          dispBackBtn={true}
          onBackButtonPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.content}>
          <DetailedShowView {...params.show} />
        </View>
        <Footer />
      </View>
    );
  }
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
    backgroundColor: "#212121"
  }
});
