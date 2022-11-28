import React, { useState } from 'react';
import ReactPaginate from "react-paginate";
import LayoutProduct from '../product/LayoutProduct';
import "./Pagination.css";
function Items({ currentItems }) {
    return (
        <>
            <ul style={{ display: "flex", flexWrap: "wrap" }}>
                {
                    currentItems ? currentItems.map((data, index) => {
                        return (
                            <li key={index} style={{ margin: "5px 5px" }}>
                                <LayoutProduct image={data.image} productName={data.productName} price={data.price} stock={data.quanity} id={data._id} />
                            </li>
                        )
                    }) : <h1>Không có kết quả</h1>
                }
            </ul>
        </>
    )
}
export default function PaginationCustom({ itemsPerPage, products }) {
    const [itemOffset, setItemOffset] = useState(0);
    if (products && products.length > 0) {
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = products.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(products.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % products.length;
            setItemOffset(newOffset);
        }
        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    // breakLabel="..."
                    // nextLabel="next >"
                    // onPageChange={handlePageClick}
                    // pageRangeDisplayed={5}
                    // pageCount={pageCount}
                    // previousLabel="< previous"
                    // renderOnZeroPageCount={null}
                    nextLabel="tiếp >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< lui về"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination pagination-custom"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </>
        )
    }
    else {
        return (
            <div className='w-[full] justify-center flex min-h-[900px]'>
                <h1 className='m-[auto] font-[600] font-[22px]'>Không có dữ liệu</h1>
            </div>
        )
    }
}