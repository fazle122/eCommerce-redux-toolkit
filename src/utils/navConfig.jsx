import AnalyticsIcon from '@mui/icons-material/Analytics';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';


const navConfig = [
    {
      title: 'dashboard',
      path: '/',
      icon: AnalyticsIcon,
    },
    {
      title: 'user',
      path: '/user',
      icon: PersonIcon,
    },
    {
      title: 'product',
      path: '/products',
      icon: ProductionQuantityLimitsIcon,
    },
    {
      title: 'login',
      path: '/login',
      icon: LoginIcon,
    },
  ];
  
  export default navConfig;