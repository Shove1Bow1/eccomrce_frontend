import React from "react";
import banner from "./assets/background/banner.svg";
function Banner(props) {
  const { title, description } = props;
  return (
    <div
      className={`w-[420px] h-[280px] bg-[${banner}] bg-[#f4f8ec] rounded-[12px] border-[1px] border-[black] `}
    >
      <img src={banner} className="absolute" alt="backgorund" />
      <div className="pt-[48px] h-full pl-[24px] pb-[20px]">
        <p className=" text-[#6A983C] font-semibold text-[12px]">
          {title}
        </p>
        <p className="text-[#151515] mb-[60px] text-[22px] pt-[8px] leading-[33px] font-semibold">
          {description}
        </p>

        <div className="rounded-[12px] border-[2px] w-fit border-[#92C064] py-[12px] px-[16px] text-[#151515] text-[15px] font-bold leading-[22.5px] flex flex-center">
          Tìm hiểu thêm
          <span className="text-[#92C064] font-black">{" >"}</span>
        </div>
      </div>
    </div>
  );
}

export default Banner;
