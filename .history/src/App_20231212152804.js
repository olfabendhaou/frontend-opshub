
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import Dashboard from './Pages/Dashboard';
import  { useState } from 'react'
import SideBar from './Components/SideBar';
import Configurator from './Pages/Configurator';
import ConnectedSystems from './Pages/ConnectedSystems';
import Licenses from './Pages/Licenses';
import TroubleShooting from './Pages/TroubleShooting';
import DataExplorer from './Pages/DataExplorer';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import GeneralSettings from './Pages/GeneralSettings';
import SettingsList from './Pages/SettingsList';
import WebConsole from './Pages/WebConsole';
import PlatformSettings from './Pages/PlatformSettings';
import ListenerSettings from './Pages/ListenerSettings';
import Integration from './Pages/Integration';
import ConnectedSystemInstance from './Pages/ConnectedSystemInstance';
import ProfilePreferences from './Pages/Profile Preferences/ProfilePreferences';
import { useEffect } from 'react';
import axios from 'axios';
function App() {
const [user,setUser]= useState('');
const [isAuthenticated, setIsAuthenticated] = useState(false);

// const setAuth = boolean => {
//     setIsAuthenticated(boolean);
// };
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
      console.log(user)
    }
catch (error) {
    console.error('Error fetching profile data:', error);
  }
}
const logoutaction=  async (user)=>{
    try{
    const currentTimestamp = new Date().toLocaleString();
    const action_user={login:user.firstname,
    name:user.lastname,
    surname:user.firstname,
    email:user.emailadress,
    action:'logout',
    action_time:currentTimestamp }
  await axios.post('http://localhost:8000/api/user/user_action',action_user)
}
catch (err) {
console.error(err.message);
}
}
useEffect(()=>{
    if (localStorage.getItem("token")){
        setIsAuthenticated(true)
        fetchProfileData()
        ;} 
    
},[])

return (
<BrowserRouter>
    <Routes>
    <Route
        path="/login"
        element={<SignIn />}
            />
    <Route 
    path="/"
    element={ <SignIn />}
    /> 
    <Route
        exact
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> :  <Navigate to="/login" />}
            />
    <Route
        exact
        path="/profile"
        element={isAuthenticated ? <Profile  /> : <Navigate to="/login" />}
            />
    <Route
        exact
        path="/editpassword"
        element={isAuthenticated ? <ProfilePreferences /> : <Navigate to="/login" />}
    />
    <Route
        exact
        path="/settings"
        element={isAuthenticated ? <GeneralSettings /> : <Navigate to="/login" />}
            />
    <Route path="/sidebar"  
        element={isAuthenticated ? <SideBar/> : <Navigate to="/login" />}/>
    <Route path="/settingslist"
        element={isAuthenticated ? <SettingsList /> : <Navigate to="/login" />}/>
    <Route path="/webconsole" 
        element={isAuthenticated ? <WebConsole  /> : <Navigate to="/login" />}/>
    <Route path="/platformsettings" 
        element={isAuthenticated ? <PlatformSettings /> : <Navigate to="/login" />}/>
    <Route path="/listenersettings" 
        element={isAuthenticated ? <ListenerSettings /> : <Navigate to="/login" />}/>
    <Route path="/configurator" 
        element={isAuthenticated ? <Configurator  /> : <Navigate to="/login" />}/>
    <Route path="/integration/:id/:connected_system_id_1/:connected_system_id_2" 
        element={isAuthenticated ? <Integration /> : <Navigate to="/login" />}/>
    <Route path="/instance/:systemId" 
        element={isAuthenticated ? <ConnectedSystemInstance /> : <Navigate to="/login" />}/>
    <Route path="/connectedsystems" 
        element={isAuthenticated ? <ConnectedSystems/> : <Navigate to="/login" />}/>
    <Route path="/licenses" element={<Licenses/>}/>
    <Route path="/troubleshooting" element={<TroubleShooting/>}/>
    <Route path="/dataexplorer" element={<DataExplorer/>}/>
    </Routes>
</BrowserRouter>
    
);
}

export default App;