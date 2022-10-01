import chevron_right from "../../assets/icon/chevron-right-solid.svg";
function CategoryMenu(props) {
  console.log(props.item);
  return (
    <div className="relative w-[270px] h-[282px]">
      <div className="w-full absolute">
        <p className="text-[18px] leading-[27px] font-semibold pb-[16px] w-[269px]">
          {props.title}
        </p>
        <div className="text-[14px] leading-[19px] text-[#6A983C] pb-[12px]">
          {props.item.map((data, index) => {
            return <p key={index}>{data}</p>;
          })}
        </div>
      </div>
      <button className="bg-[#F5F5F5] rounded-[12px] left-[0px] flex flex-row h-[35px] py-[6px] items-center font-[700] text-[15px] absolute bottom-[0px]">
        Vào trang sản phẩm<span><img className="w-[16px] h-[16px]" src={chevron_right}></img></span>
      </button>
    </div>
  );
}

export default CategoryMenu;
