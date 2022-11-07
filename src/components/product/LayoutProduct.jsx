import { StarFilled } from "@ant-design/icons";
import ButtonCustom from "../button/Button";

const LayoutProduct = (props) => {
    const { title, price, imgUrl, countStar } = props;
    return (
        <div className="flex flex-col items-start p-[16px] gap-[16px] w-[268px] h-fit border-[#D1D1D1] border-[1px] rounded-[12px] bg-white">
            <img className="left-[0px] right-[0px] top-[0px] bottom-[0px] bg-[#F9F9F9] rounded-[12px] w-[236px] h-[180px]" title={title} alt="img" src="https://linhkienlammusic.com/thumbs/540x540x1/upload/product/khuon-lam-banh-xep-nhua-7968.jpg" />
            <div className="flex flex-col items-startpadding-[0px] self-stretch">
                <p className="font-[500] text-[15px] text-[#151515] ">{title}</p>
                <p className="font-[500] text-[12px] text-[#575757] pb-[4px] truncate">{title}</p>
                <div>
                    {Array.from(Array(countStar), () =>
                        <StarFilled />
                    )}
                </div>
                <div className="relative self-stretch flex mt-[13px] ">
                    <div className="p-0 m-0">
                        <p className="left-[0px] bot-[4px] font-[600] text-[18px] text-[#151515]">{price} VND</p>
                        <p className="left-[0px] bot-[4px] font-[600] text-[12px] line-through text-[#A9A9A9]">{price} VND</p>
                    </div>
                    <ButtonCustom title='Buy now' className=" my-auto h-full ml-auto" />
                </div>
            </div>
        </div>
    )
}
export default LayoutProduct;