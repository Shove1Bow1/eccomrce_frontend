import { CaretRightOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Col, Row, Select } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DirectPage } from "../../container/Authentication";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import iconGlass from "./assets/icon/ic-actions-search.svg";
import { filter } from "./data/data";
function Header(props) {
  const { data } = props
  var dataSearch;
  if (data)
    dataSearch = data.map((value) => { return { value: value._id, label: value.productName } })

  const navigate = useNavigate()

  const handleSelect = (value) => {
    navigate('/view-detail', { state: { id: value } })
  }

  const { getCountItemCart } = useShoppingCart()

  // const [count, setCount] = useState(3);
  function SetPath(value) {
    props.changePath(value);
    return value;
  }
  return (
    <div className="w-full h-full bg-white">
      <div className="px-[45px] pt-[16px]">
        <div className="flex pb-[16px]">
          <span className="text-[#6A983C] text-[12px]">Chat with us</span>
          <span className="pl-[33px] text-[12px]">+420 336 775 664</span>
          <span className="pl-[33px] text-[12px]">+420 336 775 664</span>
        </div>
        <div className=" w-full h-[1px] bg-[#151515]"></div>

        <Row gutter={24} style={{ display: 'flex', padding: '40px 0' }}>
          {/* <div className="py-[40px] flex  flex-row"> */}
          <Col span={4}>
            <Link to={"/"}>
              <div className="text-[#151515] text-[36px] pr-[auto]">LOGO</div>
            </Link>
          </Col>
          <Col span={16}>
            <div className="rounded-[12px] flex w-fit p-[15px] mx-auto flex-row  border-[1px]  border-[#D1D1D1] bg-[#F9F9F9]">
              <Select
                showSearch
                onSelect={handleSelect}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                  }
                }}
                options={dataSearch}
                className="bg-black border-none w-[300px] focus:ring-0 focus:border-white"
                placeholder="Search Products, categories ..."
              />
              <img
                className="w-[16px] h-[16px] my-auto just-center"
                alt="search"
                src={iconGlass}
              />
            </div>
          </Col>
          <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
            <Row>
              {localStorage.getItem("userId") ?
                (
                  <div style={{ border: '1px solid #d9d9d9', marginRight: '10px', padding: '0 5px', borderRadius: '5px' }}>
                    <Link>
                      <DirectPage>
                        <span style={{ display: 'flex', alignItems: 'center' }}>Xin chào {localStorage.getItem("username")}</span>
                        <CaretRightOutlined style={{ display: 'flex', alignItems: 'center' }} />
                      </DirectPage>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link>
                      <DirectPage>
                        <UserOutlined
                          style={{ fontSize: '25px', fontWeight: 'bolder', marginRight: '10px' }}
                        />
                      </DirectPage>
                    </Link>
                  </>
                )}
              <Link to={"/checkout"}>
                <Badge count={getCountItemCart()} size="small">
                  <ShoppingCartOutlined style={{ fontSize: '25px', fontWeight: 'bolder' }} />
                </Badge>
              </Link>
            </Row>

          </Col>

          {/* </div> */}
        </Row>
      </div >
      <div className="px-[45px] py-[16px] bg-[#F9F9F9]">
        <div className="mx-auto w-fit">
          {filter.map((value, index) => (
            <span className="text-[15px] font-bold mr-[54px]" key={index}>
              <Link to={SetPath(value.linkPath)}>
                {value.name}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div >
  );
}

export default Header;
