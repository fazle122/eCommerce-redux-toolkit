// import { useParams } from 'react-router-dom';
import Loader from '@/components/Loader';
import Product from '@/components/Product';
import { useGetProfileQuery } from '@/slices/userSlice';





export default function FavouriteProducts(){
// const {keyword,pageNumber} = useParams();


// const params = { keyword, pageNumber };

const {data,isLoading,isError} = useGetProfileQuery();
console.log(data);
console.log(data?.favourite);

    if(isLoading) return <Loader minHeight={"h-screen"} />
    if(isError) return <p>{isError?.data?.message || isError.error}</p>

    if(data?.favourite.length === 0) return <p className='flex items-center justify-center md:justify-start'>No favourite item added yet</p>

    return(
        // <div className='space-y-8'>
        //     <div className='grid grid-cols-12'>
        //         <div className='space-y-4 col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9'>
        //                 <div className='flex flex-wrap'>
        //                     {
        //                         data?.favourite.map((product) => <Product key={product._id} product={product} /> )
        //                     }
        //                 </div>                     
        //         </div>
        //     </div>
        // </div>
        <div className='space-y-8'>
            <div className='grid grid-cols-12'>
                <div className='space-y-4 col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9'>
                    <div className='flex flex-wrap'>
                        {
                            data?.favourite.map((product) => <Product key={product._id} product={product} /> )
                        }
                    </div> 
                </div>

            </div>
        </div>

    )
}
