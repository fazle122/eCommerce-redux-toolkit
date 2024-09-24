/* eslint-disable react/prop-types */
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { PiDotsThreeVerticalBold } from "react-icons/pi";



export default function ProductTableRow({data}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
 

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={data?.avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {data?.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{data?.brand}</TableCell>
        <TableCell>{data?.category}</TableCell>
        <TableCell>{`$${data?.price}`}</TableCell>
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

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

