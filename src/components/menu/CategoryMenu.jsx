import React from "react";

function CategoryMenu(props) {
  console.log(props.item);
  return (
    <div>
      <p className="text-[18px] leading-[27px] font-semibold pb-[16px]">
        {props.title}
      </p>
      <div className="text-[14px] leading-[19px] text-[#6A983C] pb-[12px]">
        {props.item.map((data, index) => {
          return <p key={index}>{data}</p>;
        })}
      </div>
    </div>
  );
}

export default CategoryMenu;
