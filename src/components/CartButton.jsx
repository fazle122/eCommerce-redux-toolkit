
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function CartButton(){

const cart = useSelector((state) => state.cart);
const navigate = useNavigate();
const { cartItems } = cart;

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function handleNavigate(){
    navigate('/cart');
}



return (
    
    <div className='fixed bg-gray-200 bottom-0 rounded-full text-white text-2xl right-0  p-4 m-10 z-10'>
        <IconButton aria-label="cart" onClick={handleNavigate}>
            <StyledBadge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
            </StyledBadge>
        </IconButton>
    </div>
)
}