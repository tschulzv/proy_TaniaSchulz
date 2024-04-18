import React, { useState } from "react";

const ResForm = (props) => {
    const { subjectList } = props.subjectList;
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [type, setType] = useState("");
    const [source, setSource] = useState("");
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        console.log("holaa");
    }
    
    return (
        <>
            <form className="res-form" onSubmit={(e) => {props.handleSubmit(e)}}>
                <label htmlFor="subject">Asignatura</label>
                <select id="subject" onChange={(e) => {setSubject(e.target.value)}}>
                    {
                        subjectList && subjectList.map((subject, i) => {
                            <option value={i}>{subject}</option>
                        })
                    }
                </select>
                <label htmlFor="type">Tipo</label>
                <select id="type" onChange={(e) => {setType(e.target.value)}}>
                    <option value="video">Video</option>
                    <option value="ebook">Ebook</option>
                    <option value="website">Sitio web</option>
                    <option value="workbook">Ejercitario</option>
                </select>
                <label htmlFor="topic">Tema</label>
                <input id="topic" type="text" onChange={(e) => {setTopic(e.target.value)}}></input>
                <label htmlFor="source">Fuente</label>
                <input id="source" type="text" onChange={(e) => {setSource(e.target.value)}}></input>
                <button type="submit" onSubmit={props.handleSubmit}>Agregar</button>
            </form>
        </>
    );

}

export default ResForm;