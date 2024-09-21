import { useGetTopProductsQuery } from "@/slices/productSlice"
import Loader from "./Loader";
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
} from "@/components/ui/carousel"



export default function ProductCarousal(){

    const {data:products,isLoading,error} = useGetTopProductsQuery();
    // console.log(products);

    if(isLoading) return <Loader />
    if(error) return <p>some thing went wrong</p>
    return (
        <div className="px-8 flex justify-center items-center">
            <Carousel className="w-96"
            plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}>
                <CarouselContent>
                    {
                        products.map((product,index) => 
                        <CarouselItem key={index}> 
                            <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <img className="w-32 md:w-64 " src={product.images[0].url} alt={product.name} />
                                        </CardContent>
                                    </Card>
                            </div>
                        </CarouselItem>)
                    }
                    {/* {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">{index + 1}</span>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))} */}
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
            </Carousel>
        </div>
    )
}