import React, { useLayoutEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import chevron_right from "../../assets/icon/chevron-right-solid.svg";
import { DataNewRunner } from "./assets/data/DataNewRunner.js";
function NewRunner(props) {
  const [news, setNews] = useState([]);
  useLayoutEffect(() => {
    let data = DataNewRunner;
    setNews(data);
  });
  return (
    <div className="w-[1260px] h-[425.5px] top-[170px] items-center gap-[32px] bg-white">
      <div className="w-[1170] h-[37.5px] relative mx-[45px]">
        <div className="text-[18px] text-[#151515] w-[183px] h-[27px] left-[3px] top-[5px] absolute font-[700] text-[15px]">Một số tin mới</div>
        <button className="bg-white rounded-[12px] w-[160px] right-[0px] flex flex-row h-[35px] top-[1px] px-[12px] py-[6px] absolute items-center font-[700] text-[15px]">
          Vào trang tin tức<span><img className="w-[16px] h-[16px]" src={chevron_right}></img></span>
        </button>
      </div>
      <Marquee className="w-[1260px] h-[222px] flex flex-row padding-[0px]">
        {news.map(index => {
          return (
            <div className="w-[369px] h-[222px] flex justify-center cursor-pointer" onClick={() => { window.open(index.url) }} key={index.id} >
              <div className="w-[369px] h-[198] absolute border-[#F1F1F1] border-[2px]">
                <p className="text-center text-[15px] text-[#151515] font-[500] left-[32px] right-[32px] top-[24px] bottom-[106px] absolute">
                  {index.description}
                </p>
                <p className="h-[18px] right-[123px] top-[128px] absolute left-[123px] text-center text-[#A9A9A9] text-[12px]">
                  {index.name}
                </p>
              </div>
              <div className="absolute w-[48] bg-[#F5F5F5] rounded-[50%] w-[42px] h-[42px] bottom-[0px]"></div>
            </div>
          )
        })}
      </Marquee>
    </div>
  )
}

export default NewRunner
//<div className="w-full h-[222px] flex flex-row"> </div>
