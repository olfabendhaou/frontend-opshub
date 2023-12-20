import {  Box, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '/Users/olfabendhaou/Desktop/Internship-frontEnd/src/Components/SideBar';
import './Profile.css';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ setAuth }) => { 
  const [user,setUser]= useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate =useNavigate('');

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
          const handleInputChange = (e) => {
            setUser({
              ...user,
              [e.target.name]: e.target.value
            });
          };  
          const handleSaveProfile = async () => {

          try {
          const config = {
              headers: {
              Authorization: localStorage.token,
              'Content-Type': 'application/json', 
              },
              };
              await axios.put(`http://localhost:8000/api/user/${user.id}`, user,config);
              setAuth(true)
              setMessage(...message,'Profile updated successfully')
              navigate('/dashboard')
              // setIsEditing(false);
              console.log (message)
            } catch (error) {
            
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log('Server responded with an error:', error.response.data);
              setErrorMessage(error.response.data.errors[0].msg);
              console.log(errorMessage)
            } else if (error.request) {
              // The request was made but no response was received
              setMessage('Failed to update profile. Please try again!');
              console.log('No response received from the server');
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error during request setup:', error.message);
            }
          }
        };
        const showToastMessage = () => {
          toast.warning(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setErrorMessage('');
        }
    return (
  <div style={{ display: "grid", gridTemplateColumns: "250px 1fr" }}>
  <SideBar/>
  <Box display="flex" justifyContent="center" alignItems="center" padding="80px">
  <form className='Form'>
  {console.log(errorMessage)}
      <div className='Div' >
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          value={user.firstname}
          onChange={handleInputChange}
          
        />
      </div>
      <div className='Div'>
      <label>Last Name:</label>
      <input
        type="text"
        name="lastname"
        value={user.lastname}
        onChange={handleInputChange}
      />
    </div>
  
    <div className='Div'>
    <label>Job Title:</label>
    <input
      type="text"
      name="jobtitle"
      value={user.jobtitle}
      onChange={handleInputChange}
    />
  </div>
  <div className='Div'>
  <label>Company:</label>
  <input
    type="text"
    name="company"
    value={user.company}
    onChange={handleInputChange}
  />
</div>

<div className='Div'>
<label>City:</label>
<input
  type="text"
  name="city"
  value={user.city}
  onChange={handleInputChange}
/>
</div>

<div className='Div'>
<label>ZIP/Postal Code:</label>
<input
  type="numbre"
  name="postalcode"
  value={user.postalcode}
  onChange={handleInputChange}
/>
</div>
<div className='Div'>
<label>Country: </label>
<input
type="text"
name="country"
value={user.country}
onChange={handleInputChange}
/>
</div>
<div className='Div'>
<label>State/Province:</label>
<input
  type="text"
  name="state"
  value={user.state}
  onChange={handleInputChange}
/>
</div>

<div className='Div'>
<label>Language:</label>
<input
  type="text"
  name="language"
  value={user.language}
  onChange={handleInputChange}
/>
</div>
<div className='Div'>
<label>Timezone:</label>
<input
  type="text"
  name="timezone"
  value={user.timezone}
  onChange={handleInputChange}
/>
</div>
<div className='Div'>
<label>Telephone:</label>
<input
  type="number"
  name="telephone"
  value={user.telephone}
  onChange={handleInputChange}
/>
</div>

<div className='Div'>
        <label>Email Adress:</label>
        <input
          type="email"
          name="emailadress"
          value={user.emailadress}
          onChange={handleInputChange}
        />
      </div>
      <br/>
      <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={errorMessage? showToastMessage : handleSaveProfile} >Save</Button>
      <Button  variant="contained" onClick={()=>{navigate('/editpassword')}}>Edit Password</Button>
      </Stack>
      <ToastContainer />
    </form>
</Box>
</div>

    );
    }
export default Profile;
