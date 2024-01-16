import { StyleSheet, View, StatusBar } from "react-native";
import Context, { NewsContext } from "./Api/Context";
import InshortsTab from "./components/InshortsTab";
import { useContext } from "react";

function App() {
  const { darkTheme } = useContext(NewsContext);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: darkTheme ? "#282C35" : "white",
      }}
    >
      <InshortsTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
};
