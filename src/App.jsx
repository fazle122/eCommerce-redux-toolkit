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
        <main className="px-8 py-8">
            <h1 className="text-2xl">Wellcome to E-Commerce solutions</h1>
            <Outlet />
        </main>
        <Footer /> 
       
      </>
    
  )
}
