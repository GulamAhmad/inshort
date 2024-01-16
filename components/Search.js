import { useContext, useState } from "react";
import { NewsContext } from "../Api/Context";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import SingleNews from "./SingleNews";

const Search = () => {
  const {
    news: { articles },
    darkTheme,
  } = useContext(NewsContext);

  const [searchResult, setsearchResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNews, setcurrentNews] = useState();

  const handleModal = (news) => {
    setModalVisible(true);
    setcurrentNews(news);
  };
  const handleSearch = (text) => {
    if (!text) {
      setsearchResult([]);
      return;
    }
    setsearchResult(articles.filter((query) => query.title.includes(text)));
  };

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <TextInput
        style={{
          ...styles.search,
          backgroundColor: darkTheme ? "black" : "lightgray",
          color: darkTheme ? "white" : "black",
        }}
        onChangeText={(text) => handleSearch(text)}
        placeholder="search for news"
        placeholderTextColor={darkTheme ? "white" : "black"}
      />
      <View style={styles.searchResults}>
        {searchResult.slice(0, 10).map((news) => (
          <TouchableOpacity
            key={news.title}
            activeOpacity={0.7}
            onPress={() => handleModal(news)}
          >
            <Text
              style={{
                ...styles.singleResult,
                backgroundColor: darkTheme ? "black" : "white",
                color: darkTheme ? "white" : "black",
              }}
            >
              {news.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            position: "absolute",
            zIndex: 2,
            right: 0,
            margin: 10,
          }}
        >
          <Entypo name="circle-with-cross" size={30} color={"white"} />
        </TouchableOpacity>
        <View style={{ height: "100%", transform: [{ scaleY: -1 }] }}>
          <SingleNews item={currentNews} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 15,
  },
  searchResults: {
    position: "absolute",
    zIndex: 1,
    top: 50,
  },
  singleResult: {
    borderRadius: 5,
    padding: 10,
    margin: 0.5,
    shadowColor: "black",
    elevation: 5,
  },
});

export default Search;
