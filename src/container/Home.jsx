import React, { useEffect } from "react";
import Banner from "../components/banner/Banner";
import Footer from "../components/Footer";
import CategoryMenu from "../components/menu/CategoryMenu";
import TemplateProducts from "../components/products/TemplateProducts";
import NewRunner from "../components/runner/NewRunner";

function Home(props) {
<<<<<<< HEAD
  const { data } = props
  const filter = [
    "Đồ gia dụng",
    "May mặc",
    "Điện tử",
    "Công nghệ",
    "Máy tính",
    "Lót chuột",
  ];
=======
  const filter = [{
    name: "Đồ gia dụng",
    linkPath: "/filter/do gia dung",
  },
  {
    name: "May Mặc",
    linkPath: "/filter/may mac"
  },
  {
    name: "Điện tử",
    linkPath: "/filter/dien tu",
  },
  {
    name: "Công nghệ",
    linkPath: "/filter/cong nghe",
  },
  {
    name: "Máy tính",
    linkPath: "/filter/may tinh",
  },
  {
    name: "Lót chuột",
    linkPath: "/filer/lot chuot"
  }];
>>>>>>> origin/dev
  const BannerInfo = [{
    id: 1,
    title: "Tai Nghe Airpod Pro 2",
    description: "Tai nghe Airpod Pro 2"
  }, {
    id: 2,
    title: "Sạc Samsung",
    description: "Sạc Samsung"
  }]
  useEffect(()=>{},[
    
  ])
  return (
    <div>
      <div className="flex flex-row items-start w-full h-[410px] px-[45px] justify-around py-[64px]">
        <CategoryMenu title="Những sản phẩm tốt nhất" item={filter} />
        {
          BannerInfo.map(index => {
            return (
              <Banner title={index.title} description={index.description} key={index.id} />
            )
          })
        }
      </div>
      <TemplateProducts data={data} />
      <NewRunner />
      <Footer />
    </div>
  );
}
export default Home;
