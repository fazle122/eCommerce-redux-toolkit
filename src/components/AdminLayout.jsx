/* eslint-disable react/prop-types */
import { MdDashboard } from "react-icons/md";
import {IoMdPerson} from 'react-icons/io';
import { BsBorderStyle } from "react-icons/bs";
import SideMenu from "@/components/SideMenu";


export default function AdminLayout({children}){


    const sideMenu = [
        // {
        //     name:"Add product",
        //     url:'/admin/createNew',
        //     icon:<MdAddBox size={20} className=''/> 
        // },
        {
            name:"Product list",
            url:'/admin/products',
            icon:<MdDashboard size={20} className=''/> 
        },
        {
            name:"User list",
            url:'/admin/users',
            icon:<IoMdPerson size={20} className=''/>
        },
        {
            name:"Order list",
            url:'/admin/orders',
            icon:<BsBorderStyle size={20} className=''/> 
        },
    ]


    return (
        <>
            {/* <h1 className="flex items-center justify-center text-2xl underline">Admin content</h1> */}
            <div className="md:hidden">
                <SideMenu menuItems={sideMenu} styleClass="px-4 space-x-4 flex items-end justify-end"/>
            </div>
            <div className="mx-4 my-6 md:grid md:grid-cols-4">
                <div className='md:col-span-1'>  
                    <div className="hidden md:block">
                        <SideMenu menuItems={sideMenu} styleClass="flex flex-col"/>
                    </div>
                </div>

                <div className='md:col-span-3'>  
                    <div>{children}</div>
                </div>


            </div>
        </>
    )
}