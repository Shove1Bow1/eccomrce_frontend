import { Link } from "react-router-dom";
import {
  Account,
  Connections,
  Earnings,
  GetInTouch,
  ProductTag
} from "../assets/data/FooterData";
const Footer = () => {
  return (
    <div className="w-full h-full pt-[50px]">
      <div className=" ml-[45px] flex flex-row w-full">
        <div className="w-1/4 h-auto flex-1">
          <h5 className="font-bold text-[18px] mb-[10px] text-[#151515]">
            Theo dõi chúng tôi
          </h5>
          {GetInTouch.map((index) => {
            return (
              <Link key={index.index} to={index.path}>
                <p
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  className="text-[#6A983C] font-[400] hover:text-blue-700"
                >
                  {index.content}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="w-1/4 h-auto flex-1">
          <h5 className="font-bold text-[18px] mb-[10px] text-[#151515]">
            Kết nối với chúng tôi
          </h5>
          {Connections.map((index) => {
            return (
              <Link key={index.index} to={index.path}>
                <p
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  className="text-[#6A983C] font-[400] hover:text-blue-700"
                >
                  {index.content}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="w-1/4 h-auto flex-1">
          <h5 className="font-bold text-[18px] mb-[10px] text-[#151515]">
            Bán sản phẩm
          </h5>
          {Earnings.map((index) => {
            return (
              <Link key={index.index} to={index.path}>
                <p
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  className="text-[#6A983C] font-[400] hover:text-blue-700"
                >
                  {index.content}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="w-1/4 h-auto flex-1">
          <h5 className="font-bold text-[18px] mb-[10px] text-[#151515]">
            Tài khoản
          </h5>
          {Account.map((index) => {
            return (
              <Link key={index.index} to={index.path}>
                <p
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  className="text-[#6A983C] font-[400] hover:text-blue-700"
                >
                  {index.content}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full ml-[45px] h-1/5  mb-[10px] mt-[20px]">
        <h5 className="font-bold text-[18px] mb-[10px] text-[#151515]">
          Từ khoá được tìm kiếm nhiều
        </h5>
        <div className="flex justify-start max-w-full h-auto">
          {ProductTag.map((index) => {
            return (
              <Link to={index.path} key={index.index}>
                <span className="bg-[#F5F5F5] max-w-[150px] flex justify-center rounded-[12px] mr-[18px] px-[10px] py-[4px] cusor-pointer text-[12px] font-bold">
                  {index.content}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-2/3 h-1/5 mx-auto mb-[10px] mt-[10px] flex justify-center text-[#151515] font-[500]">
        <p>Copyright © 2022 from NHT</p>
      </div>
    </div>
  );
};
export default Footer;
