import React, { useState } from 'react'
import SideBar from '/Users/olfabendhaou/Desktop/Internship-frontEnd/src/Components/SideBar'
import { Box } from '@mui/material'
import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';



export default function Licenses() {
  const [file,setFile]= useState(null);
  const [isUploading, setisUploading] = useState(false);
  const [license_key,setLicense_key] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();
  const showToastMessage = (msg, type) => {
    toast[type](msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0])
  };
  async function handleUpload(e) {
    try {
      e.preventDefault();
      if (!file) {
        showToastMessage("no file selected","warning");
        return;
      }
      const  fd= new FormData();
      fd.append('file', file);

      const response = await axios.post('http://localhost:8000/api/LicensSettings/uploadfile', fd
      );
      showToastMessage("Upload Done","success");
      setisUploading(true);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error during handleUpload:", error);
      showToastMessage("Unsupported file type!","error");
      
    }
  }
  const handleInputlicensekey = (e) => {
    setLicense_key({
      ...license_key,
      [e.target.name]: e.target.value
    });
  };
  const handleAddkey= async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/api/LicensSettings/',license_key)
      console.log(response.data);
      showToastMessage("Key added successfully","success");
      return response.data;
    }
    catch(error) {
      if (error.response) {
        showToastMessage(error.response.data.errors[0].msg,'warning');
      }
      else{
      console.error("Error adding key:", error);
      showToastMessage("key not added!Please try again","error");
      }
  }
}
  return (
    <div style={{ display: "grid", gridTemplateColumns: "250px 1fr" }}>
    <Box sx={{display: "flex"}}>
    <SideBar/>
    </Box>
      <div sx={{ display: 'flex', flexDirection:'raw' ,justifyContent: 'center'}} >
      
      <Box sx={{ display: 'flex',flexDirection:'column' , justifyContent: 'center', alignItems:"center", padding:"80px", marginTop:"50px" }}>
      <h1>Choose a file to upload it please ! </h1><Input onChange ={handleFile } color="secondary" type='file' />
      <br/>
      <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button> 
      <ToastContainer />
      </Box>
       {isUploading && 
        <div>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding="80px">
        <h1>Insert a valid license key Please !</h1>
        <form className='Form'>
            <div className='Div' >
              <label>License key ;</label>
              <input
                type="text"
                onChange={handleInputlicensekey}
                name="license_key"
              />
            </div>
            <Button variant="contained" width ="20px" color="primary" onClick={handleAddkey} >Save</Button>
            <ToastContainer />
            </form>
            </Box>
            </div>
      }
      </div>
    </div>
  )
}