import {  Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
const Profile = () => { 

  const [user,setUser]= useState('');
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
          
              const response = await axios.get('/api/user/profile', config);
              const usertoget = response.data;
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
    return(
        <div style={{ display: "grid", gridTemplateColumns: "250px 1fr" }}>
  <SideBar/>
  <Box display="flex" justifyContent="center" alignItems="center" padding="80px">
  <form onSubmit={handleSubmit}>
      <div >
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          onChange={handleInputChange}
          
        />
      </div>
    
      <div>
      <label>Last Name:</label>
      <input
        type="text"
        name="lastname"
        onChange={handleInputChange}
      />
    </div>
  
    <div>
    <label>Job Title:</label>
    <input
      type="text"
      name="jobtitle"
      onChange={handleInputChange}
    />
  </div>
  <div>
  <label>Company:</label>
  <input
    type="text"
    name="company"
    onChange={handleInputChange}
  />
</div>

<div>
<label>City:</label>
<input
  type="text"
  name="city"
  onChange={handleInputChange}
/>
</div>

<div>
<label>ZIP/Postal Code:</label>
<input
  type="numbre"
  name="postalcode"
  onChange={handleInputChange}
/>
</div>
<div style={{marginTop: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
<label>Country: </label>
<input
type="text"
name="country"
onChange={handleInputChange}
/>
</div>
<div>
<label>State/Province:</label>
<input
  type="text"
  name="state"
  onChange={handleInputChange}
/>
</div>

<div>
<label>Language:</label>
<input
  type="text"
  name="language"
  onChange={handleInputChange}
/>
</div>
<div>
<label>Timezone:</label>
<input
  type="text"
  name="timezone"
  onChange={handleInputChange}
/>
</div>
<div>
<label>Telephone:</label>
<input
  type="number"
  name="telephone"
  onChange={handleInputChange}
/>
</div>

<div>
        <label>Email Adress:</label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
        />
      </div>
      <br/>
      <div className='submit'>
      <button type="submit">Save</button>
      <button type="submit">Edit Password </button>
      </div>
    </form>
</Box>

</div>

    );
    }

export default Profile;
