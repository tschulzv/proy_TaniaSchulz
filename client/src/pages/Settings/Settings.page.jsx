import {
    BrowserRouter as Router,
    useNavigate
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.component";
import HTTPClient from "../../utils/HTTPClient";
import "./Settings.style.css";
import "../CreateResource/ResourceForm.style.css"

const Settings = (props) => {
    const [userData, setUserData] = useState(props.userData);
    const [subjects, setSubjects] = useState(props.userData.subjects);
    const client = new HTTPClient();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const deleteSubject = (subjectToDelete) => {
        if (!userData) return; // Check if userData is undefined
        const updatedSubjects = { ...subjects };
        delete updatedSubjects[subjectToDelete];
        setSubjects(updatedSubjects);
        // Update the JSON data immediately
        client.editUser({ ...userData, subjects: updatedSubjects })
            .then((res) => console.log("ajustes guardados", res))
            .catch((err) => console.log(err));
    };
    
    const addSubject = () => {
        if (!userData) return; // Check if userData is undefined
        const newSubjects = { ...subjects, 'Nueva asignatura...': 0 };
        setSubjects(newSubjects);
        // Update the JSON data immediately
        console.log("AHORA EDITAR USUARIO...");
        client.editUser({ ...userData, subjects: newSubjects })
            .then((res) => console.log("ajustes guardados", res))
            .catch((err) => console.log(err));
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Make API call to update user data
        client.editUser(userData)
            .then((res) => {
                console.log("ajustes guardados", res);
                // Optionally, update state or show a success message
            })
            .catch((err) => console.log(err));
    };


    return(
        <div class="wrapper">
            <Navbar title1="INICIO" link1="/" title2="ORGANIZADOR" link2="/resources" title3="ESTADISTICAS" link3="/stats" />
            <div className="form-wrapper">
                <div className="form-box">
                    <h2 className="title">Ajustes</h2>
                    {userData && subjects && (
                    <form className="settings-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Nombre</label>
                        <input name="name" type="text" placeholder={userData.name} onChange={handleChange}></input>
                        <label htmlFor="avatar">Avatar</label>
                        <img src={userData.avatar} alt="#" className="avatar"/>
                        <input name="avatar" type="text" placeholder={userData.avatar} onChange={handleChange}></input>
                        <h3>Asignaturas</h3>
                        <div id="subjectList">
                            {Object.entries(userData.subjects).map(([subject, score]) => (
                                <p>
                                    <span key={subject}>{subject}</span> <button type="button" onClick={() => deleteSubject(subject)}>Borrar</button>
                                </p>
                            ))}       
                        </div>
                        <button onClick={addSubject}>Agregar</button>
                        <button type="submit" onClick={handleSubmit}>Guardar cambios</button>
                    </form>
                )}
                </div>
            </div>
        </div>
    )

}

export default Settings;