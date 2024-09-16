/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate, useSearchParams } from "react-router-dom"



export default function CustomPagination({resPerPage,filteredProductsCount}){
    const [currentPage,setCurrentPage]  = useState();
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const page = Number(searchParams.get('page ')) || 1;


    useEffect(() =>{
        setCurrentPage(page);
    },[page]);

    const setCurrentpageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    
        if (searchParams.has("page")) {
          searchParams.set("page", pageNumber);
        } else {
          searchParams.append("page", pageNumber);
        }
    
        // const path = window.location.pathname + "?" + searchParams.toString();
        const path = window.location.pathname +  searchParams.toString();
        navigate(path);
      };

    return(
        <div className="d-flex justify-content-center my-5">
            {filteredProductsCount > resPerPage && (
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={filteredProductsCount}
                onChange={setCurrentpageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                innerClass="content"
                itemClass="page-item"
                linkClass="page-link"
                />
            )}
        </div>
    )
}