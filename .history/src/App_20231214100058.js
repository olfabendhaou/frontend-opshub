
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
import { useNavigate } from 'react-router-dom';
function App() {
const [user,setUser]= useState('');
const [isAuthenticated, setIsAuthenticated] = useState(false);
const navigate= useNavigate()
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
const logout = async  () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.token,
          'Content-Type': 'application/json', 
        },
      };
      const response = await axios.get('http://localhost:8000/api/user/profile', config);
      const usertoget = response.data;
      console.log(usertoget);
      const timeStamp= Math.floor(new Date().getTime() / 1000)
      const action_user={login:usertoget.firstname,
        name:usertoget.lastname,
        surname:usertoget.firstname,
        email:usertoget.emailadress,
        action:'logout',
        action_time:timeStamp}
      console.log(action_user)
      await axios.post('http://localhost:8000/api/user/user_action',action_user,config)
      localStorage.removeItem("token");
      
    } catch (err) {
      console.error(err.message);
    }
  };
function decode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
  
    return JSON.parse(jsonPayload);
  }

function checkTokenExpiration(token) {
    const decodedToken = decode(token); // Use a function to decode the token
    if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
      // Token is expired, initiate logout
      logout();
      navigate('/login')
      return true;
    }
    setIsAuthenticated(true);
    fetchProfileData();
    return false;
  }
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        checkTokenExpiration(token)
    }
},[]);

return (
    <div className="App">
    {isAuthenticated &&
        <sideBar/>}
    <Routes>
    <Route
        path="/login"
        element={<SignIn />}
            />
    <Route 
    path="/"
    element={ <SignIn />}
    /> 
</Routes>
{isAuthenticated &&
    <Routes>
    <Route
        exact
        path="/dashboard"
        element={ <Dashboard />}
            />
    <Route
        exact
        path="/profile"
        element={ <Profile  />}
            />
    <Route
        exact
        path="/editpassword"
        element={ <ProfilePreferences />}
    />
    <Route
        exact
        path="/settings"
        element={ <GeneralSettings /> }
            />
    <Route path="/settingslist"
        element={<SettingsList />}/>
    <Route path="/webconsole" 
        element={<WebConsole  />}/>
    <Route path="/platformsettings" 
        element={<PlatformSettings />}/>
    <Route path="/listenersettings" 
        element={ <ListenerSettings />}/>
    <Route path="/configurator" 
        element={<Configurator />}/>
    <Route path="/integration/:id/:connected_system_id_1/:connected_system_id_2" 
        element={ <Integration />}/>
    <Route path="/instance/:systemId" 
        element={<ConnectedSystemInstance />}/>
    <Route path="/connectedsystems" 
        element= {<ConnectedSystems/>}
        />
    <Route path="/licenses" element={<Licenses/>}/>
    <Route path="/troubleshooting" element={<TroubleShooting/>}/>
    <Route path="/dataexplorer" element={<DataExplorer/>}/>
    </Routes>
}
</div> 
);
}
export default App;