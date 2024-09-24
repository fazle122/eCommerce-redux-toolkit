/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "@/slices/cartSlice";

export default function CartRow({ item }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const dispatch = useDispatch();
  const [currentQuantity,setCurrentQuantity] = useState(item.qty);


  useEffect(() => {
      dispatch(addToCart({...item,qty:currentQuantity}));
    }, [currentQuantity]);


  function increaseItemQty(){
      if(currentQuantity >= item?.countInStock) return
      setCurrentQuantity(qty => qty+1);
  }

  function decreaseItemQty(){
      if(currentQuantity <= 1) return;
      setCurrentQuantity(qty => qty-1);
  }

  function handleDelete(){
      dispatch(deleteFromCart(item._id));
  }



  return (
    <>
          <TableRow hover tabIndex={-1}>
 

          <TableCell component="th" scope="row" padding="none">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar alt={item.name} src={item?.images[0]?.url} />
                {item?.name}
            </Stack>
          </TableCell>
          <TableCell>{`$${item?.price}`}</TableCell>

          <TableCell>
          <div className="space-x-2">
                <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={() => increaseItemQty(item,currentQuantity)} >+</button>
                <span>{currentQuantity}</span>
                <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={decreaseItemQty}>-</button>
            </div>
          </TableCell>

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

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            Delete
          </MenuItem>
          </Popover>
    </>
  );
}
