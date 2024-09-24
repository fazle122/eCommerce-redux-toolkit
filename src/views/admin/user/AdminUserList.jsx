/* eslint-disable no-unused-vars */
import Loader from "@/components/Loader";
import { useDeleteUserMutation, useGetUsersQuery } from "@/slices/userSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import UserTableRow from "./TableRow";
import UserTableHead from "./TableHead";

export default function AdminUserList() {
  const [open, setOpen] = useState(null);
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  async function handleDeleteUser(id) {
    try {
      const res = await deleteUser(id);
      console.log(res);
      refetch();
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  if (isLoading) return <Loader minHeight={"min-h-screen"} />;
  if (error) return <p>some thing went wrong</p>;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Users</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
              New User
            </Button> */}
      </Stack>

      <Card>
        {/* <Scrollbar> */}
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              rowCount={users.length}
              headLabel={[
                { id: "name", label: "Name" },
                { id: "email", label: "Email" },
                { id: "role", label: "Role" },
                { id: "" },
              ]}
            />
            <TableBody>
              {users.map((user) => (
                <UserTableRow key={user.id} userData={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* </Scrollbar> */}

        {/* <TablePagination
              page={page}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
      </Card>
    </Container>
  );
}



/////////////////////////////////// 0ld ///////////////////////////////////////

// import Loader from "@/components/Loader";
// import { useDeleteUserMutation, useGetUsersQuery } from "@/slices/userSlice"
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import Popover from '@mui/material/Popover';
// import MenuItem from '@mui/material/MenuItem';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import { useState } from "react";
// import { BiMessageRoundedDetail } from "react-icons/bi";
// import { MdOutlineDeleteForever } from "react-icons/md";
// import { PiDotsThreeVerticalBold } from "react-icons/pi";

// export default function AdminUserList(){

//     const [open, setOpen] = useState(null);
//     const {data:users,refetch,isLoading,error} = useGetUsersQuery();
//     const [deleteUser,{isLoading:deleteLoading}] = useDeleteUserMutation();

//     async function handleDeleteUser(id){
//         try{
//             const res = await deleteUser(id);
//             console.log(res);
//             refetch();
//             toast.success('User deleted successfully')

//         }catch(err){
//             toast.error(err?.data?.message || err.error);
//         }

//     }

//     const handleOpenMenu = (event) => {
//         setOpen(event.currentTarget);
//     };
//     const handleCloseMenu = () => {
//         setOpen(null);
//       };

//     if(isLoading) return <Loader minHeight={"min-h-screen"}/>
//     if(error) return <p>some thing went wrong</p>

//     function TableRowItem (user){
//         console.log(user)
//         return (
// <>
//                             <TableRow hover tabIndex={-1} role="checkbox">
//                                 <TableCell>{user.user.name}</TableCell>
//                                 <TableCell align="left">{user.user.email}</TableCell>
//                                 <TableCell align="left">{user.user.isAdmin ? 'admin' : 'user'}</TableCell>
//                                 <TableCell align="right">
//                                     <IconButton onClick={handleOpenMenu}>
//                                         <PiDotsThreeVerticalBold />
//                                     </IconButton>
//                                 </TableCell>

//                             </TableRow>
//                             <Popover
//                                 open={!!open}
//                                 anchorEl={open}
//                                 onClose={handleCloseMenu}
//                                 anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//                                 transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//                                 PaperProps={{
//                                 sx: { width: 140 },
//                                 }}
//                             >
//                                 <MenuItem onClick={handleCloseMenu}>
//                                     <BiMessageRoundedDetail />
//                                     <Link to={`/admin/user/${user._id}/edit`} className="underline">view detail</Link>
//                                 </MenuItem>

//                                 <MenuItem disabled={deleteLoading} onClick={() => handleDeleteUser(user._id)} sx={{ color: 'error.main' }}>
//                                     <MdOutlineDeleteForever />
//                                     Delete
//                                 </MenuItem>
//                             </Popover>

//                             </>
//         )
//     }

//     return(
//         <div className="space-y-6">
//             <h1 className="underline text-xl">User list</h1>
//             {/* <div className="space-y-4">
//                 {
//                     users.map((user,index) =>
//                         <div className="flex flex-col md:flex-row border-b-4" key={index}>
//                             <p>{user.name}</p>
//                             <p>{user.email}</p>
//                             <Link to={`/admin/user/${user._id}/edit`} className="underline">view detail</Link>
//                             <button disabled={deleteLoading} onClick={() => handleDeleteUser(user._id)} className="bg-black rounded-md text-white py-1 w-16">delete</button>
//                         </div>
//                     )
//                 }
//             </div> */}
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                         <TableRow>
//                             <TableCell align="left">Name</TableCell>
//                             <TableCell align="left">Email</TableCell>
//                             <TableCell align="left">Role</TableCell>
//                             <TableCell align="left"></TableCell>
//                         </TableRow>
//                         </TableHead>
//                         <TableBody>
//                         {users.map((user) => ( <TableRowItem key={user.id} user={user} />

//                         ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//         </div>
//     )
// }
