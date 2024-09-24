/* eslint-disable react/prop-types */
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';



export default function OrderItemRow({data}) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleNavigateDetail = () =>{
    navigate(`/orders/${data?._id}`)
  }

  return (
    <>
      <TableRow hover tabIndex={-1}>
 

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
              {data?._id}
          </Stack>
        </TableCell>
        <TableCell>{`$${data?.totalPrice}`}</TableCell>
        {/* <TableCell>{data?.user.name}</TableCell> */}
        <TableCell>{data?.shippingAddress.address}</TableCell>
        <TableCell align="left">
          <IconButton onClick={handleOpenMenu}>
          <PiDotsThreeVerticalBold />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          Edit
        </MenuItem>

        <MenuItem onClick={handleNavigateDetail} sx={{ color: 'error.main' }}>
          Detail
        </MenuItem>
      </Popover>
    </>
  );
}

