
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
// const logoutAction=  async (user)=>{
//     try{
//     const currentTimestamp = new Date().toLocaleString();
//     const action_user={login:user.firstname,
//     name:user.lastname,
//     surname:user.firstname,
//     email:user.emailadress,
//     action:'logout',
//     action_time:currentTimestamp }
//     console.log(action_user);
//   await axios.post('http://localhost:8000/api/user/user_action',action_user)
// }
// catch (err) {
// console.error(err.message);
// }
// }
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        setIsAuthenticated(true);
        fetchProfileData();
        console.log(user)
        navigate('/dashboard')
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