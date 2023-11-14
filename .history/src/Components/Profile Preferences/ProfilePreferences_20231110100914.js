import { FormControl, InputLabel,Input, InputAdornment, IconButton, Button} from '@mui/material'
 import React, { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useDispatch } from 'react-redux';
// import { updatePassword } from '/Users/olfabendhaou/Desktop/dashbord/client/src/JS/Actions/admin.js';
import SideBar from '../SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ProfilePreferences = ({setAuth}) => {
  // const dispatch = useDispatch()
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUser]= useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };
  useEffect(() => {
    ///////////////////////////////////Get Profile///////////////
const fetchProfileData = async () => {
        try {
          const config = {
            headers: {
              Authorization: localStorage.token,
              'Content-Type': 'application/json', 
            },
          };
          const response = await axios.get('http://localhost:8000/api/user/profile', config);
          const usertoget = response.data;
          setUser(usertoget);
          console.log(usertoget);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
      fetchProfileData();
      }, []);
  const handleChangepassword =(e)=>{
    setUser({...pa, [e.target.name] : e.target.value});
  };
  const handleUpdatepassword = async () => {
    try {
      const config = {
          headers: {
            Authorization: localStorage.token,
            'Content-Type': 'application/json', 
          }
        }; 
      const requestbody={
    oldpassword,
    newpassword,
    confirmnewpassword};
    console.log('Before axios.put', oldpassword, newpassword, confirmnewpassword);
    await axios.put(`http://localhost:8000/api/user/password-reset/${user.id}`,requestbody,config);
    navigate('/login')
    console.log('Password updated successfully');
      // setIsEditing(false);
    } catch (error) {
      console.log('Error updating password:', error);
    }
  };
    // updatePassword(params.id,user,navigate);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "250px 1fr" }}> 
    <SideBar/>
    <div style={{ 
    display: "flex", 
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    marginTop:"200px" }}>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Enter your old password</InputLabel>
        <Input
          onChange={handleChange} name='oldpassword'
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
          onChange={handleChange} name='newpassword'
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
          onChange={handleChange} name='confirmnewpassword'
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
      <Button variant="contained" onClick={handleUpdatepassword} >Edit</Button>
    </div>
    </div>
  )
}
export default ProfilePreferences 
