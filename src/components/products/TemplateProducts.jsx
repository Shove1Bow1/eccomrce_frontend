import chevron_right from "../../assets/icon/chevron-right-solid.svg";
import LayoutProduct from "../product/LayoutProduct";
import { ProductsData } from "../products/data/ProductsData";
const TemplateProducts = (props) => {
    const productData = ProductsData;
    console.log(productData)
    return (
        <div className="w-full h-[530px] flex flex-col px-[64px] py-[45px] bg-white">
            <div className="w-full h-[38px] relative mb-[33.5px]">
                <div className="text-[18px] text-[#151515] w-[250px] h-[27px] left-[3px] top-[5px] absolute font-[700] text-[15px]">Một số sản phẩm nổi bật</div>
                <button className="bg-white rounded-[12px] right-[0px] flex flex-row h-[35px] top-[1px] py-[6px] absolute items-center font-[700] text-[15px] ">
                    Vào trang sản phẩm<span><img className="w-[16px] h-[16px]" src={chevron_right}></img></span>
                </button>
            </div>
            <div className="flex flex-row items-start w-full h-[332px] self-start justify-around">
                {
                    productData.map(index => {
                        return (
                            <LayoutProduct key={index.id} imgUrl={index.imgUrl} title={index.title} price={index.price} />
                        )
                    })
                }
            </div>
        </div>
    )
}
export default TemplateProducts;