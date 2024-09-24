/* eslint-disable react/prop-types */
// import { MdDashboard } from "react-icons/md";
import {IoMdPerson} from 'react-icons/io';
import { BsBorderStyle } from "react-icons/bs";
import SideMenu from "@/components/SideMenu";
import { FaHeart } from "react-icons/fa6";


export default function UserLayout({children}){


    const sideMenu = [
        
        {
            name:"Profile",
            url:'/user/profile',
            icon:<IoMdPerson size={20} className=''/> 
        },
        {
            name:"Order list",
            url:'/user/orders',
            icon:<BsBorderStyle size={20} className=''/> 
        },
        {
            name:"Favourites",
            url:'/user/favourites',
            icon:<FaHeart size={20} className=''/> 
        },
    ]


    return (
        <>
            {/* <h1 className="flex items-center justify-center text-2xl underline">User content</h1> */}
            <div className="md:hidden">
                <SideMenu menuItems={sideMenu} styleClass="px-4 space-x-4 flex items-end justify-end"/>
            </div>
            <div className="mx-4 my-6 md:grid md:grid-cols-4">
                <div className='md:col-span-1'>  
                    <div className="hidden md:block">
                        <SideMenu menuItems={sideMenu} styleClass="flex flex-col" />
                    </div>
                </div>

                <div className='md:col-span-3'>  
                    <div>{children}</div>
                </div>


            </div>
        </>
    )
}