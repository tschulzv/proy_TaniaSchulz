import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import moment from 'moment';
import Home from "./pages/HomePage/Home.page";
import ResourceTable from "./pages/ResourceTable/ResourceTable.page";
import CreateResource from "./pages/CreateResource/CreateResource.page";
import EditResource from "./pages/EditResource/EditResource.page";
import Stats from "./pages/Stats/Stats.page";
import Settings from "./pages/Settings/Settings.page";
import HTTPClient from './utils/HTTPClient';

function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [todaySessions, setTodaySessions] = useState();
  const [subjects, setSubjects] = useState([]);

  // para guardar las asignaturas
  const client = new HTTPClient();  
  
  useEffect(() => {
    // obtener datos del usuario 
    client.getUser()
    .then(res=>{
    // obtener lista de asignaturas 
      setSubjects(Object.keys(res.data.subjects));
      /* guardar datos del uusario */
      setUserData(res.data);
      console.log("[APP.JS]exito, usuario:", res.data);
      console.log("ASIGNATURAS:", subjects);
    })
    .catch(err=>console.log("no se obtuvo el usuario", err));
    
    /* obtener coleccion de sesiones DE HOY*/
    client.getTodaySessions()
        .then(res=>{
            // si aun no hay sesiones de hoy, sumar uno a la cantidad de dias
            if(!res.data.sessions){
              
            }
            setTodaySessions(res.data.sessions);
            console.log("[APP.JS]exito, sesiones de hoy:", res.data.sessions);
        })
        .catch(err=>console.log("no se obtuvieron las sesiones",err));
  
    

    setLoading(false);
    }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home loading= {loading} userData={userData} todaySessions={todaySessions} subjects={subjects}/>}/>
        <Route path="/resources" element = {<ResourceTable />}/>
        <Route path="/resources/create" element={<CreateResource subjects={subjects}/>}/>
        <Route path="/resources/:id/edit" element={<EditResource subjects={subjects}/>}/>
        <Route path="/stats" element={<Stats userData={userData}/>}/>
        <Route path="/settings" element={<Settings userData={userData} subjects={subjects}/>}/>
      </Routes>
  </Router>
  );
}

//<Route path="/resources/:id/edit" element={<EditResource subjects={subjects}/>}/>
export default App;


