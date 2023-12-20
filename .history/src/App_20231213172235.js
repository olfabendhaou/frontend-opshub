
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
    if (error.message=== )
  }
}
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        setIsAuthenticated(true);
        fetchProfileData();
    }
    else{
        navigate('/login')
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