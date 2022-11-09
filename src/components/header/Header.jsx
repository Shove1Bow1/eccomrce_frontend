<<<<<<< HEAD
import { Badge } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShowUsername } from "../../container/Authentication";
=======
import React from "react";
import { Link } from "react-router-dom";
import { DirectPage, ShowUsername } from "../../container/Authentication";
>>>>>>> feat/hoang
import iconGlass from "./assets/icon/ic-actions-search.svg";
import iconUser from "./assets/icon/ic-actions-user.svg";
import iconBasket from "./assets/icon/ic-ecommerce-basket.svg";
import { filter } from "./data/data";
function Header(props) {
  const [count, setCount] = useState(3);
  return (
    <div className="w-full h-full bg-white">
      <div className="px-[45px] pt-[16px]">
        <div className="flex pb-[16px]">
          <span className="text-[#6A983C] text-[12px]">Chat with us</span>
          <span className="pl-[33px] text-[12px]">+420 336 775 664</span>
          <span className="pl-[33px] text-[12px]">+420 336 775 664</span>
        </div>
        <div className=" w-full h-[1px] bg-[#151515]"></div>

        <div className="py-[40px] flex  flex-row">
          <Link to={"/"}>
            <div className="text-[#151515] text-[36px] pr-[auto]">LOGO</div>
          </Link>
          <div className="rounded-[12px] flex w-fit p-[15px] mx-auto flex-row  border-[1px]  border-[#D1D1D1] bg-[#F9F9F9]">
            <input
              className="bg-[#F9F9F9] w-[300px] focus:ring-0 focus:border-white"
              placeholder="Search Products, categories ..."
            />
            <img
              className="w-[16px] h-[16px] my-auto just-center"
              alt="search"
              src={iconGlass}
            />
          </div>
<<<<<<< HEAD
          <Link>
            <img
              className="w-[24px] h-[24px] my-auto mr-[42px]"
              alt="user"
              src={iconUser}
            />
          </Link>
          <ShowUsername />
          <Link to={"/checkout"}>
            <Badge count={count} size="small">
              <img
                className="w-[24px] h-[24px] my-auto "
                alt="basket"
                src={iconBasket}
              />
            </Badge>
          </Link>
=======
          <div className="max-w-[150px] h-[24px] my-auto">
            <DirectPage>
              <img
                className="w-[24px] h-[24px] my-auto"
                alt="user"
                src={iconUser}
              />
              <ShowUsername />
            </DirectPage>

          </div>

          <img
            className="w-[24px] h-[24px] my-auto "
            alt="basket"
            src={iconBasket}
          />
>>>>>>> feat/hoang
        </div>
      </div>
      <div className="px-[45px] py-[16px] bg-[#F9F9F9]">
        <div className="mx-auto w-fit">
          {filter.map((value, index) => (
            <span className="text-[15px] font-bold mr-[54px]" key={index}>
              <Link to={value.linkPath} >
                {value.name}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
