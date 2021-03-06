import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "./Footer";

class Header extends React.PureComponent {
  render() {
    const { title, dispBackBtn, containerStyle,onBackButtonPress } = this.props;
    return (
      <SafeAreaView style={[styles.container,containerStyle]}>
        {dispBackBtn ? (
          <TouchableOpacity onPress={onBackButtonPress}>
            <Icon name="chevron-left" size={20} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.paddingView} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#700605",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  },
  title: { color: "black", fontSize: 20 },
  paddingView: { width: 20, height: 20 }
});

export default Header;
