import React from "react";
import Banner from "../components/banner/Banner";
import Footer from "../components/Footer";
import CategoryMenu from "../components/menu/CategoryMenu";
import TemplateProducts from "../components/products/TemplateProducts";
import NewRunner from "../components/runner/NewRunner";

function Home(props) {
  const filter = [
    "Đồ gia dụng",
    "May mặc",
    "Điện tử",
    "Công nghệ",
    "Máy tính",
    "Lót chuột",
  ];
  const BannerInfo = [{
    id: 1,
    title: "Tai Nghe Airpod Pro 2",
    description: "Tai nghe Airpod Pro 2"
  }, {
    id: 2,
    title: "Sạc Samsung",
    description: "Sạc Samsung"
  }]
  return (
    <div>
      <div className="flex flex-row items-start w-full h-[410px] px-[45px] justify-around py-[64px]">
        <CategoryMenu title="Best from Product " item={filter} />
        {
          BannerInfo.map(index => {
            return (
              <Banner title={index.title} description={index.description} key={index.id} />
            )
          })
        }
      </div>
      <TemplateProducts />
      <NewRunner />
      <Footer />
    </div>
  );
}
export default Home;
