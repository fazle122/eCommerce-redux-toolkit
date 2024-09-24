import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import { useGetClientIdQuery } from "./slices/userSlice";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Dashboard from "./features/dashboard/Dashboard";



export default function App(){
  // const {data:clientId,isLoading} = useGetClientIdQuery();
  // console.log(clientId);

  // if(isLoading) return <p>Loading</p>
  return (
      <>
        
        <Header />
        
        <main className="md:py-8 md:px-8">
            <h1 className="text-2xl flex items-center justify-center">Wellcome to E-Shop</h1>
            <Outlet />
        </main>


        <Footer /> 
       
      </>




        // <>
        //     <h1 className="flex items-center justify-center text-2xl underline">Admin content</h1>
            // <div className="my-6 grid grid-cols-4">
            //     <div className='col-span-1'>  
            //         <div>
            //             <SideMenu menuItems={sideMenu}/>
            //         </div>
            //     </div>

            //     <div className='col-span-3'>  
            //         <div>{children}</div>
            //     </div>


            // </div>
        // </>
    
  )
}
