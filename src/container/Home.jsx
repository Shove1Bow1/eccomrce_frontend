import React from "react";
import Banner from "../components/banner/Banner";
import Footer from "../components/Footer";
import CategoryMenu from "../components/menu/CategoryMenu";
import ProductList from "../components/product/ProductList";

function Home(props) {
  const filter = [
    "Đồ gia dụng",
    "May mặc",
    "Điện tử",
    "Công nghệ",
    "Máy tính",
    "Lót chuột",
  ];
  console.log(filter);
  return (
    <div>
      <Banner />
      <CategoryMenu title="Best from Product " item={filter} />
      <ProductList />
      <Footer />
    </div>
  );
}
  
export default Home;
