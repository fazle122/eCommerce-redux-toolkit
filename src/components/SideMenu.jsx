
// /* eslint-disable react/prop-types */
// import ListItemButton from '@mui/material/ListItemButton';
// import { Box, Drawer, Stack } from "@mui/material";
// import navConfig from "@/utils/navConfig";
// import { useResponsive } from '@/hooks/use-responsive';
// import { usePathname } from '@/hooks/use-pathname';





// export default function SideMenu({ openNav, onCloseNav }){

//   const upLg = useResponsive('up', 'lg');

  

//   function NavItem({ item }) {
//     const pathname = usePathname();
  
//     const active = item.path === pathname;
  
//     return (
//       <ListItemButton
//         // component={RouterLink}
//         href={item.path}
//         sx={{
//           minHeight: 44,
//           borderRadius: 0.75,
//           typography: 'body2',
//           color: 'text.secondary',
//           textTransform: 'capitalize',
//           fontWeight: 'fontWeightMedium',
//           ...(active && {
//             color: 'primary.main',
//             fontWeight: 'fontWeightSemiBold',
//             // bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
//             // '&:hover': {
//             //   bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
//             // },
//           }),
//         }}
//       >
//         <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
//           {item.icon}
//         </Box>
  
//         <Box component="span">{item.title} </Box>
//       </ListItemButton>
//     );
//   }

//   const renderMenu = (
//     <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
//       {navConfig.map((item) => (
//         <NavItem key={item.title} item={item} />
//       ))}
//     </Stack>
//   );

//   const renderContent = (
//     <div
//       // sx={{
//       //   height: 1,
//       //   '& .simplebar-content': {
//       //     height: 1,
//       //     display: 'flex',
//       //     flexDirection: 'column',
//       //   },
//       // }}
//     >
//       {/* <Logo sx={{ mt: 3, ml: 4 }} /> */}

//       {/* {renderAccount} */}

//       {renderMenu}

//       <Box sx={{ flexGrow: 1 }} />

//       {/* {renderUpgrade} */}
//     </div>
//   );


//   return (
//     <Box
//       sx={{
//         flexShrink: { lg: 0 },
//         width: { lg: 280},
//       }}
//     >
//       {upLg ? (
//         <Box
//           sx={{
//             height: 1,
//             position: 'fixed',
//             width: 280,
//             borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
//           }}
//         >
//           {renderContent}
//         </Box>
//       ) : (
//         <Drawer
//           open={openNav}
//           onClose={onCloseNav}
//           PaperProps={{
//             sx: {
//               width: 280,
//             },
//           }}
//         >
//           {renderContent}
//         </Drawer>
//       )}
//     </Box>
//   );
// }























/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";






export default function SideMenu({ menuItems, styleClass}){
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    // <div className="flex flex-col">
    <>
    <div className={`${styleClass}`}>
      {menuItems?.map((menuItem, index) => (
        <Link
          key={index}
          to={menuItem.url}
          className={`${
            activeMenuItem.includes(menuItem.url) ? "text-blue-600" : "text-black"
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={
            activeMenuItem.includes(menuItem.url) ? "true" : "false"
          }
        >
          <div className="flex space-x-6">
            <div>{menuItem.icon}</div>
            <div className="hidden md:block">{menuItem.name}</div>
          </div> 
        </Link>
      ))}
    </div>
    </>
  );
}
