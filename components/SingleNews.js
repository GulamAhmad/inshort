import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import { NewsContext } from "../Api/Context";

const SingleNews = ({ item, index }) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const { darkTheme } = useContext(NewsContext);

  return (
    <View style={{ height: windowHeight, transform: [{ scaleY: -1 }] }}>
      <Image
        source={{ uri: item.urlToImage }}
        style={{ height: "45%", resizeMode: "cover" }}
      />
      <View
        style={{
          ...styles.description,
          backgroundColor: darkTheme ? "#282C35" : "white",
        }}
      >
        <Text style={{ ...styles.title, color: darkTheme ? "white" : "black" }}>
          {item.title}
        </Text>
        <Text
          style={{ ...styles.container, color: darkTheme ? "white" : "black" }}
        >
          {item.description}
        </Text>
        <Text style={{ color: darkTheme ? "white" : "black" }}>
          Short by: {item.author ?? "Unknown"}
        </Text>

        <ImageBackground
          blurRadius={30}
          style={{ ...styles.footer, width: windowWidth }}
          source={{ uri: item.urlToImage }}
        >
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(item.url);
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>
              '{item?.content?.slice(0, 45)}...'
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Read More
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  container: {
    fontSize: 18,
    paddingBottom: 10,
  },
  footer: {
    height: 80,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#d7be69",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  description: {
    flex: 1,
    padding: 15,
  },
});

export default SingleNews;
