import Product from "../../components/Product";
import { useGetProductsQuery } from "../../slices/productSlice.js";
// import Loader from '../../components/Loader'
import { Link, useParams, useSearchParams } from "react-router-dom";
// import Paginate from '@/components/Paginate';
import SearchBox from "@/components/Searchbox";
// import CustomPagination from '@/components/CustomPagination';
import Paginate from "@/components/Paginate";
import Filter from "@/components/Filter";
import CartButton from "@/components/CartButton";
import { useSelector } from "react-redux";
// import ProductCarousal from '@/components/ProductCarousal';
// import { Card } from '@mui/material';

export default function Dashboard() {
  // const {data:products,isLoading,isError} = ;
  const { keyword, pageNumber } = useParams();
  let [searchParams] = useSearchParams();
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const category = searchParams.get("category") || "";
  const rating = searchParams.get("ratings") || "";
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(min);
  // console.log(max);

  const params = { keyword, pageNumber };

  min !== null && min !== "" && (params.min = min);
  max !== null && max !== "" && (params.max = max);
  category !== null && category !== "" && (params.category = category);
  rating !== null && rating !== "" && (params.rating = rating);

  // const {data,isLoading,isError} = useGetProductsQuery({keyword,pageNumber});
  // console.log(params);
  const { data, isError } = useGetProductsQuery(params);

  // if(isLoading) return <Loader minHeight={"min-h-96"}/>
  // if(isError) return <p>{isError?.data?.message || isError.error}</p>

  return (
    <div className="space-y-8">
      {isError && <p>Something went wrong</p>}
      {cartItems.length > 0 && <CartButton />}
      {/* <div className='grid md:grid-cols-2'>
                <ProductCarousal />
                <div className='m-1'>
                    <Card className=''>
                    <img src="/homeDelivery.jpg" alt="home-delivery" />
                    </Card>
                </div>

            </div> */}

      <div className="grid grid-cols-12">
        <div className="hidden md:block md:col-span-5 lg:col-span-4 xl:col-span-3">
          <Filter />
        </div>

        <div className="space-y-4 col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9">
          <div className="pl-2 space-y-4">
            <div className="md:hidden">
              <Filter />
            </div>
            <SearchBox />

            {keyword && (
              <div>
                <Link
                  to="/"
                  className="rounded-md bg-black text-white px-2 py-2"
                >
                  Go back
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-wrap">
            {data?.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          <Paginate
            pages={data?.pages}
            page={data?.page}
            keyword={keyword ? keyword : ""}
          />
          {/* <CustomPagination  resPerPage={data.page} filteredProductsCount={data.pages}/> */}
        </div>
      </div>
    </div>
  );
}

// import Product from '../../components/Product';
// import products from '@/data/products';

// export default function Dashboard(){
//     const data = products
//     console.log(data);

//     return(
//         <div className='space-y-6'>

//             <div className='flex space-x-10'>
//                 {products.map((product) => <Product key={product.name} product={product} />
//                 )}
//             </div>
//         </div>

//     )
// }
