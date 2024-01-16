import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { NewsContext } from "../Api/Context";
import Carousel from "react-native-snap-carousel";
import { categories, sources } from "../Api/Api";
import Search from "../components/Search";

const DiscoverScreen = () => {
  const { setCategory, setSource, darkTheme } = useContext(NewsContext);

  const windowWidth = Dimensions.get("window").width;
  return (
    <View style={styles.discover}>
      <Search />
      <Text
        style={{ ...styles.category, color: darkTheme ? "white" : "black" }}
      >
        Catergory
      </Text>

      <Carousel
        layout={"default"}
        data={categories}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.categoryImage}
              onPress={() => setCategory(item.name)}
            >
              <Image source={{ uri: item.pic }} style={styles.image} />
              <Text
                style={{
                  color: darkTheme ? "white" : "black",
                  textTransform: "capitalize",
                  fontSize: 12,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        sliderWidth={windowWidth}
        itemWidth={Math.round(windowWidth / 3.5)}
        activeSlideAlignment={"start"}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />

      <Text
        style={{ ...styles.category, color: darkTheme ? "white" : "black" }}
      >
        Source
      </Text>
      <View style={styles.sources}>
        {sources.map((s) => (
          <TouchableOpacity
            onPress={() => setSource(s.id)}
            key={s.id}
            style={styles.sourceContainer}
          >
            <Image source={{ uri: s.pic }} style={styles.sourceImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discover: {
    padding: 10,
    alignItems: "center",
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 8,
    marginBottom: 5,
    borderBottomColor: "#007fff",
    borderBottomWidth: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  image: {
    height: "60%",
    width: "100%",
    resizeMode: "contain",
  },
  categoryImage: {
    height: 130,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sourceImage: {
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  sources: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: "15",
  },
  sourceContainer: {
    height: 150,
    width: "40%",
    borderRadius: 10,
    margin: 15,
    backgroundColor: "#cc313d",
  },
});

export default DiscoverScreen;
