import React, { useState } from 'react'
import SideBar from '/Users/olfabendhaou/Desktop/Internship-frontEnd/src/Components/SideBar'
import { Box } from '@mui/material'
import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";



export default function Licenses() {

  const [file,setFile]= useState(null);
  const [progress,setProgress]= useState({started: false, pc:0});
  const [msg,setMsg]= useState(null);
  const [isUploading, setisUploading] = useState(false);
  const [license_key,setLicense_key] = useState(null);

  const showToastMessage = (msg, type) => {
    toast[type](msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
    msg='';
  };
  const handleFile = (e) => {
    setFile(e.target.files[0])
  };
  async function handleUpload(e) {
    try {
      e.preventDefault();
      if (!file) {
        setMsg("no file selected");
        return;
      }
      const  fd= new FormData();
      fd.append('file', file);
      setMsg("Uploading..");
      setProgress(prevState => {
        return { ...prevState, started: true };
      });

      const response = await axios.post('http://localhost:8000/api/LicensSettings/uploadfile', fd, {
        onUploadProgress: (progressEvent) => {
          setProgress(prevState => {
            return { ...prevState, pc: (progressEvent.loaded / progressEvent.total) * 100 };
          });
        },
      });
      showToastMessage("Upload Done","success");
      setisUploading(true);
      console.log(response.data);
      
    } catch (error) {
      showToastMessage(error.msg,"error");
      console.error(error);
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
      console.error("Error adding key:", error);
      showToastMessage("key not added!Please try again","error");
      return null;
  }
}

  return (
    <div>
    <Box sx={{display: "flex"}}>
    <SideBar/>
    </Box>
      <div sx={{ display: 'flex', flexDirection:'raw' ,justifyContent: 'center', padding: '100px'}} >
      <Box sx={{ display: 'flex',  justifyContent: 'center', padding: '100px' }}>
      <Input onChange ={handleFile } color="secondary" type='file' />
      <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
      <Box sx={{ mt: 2 }}>
      </Box> 
      </Box>
       {isUploading && 
        <div>
        <Box display="flex" justifyContent="center" alignItems="center" padding="80px">
        <form className='Form'>
            <div className='Div' >
              <label>License key ;</label>
              <input
                type="text"
                onChange={handleInputlicensekey}
                name="license_key"
              />
            </div>
            <Button variant="contained" onClick={handleAddkey} >Save</Button>
            <ToastContainer />
            </form>
            </Box>
            </div>
      }
      </div>
    </div>
  )
}
