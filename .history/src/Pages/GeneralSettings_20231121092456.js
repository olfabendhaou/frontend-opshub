import React, { useState } from 'react';
import {
  Grid,
  
 
} from '@mui/material';
import SideBar from '/Users/olfabendhaou/Desktop/Internship-frontEnd/src/Components/SideBar';
import SettingsList from './SettingsList';

const GeneralSettings = () => {
  

  return (
    <div>
   <Grid container spacing={2}>
     
      <Grid item xs={3}>
        <SideBar />
      </Grid>

     
      <Grid item xs={9}>
        <SettingsList />
      </Grid>
    </Grid>
    </div>
  );
};

export default GeneralSettings;
