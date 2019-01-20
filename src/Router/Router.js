import { createStackNavigator } from "react-navigation";
import MainScreen from "../Screens/MainScreen";
import ShowScreen from "../Screens/ShowScreen";

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: () => ({
        header: null
      }),
    },
    Show: {
      screen: ShowScreen,
      navigationOptions: () => ({
        header: null
      }),
    },
  },
  {
    cardStyle: { backgroundColor: '#212121' },
    initialRouteName: "Main",
  }
);


export default AppNavigator