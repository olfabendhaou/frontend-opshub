import React, { useState,useEffect, useRef } from 'react'
import SideBar from '/Users/olfabendhaou/Desktop/Internship-frontEnd/src/Components/SideBar'
import { Box } from '@mui/material'
import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { blue} from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function Licenses() {
  const [file,setFile]= useState(null);
  const [fileContent,setFileContent]= useState(null);
  const [isUploading, setisUploading] = useState(false);
  const [license,setLicense]=useState({id:'',license_key: ''});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const number= 2000;
  const timer = React.useRef(number);
  const fileInputRef = useRef();

  ///////////Uploading file Button/////////
  const buttonSx = {
    ...(success && {
      bgcolor: blue[700],
      '&:hover': {
        bgcolor: blue[800],
      },
    }),
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!file) {
        showToastMessage("No file selected, Please Choose a file!","warning");
        return;
      }
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };
  /////////////Notifications functions ///////////////
  const showToastMessage = (msg, type) => {
    toast[type](msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

///////////////Input file functions////////
  const handleFile = (e) => {
    e.preventDefault();
      setFile(e.target.files[0]);
  };
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  /////Uploading file function///////////////////////
  async function handleUpload(e) {
    e.preventDefault();
    try {
      if (!file) {
        showToastMessage("No file selected, Please Choose your file!","warning");
        return;
      }
      const  fd= new FormData();
      fd.append('file', file);
      const response = await axios.post('http://localhost:8000/api/LicensSettings/uploadfile', fd);
      const cloudinaryUrl = response.data.url;
      showToastMessage("Upload Done","success");
      console.log(response.data);
      const fetchResponse = await axios.get(cloudinaryUrl);
      console.log(fetchResponse.data)
      const fileContent= fetchResponse.data;
      await setFileContent (fileContent);
      console.log(fileContent);
      const licenseKeyRegex = /<licence_key>([\s\S]*?)<\/licence_key>/;
      const match = fileContent.match(licenseKeyRegex);
      
      if (match) {
        console.log (match)
        const extractedLicenseKey = match[1];
        console.log (extractedLicenseKey)
        setLicense({license_key:extractedLicenseKey});
        setisUploading(true)
    } else {
      // Handle the case where the license key is not found
      showToastMessage("License key not found in the file.", "warning");
    }
    return;
    }
      catch(error) {
        if (error.response) {
          showToastMessage("Unsupported file type!",'warning');
        }
        else{
        console.error("Error adding file:", error);
        showToastMessage("file not added!Please try again","error");
        }
    }
  }
  /////////Input license_key function ////////////
const handleKey =(e ) =>{
  setLicense({...license,[e.target.name]: e.target.value});
};
    ////////////Adding license_key function/////////////////
const handleAddkey= async (e) => {
  e.preventDefault();
    try{
      await axios.post('http://localhost:8000/api/LicensSettings/',license)
      showToastMessage("Key added successfully","success");
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
          <h1>Choose a file to upload it Please ! </h1>
          <Input
           type="file" 
           ref={fileInputRef}
           encType= "multipart/form-data"
           onChange={handleFile} 
          color="secondary"
          onClick={(e) => e.target.value = null} 
          
          />
          <br/>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Fab
                aria-label="save"
                color="primary"
                sx={buttonSx}
                onClick={handleButtonClick}
              >
                {success ? <CheckIcon /> : <SaveIcon />}
              </Fab>
              {loading && (
              <CircularProgress
                    size={68}
                    sx={{
                    color:"primary",
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
              }}
              />
              )}
            </Box>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Button
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick&&handleUpload}
              >
                Upload File
              </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color:"primary",
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
      <ToastContainer />
      </Box>
{isUploading && 
        <div>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding="80px">
        <form className='Form'>
            <div className='Div' >
              <label>License key :</label>
              <input
                type="text"
                name="license_key"
                value={license.license_key}
                onChange={handleKey}
              />
            </div>
            <br/>
            <Button variant="contained" color="primary" onClick={handleAddkey} >Save Key</Button>
            <ToastContainer />
            </form>
            </Box>
            </div>
      }
      </div>
    </div>
  )
}

