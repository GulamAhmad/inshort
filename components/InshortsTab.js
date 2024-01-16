import { useWindowDimensions } from "react-native";
import React, { useState, useContext } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import DiscoverScreen from "../Pages/DiscoverScreen";
import NewsScreen from "../Pages/NewsScreen";
import TopNavigation from "./TopNavigation";
import { NewsContext } from "../Api/Context";

const InshortsTab = () => {
  const layout = useWindowDimensions();
  // const [index, setIndex] = useState(1);
  const { index, setIndex } = useContext(NewsContext);

  const [routes] = useState([
    { key: "first", title: "Discover" },
    { key: "second", title: "News" },
  ]);

  const renderScreen = SceneMap({
    first: DiscoverScreen,
    second: NewsScreen,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScreen}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={() => <TopNavigation index={index} setIndex={setIndex} />}
    />
  );
};

export default InshortsTab;
