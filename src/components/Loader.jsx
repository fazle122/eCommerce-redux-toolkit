/* eslint-disable react/prop-types */

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader({minHeight}) {
  return (
    <Box  className={`flex items-center justify-center ${minHeight}`} sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}


// export default function Loader({message}){
//     return (
//         <h1>{message}</h1>
//     )
// }