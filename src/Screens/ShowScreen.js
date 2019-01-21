import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import DetailedShowView from "../Components/DetailedShowView";
import { BackHandler } from "react-native";

// Todo: Inspect the react-navigator header support

export default class MainScreen extends Component {
  didFocusSubscription;
  willBlurSubscription;

  constructor(props) {
    super(props);
    this.didFocusSubscription = props.navigation.addListener(
      "didFocus",
      payload =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPress
        )
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPress
        )
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  onBackButtonPress = () => {
    this.props.navigation.goBack();
    return true;
  };

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
          onBackButtonPress={this.onBackButtonPress}
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
