import {
    BrowserRouter as Router,
    useNavigate
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.component";
import HTTPClient from "../../utils/HTTPClient";
import "../../components/StyleUtils.style.css"
import "./Settings.style.css";
import "../CreateResource/ResourceForm.style.css"

const Settings = (props) => {
    const [userData, setUserData] = useState(props.userData);
    const [subjects, setSubjects] = useState(props.userData.subjects);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [showSubjInput, setShowSubjInput] = useState(false);
    const [newSubject, setNewSubject] = useState("");
    const client = new HTTPClient();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const showInput = () => {
        console.log("[settings]ASIGNATURAS:", subjects);
        setShowSubjInput(true);
    }

    const handleNewSubject = (e) => {
        setNewSubject(e.target.value);
    };


    const deleteSubject = (subjectToDelete) => {
        setMsg("Se eliminó la asignatura")
        if (!userData || !subjects) return; // Check if userData is undefined
        const updatedSubjects = { ...subjects };
        delete updatedSubjects[subjectToDelete];
        setSubjects(updatedSubjects);
        client.editUser({ ...userData, subjects: updatedSubjects })
            .then((res) => {
                console.log("se edito las asignaturas", res)
                setShowMsg(true);
            })
            .catch((err) => console.log(err));
        setTimeout(() => {
            setShowMsg(false);
        }, 3000);
    };
    
    const addSubject = () => {
        setMsg("Se agregó la asignatura");
        if (!newSubject.trim()) return; 
        const updatedSubjects = { ...subjects };
        updatedSubjects[newSubject] = 0; // agregar la nueva asignatura a la copia 
        // guardar 
        setSubjects(updatedSubjects);
        setShowMsg(true);
        setShowSubjInput(false);  // ocultar input
        setTimeout(() => {
            setShowMsg(false);
        }, 3000);
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        // guardar los cambios y las nuevas asignaturas
        setMsg("Se guardaron los cambios");
        client.editUser({...userData, subjects: subjects})
            .then((res) => {
                console.log("SUBMITTED CHANGES:", res);
                setShowMsg(true);
            })
            .catch((err) => console.log(err));
       
        // el mensaje desaparece en 3 seg
        setTimeout(() => {
            setShowMsg(false);
            // pasar datos actualizados al inicio
            props.updateData(userData, subjects);
            navigate("/");
        }, 3000);
    };


    return(
        <div class="wrapper">
            <Navbar title1="INICIO" link1="/" title2="ORGANIZADOR" link2="/resources" title3="ESTADISTICAS" link3="/stats" />
            <div className="form-wrapper">
                <div className="form-box">
                    <h2 className="title">Ajustes</h2>
                    {userData && subjects && (<>
                    <form className="settings-form">
                        <div className="form-field">
                            <label htmlFor="name">Nombre</label>
                            <input name="name" type="text" placeholder={userData.name} onChange={handleChange}></input>
                        </div>
                        <div className="form-field">
                            <label htmlFor="avatar">Avatar</label>
                            <img src={userData.avatar} alt="#" className="settings-avatar"/>
                            <input name="avatar" type="text" placeholder={userData.avatar} onChange={handleChange}></input>
                        </div>
                        <div className="left-align">
                            <label>Asignaturas</label>
                            <div className="subjects-field">
                                {Object.entries(userData.subjects).map(([subject, score]) => (
                                    <div className="subject-name">
                                        <span key={subject}>{subject}</span> <button type="button" className="round-btn" onClick={() => deleteSubject(subject)}>X</button>
                                    </div>
                                ))}       
                            </div>
                        </div>
                        
                        <button type="submit" onClick={handleSubmit}>Guardar cambios</button>
                        {showMsg && <p className="msg">{msg}</p>}
                    </form>
                      <button onClick={showInput}>Nueva asignatura</button>
                      {showSubjInput && (
                          <div>
                              <input
                                  type="text"
                                  value={newSubject}
                                  onChange={handleNewSubject}
                                  placeholder="Nombre de la nueva asignatura"
                              />
                              <button onClick={addSubject}>Agregar</button>
                          </div>
                      )}</>
                )}
                </div>
            </div>
        </div>
    )

}

export default Settings;
/*
                <button onClick={showInput}>Nueva asignatura</button>
                {subjects && showSubjInput && <div className="form-field">
                    <label htmlFor="newSubject">Nueva asignatura</label>
                    <input name="newSubject" type="text" onChange={handleNewSubject}></input>
                    <button onClick={addSubject}></button>
                </div>}*/