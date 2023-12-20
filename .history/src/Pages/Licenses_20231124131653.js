import React, { useState } from 'react'
import SideBar from '/Users/olfabendhaou/Desktop/Internship-frontEnd/src/Components/SideBar'
import { Box } from '@mui/material'
import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import axios from 'axios';



export default function Licenses() {
  const [file,setFile]= useState(null);
  const [progress,setProgress]= useState({started: false, pc:0});
  const [msg,setMsg]= useState(null);
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
      setMsg("Upload Done");
      console.log(response.data);
    } catch (error) {
      setMsg("Upload Failed");
      console.error(error);
    }
  }
  
  return (
    <div>
    <Box sx={{display: "flex"}}>
    <SideBar/>
    </Box>
      <div sx={{ display: 'flex', flexDirection:'raw' ,  justifyContent: 'center', padding: '100px'}} >
      <Input onChange ={handleFile } color="secondary" type='file' />
      <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>

      {progress.started &&  
        <progress max="100" value ={progress.pc}></progress>
      }
      {msg && <span>{msg}</span>}
      </Box>
     
      </div>
  </div>
  )
}
