import React from "react";

function ProductList(props) {
  return (
    <div className="ml-[40px] w-[870px] flex flex-row h-[280px] rounded-[12px] border-[1px] border-[#D1D1D1]">
      <img
        src="https://linhkienlammusic.com/thumbs/540x540x1/upload/product/100-6894.jpg"
        className="w-[280px] h-full rounded-[12px]"
        alt="img"
      />
      <div className="m-[32px] w-[510px]">
        <div className="w-full  flex flex-row justify-between">
          <span className="text-ellipsis overflow-hidden whitespace-nowrap">
            Product Name Product Name Product Name Product Name Product Name
            Product Name Product Name Product Name
          </span>
          <p className="text-left just-end">price</p>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
