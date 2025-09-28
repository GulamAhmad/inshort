import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { getSourceAPI, getNewsAPI } from "./Api";

export const NewsContext = createContext();

const Context = ({ children }) => {
  const [index, setIndex] = useState(1);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [source, setSource] = useState("bbc-news");
  const [darkTheme, setDarkTheme] = useState(true);

  const fetchNews = async (reset = category) => {
    const { data } = await axios.get(getNewsAPI(reset));

    setNews(data.articles);
    setIndex(1);
  };

  const fetchNewsSource = async () => {
    const { data } = await axios.get(getSourceAPI(source));

    setNews(data.articles);
    setIndex(1);
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  useEffect(() => {
    fetchNewsSource();
  }, [source]);

  return (
    <NewsContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
        index,
        setIndex,
        news,
        fetchNews,
        setCategory,
        setSource,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default Context;
