import React from 'react'
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
const Warningnotification = ({error}) => {
  return (
    <Stack sx={{ width: '70%', marginLeft:'800px', marginTop:'0px'}} spacing={2}>
     <Alert severity="warning">{error.message}</Alert>
    </Stack>
  )
}

export default Warningnotification;