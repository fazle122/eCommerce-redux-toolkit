/* eslint-disable no-unused-vars */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useLogoutMutation } from "@/slices/userSlice";
import { green, grey } from "@mui/material/colors";

const pages = [
  { label: "Home", url: "/" },
  { label: "Cart", url: "/cart" },
  { label: "Login", url: "/login" },
];
const popUpMenu = [
  { label: "Admin Dashboard", url: "/admin" },
  { label: "Profile", url: "/user/profile" },
  { label: "Logout", url: "/login" },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const handleOpenNavMenu = () => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = () => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url) => {
    console.log(url);
    navigate(url);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (url) => {
    if (url === "/login") {
      await logout().unwrap();
      dispatch(logoutUser());
      navigate("/login");
      toast.success("logged out successfully");
    }
    navigate(url);
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "gray" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AddShoppingCartIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-Shop
          </Typography>
          {/* 
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.url)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {userInfo && page.label === "Login" ? "" : page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          <AddShoppingCartIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />

          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-Shop
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleCloseNavMenu(page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {/* {page.label} */}
                {userInfo && page.label === "Login" ? "" : page.label}
              </Button>
            ))}
          </Box>

          {userInfo && (
            <div className="flex flex-row">
              <p className="px-2 py-2">{userInfo.name}</p>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={userInfo.name}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/default_avatar.png" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {popUpMenu.map((menu) => (
                    <MenuItem
                      key={menu.label}
                      onClick={() => handleCloseUserMenu(menu.url)}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {menu.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// /* eslint-disable no-unused-vars */

// import {FaCartPlus} from 'react-icons/fa';
// import {IoMdPerson} from 'react-icons/io';
// import { IoMdLogIn } from "react-icons/io";
// import { IoFilterOutline } from "react-icons/io5";
// import { RiLogoutCircleRFill } from "react-icons/ri";
// import { MdDashboard } from "react-icons/md";
// import { Link, NavLink,useNavigate } from 'react-router-dom';
// import logo from '../assets/eommerce.png'
// import { useDispatch, useSelector } from 'react-redux';
// import { Badge } from "@material-tailwind/react";
// import { useLogoutMutation } from '../slices/userSlice';
// import { logoutUser } from '../slices/authSlice';
// import toast from 'react-hot-toast';

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//   } from "@/components/ui/dropdown-menu"
// import { useState } from 'react';

// export default function Navbar(){
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const {cartItems} = useSelector((state) => state.cart);
//     const {userInfo} = useSelector((state) => state.auth);
//     const [logout] = useLogoutMutation();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     // const location = useLocation();
//     // const path = location.pathname;

//     function BadgeDefault(count) {
//         return (
//           <Badge className="w-4 h-4 flex items-center justify-center" size="1px" content={`${count}`}>
//             <FaCartPlus size={20} className=''/>
//           </Badge>
//         );
//       }

//     async function logoutHandler(e){
//         e.preventDefault();
//         try{
//             await logout().unwrap();
//             dispatch(logoutUser());
//             navigate('/login');
//             toast.success('logged out successfully')
//         }catch(err){
//             // console.log(err);
//             toast.error(err?.data?.message)
//         }
//     }

//     function navigateProfile(e){
//         e.preventDefault();
//         navigate('/user/profile');
//     }
//     function navigateAdmin(e){
//         e.preventDefault();
//         navigate('/admin');
//     }

//     return (

//         <nav className="bg-gray-500 border-b border-gray-500">
//         <div className="px-8">
//           <div className="relative flex h-20 items-center justify-between">
//             <div className="absolute md:hidden">
//               <button
//                 type="button"
//                 id="mobile-dropdown-button"
//                 className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//                 aria-controls="mobile-menu"
//                 aria-expanded={isMobileMenuOpen}
//                 onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//               >
//                 <span className="absolute -inset-0.5"></span>
//                 <span className="sr-only">Open main menu</span>
//                 <svg
//                   className="block h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <div className="flex flex-1 pl-12 md:pl-4 items-center justify-center md:items-start md:justify-start">
//               <Link className="flex flex-shrink-0 items-center" href="/">
//                 <img src={logo} alt='e-commerce logo' width={50} />
//                 <span className="hidden md:block text-white text-2xl font-bold ml-2">
//                   E-Shop
//                 </span>
//               </Link>
//             </div>

//             <div className={`text-black`}>
//                 <ul className="flex space-x-4">

//                 <NavLink to='/' className={`flex space-x-1`} >
//                     <MdDashboard size={20} className=''/>
//                     <span className='hidden md:block'>Home</span>
//                 </NavLink>
//                 <NavLink to='/cart' className={`flex space-x-1`} >

//                     {cartItems.length > 0 ? BadgeDefault(cartItems.length) : <FaCartPlus size={20} className=''/> }
//                     <span>Cart</span>
//                 </NavLink>

//                 {
//                     !userInfo ?
//                     <NavLink to="/login" className='flex space-x-1'>
//                         <IoMdLogIn size={22} className=''/>
//                         <span className='hidden md:block'>Sign in</span>
//                     </NavLink> :
//                     // <button className="underline" onClick={logoutHandler}>Logout</button>
//                     <div className='flex space-x-2'>
//                         {userInfo.googleImage &&
//                             <Link to="#">
//                                 <img className='rounded-full w-8' src={userInfo.googleImage} alt={userInfo.name} />
//                                 <IoMdPerson size={20} className=''/>
//                             </Link>
//                         }
//                         <DropdownMenu >
//                             <DropdownMenuTrigger asChild>

//                             {/* <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> */}
//                             <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="w-8 h-8  rounded-full bg-black text-white" type="button">
//                                     {userInfo.name[0]}
//                                     {/* <img className='rounded-full w-8' src="/default_avatar.png" alt={userInfo.name} /> */}
//                             </button>

//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent className="w-56">
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuGroup>
//                                     <DropdownMenuItem className="space-x-4">
//                                         <MdDashboard size={20} className=''/>
//                                         <button onClick={navigateAdmin}>Admin dashboard</button>
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem className="space-x-4">
//                                         <IoMdPerson size={20} className=''/>
//                                         <button onClick={navigateProfile}>profile</button>
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem className="space-x-4">
//                                         <RiLogoutCircleRFill size={20} className=''/>
//                                         <button onClick={logoutHandler}>Logout</button>
//                                     </DropdownMenuItem>
//                                 </DropdownMenuGroup>
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </div>
//                 }
//                 </ul>
//             </div>

//           </div>
//         </div>

//         {/* <!-- Mobile menu, show/hide based on menu state. --> */}
//         {isMobileMenuOpen && (
//           <div id="mobile-menu">
//             <div className="flex flex-col space-y-1 px-2 pb-3 pt-2">
//               <Link href="/">Home </Link>
//               <Link href="/cart">Cart</Link>
//               {userInfo && (
//                 <Link href="" >Log out</Link>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//         ///////////////////// old  ///////////////////////
//         // <div className={`flex justify-between px-10 bg-blue-100 text-black h-16`}>
//         //     <img src={logo} alt='e-commerce logo' width={50} />
//         //     <ul className="flex space-x-4 px-5 py-5">

//         //         <NavLink to='/' className={`flex space-x-1`} >
//         //             <MdDashboard size={20} className=''/>
//         //             <span>Home</span>
//         //         </NavLink>
//         //         {userInfo && <NavLink to='/cart' className={`flex space-x-1`} >

//         //             {cartItems.length > 0 ? BadgeDefault(cartItems.length) : <FaCartPlus size={20} className=''/> }
//         //             <span>Cart</span>
//         //         </NavLink>}
//         //         {
//         //             !userInfo ?
//         //             <NavLink to="/login" className='flex space-x-1'>
//         //                 <IoMdPerson size={20} className=''/>
//         //                 Sign in
//         //             </NavLink> :
//         //             // <button className="underline" onClick={logoutHandler}>Logout</button>
//         //             <div className='flex space-x-2'>
//         //                 {userInfo.googleImage &&
//         //                     <Link to="#">
//         //                         <img className='rounded-full w-8' src={userInfo.googleImage} alt={userInfo.name} />
//         //                     </Link>
//         //                 }
//         //                 <DropdownMenu >
//         //                     <DropdownMenuTrigger asChild>
//         //                         {/* <div to="/login" className='flex space-x-1'>
//         //                             <span className='underline'>{userInfo.name}</span>
//         //                         </div> */}
//         //                         <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
//         //                             {userInfo.name}
//         //                              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//         //                                 <path stroke=""
//         //                                     // stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"
//         //                                 />
//         //                             </svg>
//         //                         </button>

//         //                     </DropdownMenuTrigger>
//         //                     <DropdownMenuContent className="w-56">
//         //                         <DropdownMenuSeparator />
//         //                         <DropdownMenuGroup>
//         //                             <DropdownMenuItem className="space-x-4">
//         //                                 <MdDashboard size={20} className=''/>
//         //                                 <button onClick={navigateAdmin}>Admin dashboard</button>
//         //                             </DropdownMenuItem>
//         //                             <DropdownMenuItem className="space-x-4">
//         //                                 <IoMdPerson size={20} className=''/>
//         //                                 <button onClick={navigateProfile}>profile</button>
//         //                             </DropdownMenuItem>
//         //                             <DropdownMenuItem className="space-x-4">
//         //                                 <RiLogoutCircleRFill size={20} className=''/>
//         //                                 <button onClick={logoutHandler}>Logout</button>
//         //                             </DropdownMenuItem>
//         //                         </DropdownMenuGroup>
//         //                     </DropdownMenuContent>
//         //                 </DropdownMenu>
//         //             </div>
//         //         }
//         //         {/* {
//         //             userInfo && userInfo.isAdmin &&
//         //             <DropdownMenu>
//         //                 <DropdownMenuTrigger asChild>
//         //                     <div to="/login" className='flex space-x-1'>
//         //                         <span className='underline'>Admin menu</span>
//         //                     </div>
//         //                 </DropdownMenuTrigger>
//         //                 <DropdownMenuContent className="w-56">
//         //                     <DropdownMenuSeparator />
//         //                     <DropdownMenuGroup>
//         //                         <DropdownMenuItem className="space-x-4">
//         //                             <IoMdPerson size={20} className=''/>
//         //                             <button onClick={() => navigate('/admin/products')}>Product List</button>
//         //                         </DropdownMenuItem>
//         //                         <DropdownMenuItem className="space-x-4">
//         //                             <IoMdPerson size={20} className=''/>
//         //                             <button onClick={() => navigate('/admin/orders')}>Order List</button>
//         //                         </DropdownMenuItem>
//         //                         <DropdownMenuItem className="space-x-4">
//         //                             <IoMdPerson size={20} className=''/>
//         //                             <button onClick={() => navigate('/admin/users')}>User List</button>
//         //                         </DropdownMenuItem>
//         //                     </DropdownMenuGroup>
//         //                 </DropdownMenuContent>
//         //             </DropdownMenu>
//         //         } */}
//         //     </ul>
//         // </div>
//     )
// }
