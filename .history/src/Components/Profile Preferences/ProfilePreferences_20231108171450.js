import { FormControl, InputLabel,Input, InputAdornment, IconButton, Button} from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useDispatch } from 'react-redux';
import { updatePassword } from '/Users/olfabendhaou/Desktop/dashbord/client/src/JS/Actions/admin.js';
import { useMatch, useNavigate,useParams} from 'react-router-dom';


const ProfilePreferences = () => {
  const match =useMatch("/UpdatePassword/:id")
  const params =useParams(match)
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUser]= useState({});
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };
  const handleChange =(e)=>{
    setUser({...user, [e.target.name] : e.target.value});
  };
  const handleUpdate= (e)=>{
    e.preventDefault();
    dispatch(updatePassword(params.id,newAdmin,navigate));
  }
  return (

    <div>
      <h1>Edit Password</h1>
      <br /><br />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Enter your old password</InputLabel>
        <Input
          onChange={handleChange} name='oldPassword'
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword} 
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <br /><br />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Enter your new password</InputLabel>
        <Input
          onChange={handleChange} name='newPassword'
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <br /><br />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password"> Confirm your new password </InputLabel>
        <Input
          onChange={handleChange} name='confirmnewPassword'
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <br /><br />
      <Button variant="contained" onClick={handleUpdate}>Edit</Button>
    </div>
  )
}

export default ProfilePreferences 
