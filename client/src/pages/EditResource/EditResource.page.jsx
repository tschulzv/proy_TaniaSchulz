import {
    BrowserRouter as Router,
    useNavigate,
    useParams
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import HTTPClient from "../../utils/HTTPClient";
import Navbar from "../../components/Navbar.component";
import "../CreateResource/ResourceForm.style.css"

const EditResource = (props) => {
    const { id } = useParams();
    const [resource, setResource] = useState();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const client = new HTTPClient();

    useEffect(() => {
        client.getOneResource(id)
            .then(res => {
                setResource(res.data);
                console.log("RECURSO OBTENIDO", res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        setResource({
            ...resource, [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validate) {
            return;
        }

        client.editResource(id, resource)
            .then((res) => {
                console.log("Recurso editado con exito", res);
                navigate("/resources");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const validate = () => {
        let flag = true;
        let errors = {}

        if (resource.subject.length < 3){
            errors.subject = "Asignatura invalida";
            flag = false;
        }

        if (resource.topic.length < 3){
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
                    <h1 className="form-header">Editar un recurso</h1>
                    {
                        resource && (
                        <form className="res-form" onSubmit={(e) => {handleSubmit(e)}}>
                            <label htmlFor="subject">Asignatura</label>
                            <select name="subject" placeholder={resource.subject} onChange={(e) => {handleChange(e)}}>
                                {
                                    props.subjects && props.subjects.map((subject, i) => (
                                        <option value={i}>{subject}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="type">Tipo</label>
                            <select name="type" onChange={(e) => {handleChange(e)}}>
                                <option value="video">Video</option>
                                <option value="ebook">Ebook</option>
                                <option value="website">Sitio web</option>
                                <option value="workbook">Ejercitario</option>
                            </select>
                            <label htmlFor="topic">Tema</label>
                            <input name="topic" placeholder={resource.topic} type="text" onChange={(e) => {handleChange(e)}}></input>
                            <label htmlFor="source">Fuente</label>
                            <input name="source" type="text" placeholder={resource.source} onChange={(e) => {handleChange(e)}}></input>
                            <button type="submit">Agregar</button>
                        </form>)
                    }
                </div>
            </div>
        </div>
    )
}

export default EditResource;