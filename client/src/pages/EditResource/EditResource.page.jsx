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
    const [showMsg, setShowMsg] = useState();
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
                setShowMsg("Se han guardado los cambios");
                setTimeout(() => {
                    navigate("/resources");
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteResource = (e) => {
        client.deleteResource(id)
            .then((res) => {
                console.log("Recurso eliminado con exito", res);
                setShowMsg("Recurso eliminado con exito.");
                setTimeout(() => {
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
                            <div className="form-field">
                                <label htmlFor="subject">Asignatura</label>
                                <select name="subject" onChange={(e) => {handleChange(e)}}>
                                    {
                                        props.subjects && props.subjects.map((subject, i) => (
                                            <option value={subject}>{subject}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-field">
                                <label htmlFor="type">Tipo</label>
                                <select name="type" onChange={(e) => {handleChange(e)}}>
                                    <option value="video">Video</option>
                                    <option value="ebook">Ebook</option>
                                    <option value="website">Sitio web</option>
                                    <option value="workbook">Ejercitario</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label htmlFor="topic">Tema</label>
                                <input name="topic" placeholder={resource.topic} type="text" onChange={(e) => {handleChange(e)}}></input>
                            
                            </div>
                            <div className="form-field">
                                <label htmlFor="source">Fuente</label>
                                <input name="source" type="text" placeholder={resource.source} onChange={(e) => {handleChange(e)}}></input>
                            </div>
                            <button onClick={handleSubmit}>Guardar</button>
                            <button onClick={deleteResource}>Eliminar</button>
                            {showMsg && <p>{showMsg}</p>}
                        </form>)
                    }
                </div>
            </div>
        </div>
    )
}

export default EditResource;