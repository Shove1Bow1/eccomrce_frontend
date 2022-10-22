import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import Marquee from "react-fast-marquee";

function NewRunner(props) {
  const [news, setnews] = useState([]);
  useLayoutEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines/sources?apiKey=3a2b177358fd4577b507c7923486b29f"
      )
      .then((data) => {
        setnews(data);
      });
  });
  return <Marquee className="w-full h-[200px]">{
    news.map((item,data)=>{<div> <span className=""></span></div>})
  }</Marquee>;
}

export default NewRunner;
