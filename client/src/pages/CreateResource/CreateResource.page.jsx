import {
    BrowserRouter as Router,
    useNavigate
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./ResourceForm.style.css"
import HTTPClient from "../../utils/HTTPClient";
import Navbar from "../../components/Navbar.component";

const CreateResource = (props) => {
    const [showMsg, setShowMsg] = useState(false);
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [type, setType] = useState("");
    const [source, setSource] = useState([]);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    let client = new HTTPClient();

    useEffect(()=>{
        console.log("[CREATE]", props.subjects);
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validate) {
            return;
        }

        let data = { subject, topic, type, source }
        
        client.createResource(data)
            .then((res) => {
                console.log("Recurso creado con exito", res);
                setShowMsg(true);
                setTimeout(() => {
                    setShowMsg(false);
                    navigate("/resources");
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const validate = () => {
        let flag = true;
        let errors = {}

        if (subject.length < 3){
            errors.subject = "Asignatura invalida";
            flag = false;
        }

        if (topic.length < 3){
            errors.topic = "Tema debe ser mas largo";
            flag = false;
        }

        setErrors(errors);
        return flag;
    }

    return (
        <div className="wrapper">
            <Navbar title1="INICIO" link1="/" title2="ESTADISTICAS" link2="/stats" title3="AJUSTES" link3="/settings" />
            <div className="form-wrapper">
                <div className="form-box">
                    <h1 className="form-header">Agregar un recurso</h1>
                    <form className="res-form" onSubmit={(e) => {handleSubmit(e)}}>
                        <div className="form-field">
                            <label htmlFor="subject">ASIGNATURA</label>
                            <select id="subject" onChange={(e) => {setSubject(e.target.value)}}>
                                {
                                    props.subjects && props.subjects.map((sub, i) => (
                                        <option value={sub}>{sub}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="type">TIPO</label>
                            <select id="type" onChange={(e) => {setType(e.target.value)}}>
                                <option value="video">Video</option>
                                <option value="ebook">Ebook</option>
                                <option value="website">Sitio web</option>
                                <option value="workbook">Ejercitario</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="topic">TEMA</label>
                            <input id="topic" type="text" onChange={(e) => {setTopic(e.target.value)}}></input>
                        </div>
                        <div className="form-field">
                            <label htmlFor="source">FUENTE</label>
                            <input id="source" type="text" onChange={(e) => {setSource(e.target.value)}}></input>
                        </div>
                        <button type="submit">AGREGAR</button>
                        {showMsg && <p className="msg">Se ha guardado el recurso.</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateResource;