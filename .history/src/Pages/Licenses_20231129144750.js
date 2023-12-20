import React, { useState,useEffect } from 'react'
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
  const [license_key,setLicense_key] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const number= 2000;
  const timer = React.useRef(number);


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
      setFile(e.target.files[0]);
  };
  /////Uploading file function///////////////////////

  async function handleUpload(e) {
    try {
      e.preventDefault();
      if (!file) {
        showToastMessage("No file selected, Please Choose your file!","warning");
        return;
      }
      const  fd= new FormData();
      fd.append('file', file);
      const response = await axios.post('http://localhost:8000/api/LicensSettings/uploadfile', fd);
      const cloudinaryUrl = response.data.url;
      showToastMessage("Upload Done","success");
      setisUploading(true);
      console.log(response.data);
      const fetchResponse = await axios.get(cloudinaryUrl);
      setFileContent (fetchResponse.data);
      console.log(fileContent);

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

  const handleInputlicensekey = (e) => {

    const licenseKeyRegex = /license_Key:\s*([^\s]+)/;
   const match = fileContent.match(licenseKeyRegex);

  if (match) {
    const extractedLicenseKey = match[1];
    return extractedLicenseKey;
  } else {
    // Handle the case where the license key is not found
    throw new Error('License key not found in the file.');
  }
}
    setLicense_key({
      ...license_key,
      [e.target.name]: e.target.value
    });
  };

  ////////////Adding license_key function/////////////////

  const handleAddkey= async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/api/LicensSettings/',license_key)
      console.log(response.data);
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
          <Input type="file"  encType= "multipart/form-data"  onChange={handleFile} color="secondary" />
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
        <h1>Insert a valid license key Please !</h1>
        <form className='Form'>
            <div className='Div' >
              <label>License key :</label>
              <input
                type="text"
                onChange={handleInputlicensekey}
                name="license_key"
              />
            </div>
            <br/>
            <Button variant="contained" width ="20px" color="primary" onClick={handleAddkey} >Save Key</Button>
            <ToastContainer />
            </form>
            </Box>
            </div>
      }
      </div>
    </div>
  )
}

