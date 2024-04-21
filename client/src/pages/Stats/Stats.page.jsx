import {
    BrowserRouter as Router,
    useNavigate
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.component";
import "./Stats.style.css";
import HTTPClient from "../../utils/HTTPClient";

const Stats = (props) => {
    const [loading, setLoading] = useState(true);
    const {
        name,
        avatar, 
        subjects,
        stats
    } = props.userData;
    const [sessions, setSessions] = useState();
    const [ranking, setRanking] = useState();
    const [bestSubject, setBestSubject] = useState("");
    const [worstSubject, setWorstSubject] = useState("");
    const [average, setAverage] = useState(0);
    const client = new HTTPClient();

    useEffect(() => {
        // obtener sesiones, hallar promedio y ranking
        client.getAvgTime()
        .then(res=>{
            setAverage(res.data.avgTime);
            console.log("[APP.JS]exito, tiempo promedio:", res.data.avgTime);
        })
        .catch(err=>console.log("no se obtuvo el promedio",err));
        setRanking(findRanking);
        setAverage();
        // ordenar mejor y peor asignatura
        let subjLength = Object.keys(subjects).length;
        let sortedSubjects = Object.entries(subjects).sort((a, b) => b[1] - a[1]);
        setBestSubject(sortedSubjects[0][0]);
        setWorstSubject(sortedSubjects[subjLength - 1][0]);
        // termina de cargar
        setLoading(false);
    }, [])
    
    const findRanking = () => {
        const score = stats.totalScore;
        if (score >= 0 && score < 1500) {
            return "Novato";
        } else if (score >= 1500 && score < 5000) {
            return "Aprendiz";
        } else if (score >= 5000 && score < 10000) {
            return "Mago";
        } else if (score >= 10000) {
            return "Leyenda";
        } else {
            return "Unknown";
        }
    };

    return (
        (loading ? <p>Loading...</p> : (
        <div className="wrapper">
            <Navbar title1="INICIO" link1="/" title2="ORGANIZADOR" link2="/resources" title3="AJUSTES" link3="/settings"/>
            <div class="content">
                <div className="side-bar">
                    <img src={avatar} alt="." className="avatar"/>
                    <h1>{name}</h1>
                    <p>Ranking: {ranking}</p>
                    <p>Fortaleza: {bestSubject}</p>
                    <p>Debilidad: {worstSubject}</p>
                </div>
                <div className="main-content">
                    <h2>STATS</h2>
                    <p>Record de horas estudiadas: {stats.maxTime}</p>
                    <p>Promedio de horas estudiadas: {average}</p>
                    {/*<p>Dias estudiados: {stats.dayCount}</p>*/}
                    <h2>HABILIDADES</h2>
                    {Object.entries(subjects).map(([subject, score]) => (
                                <p key={subject}>
                                    {subject} - {score}
                                </p>
                    ))}
                </div>
            </div>
        </div>))
    )
}

export default Stats;