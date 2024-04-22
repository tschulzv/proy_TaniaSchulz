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
    } = props.userData;
    const [sessions, setSessions] = useState();
    const [ranking, setRanking] = useState();
    const [bestSubject, setBestSubject] = useState("");
    const [worstSubject, setWorstSubject] = useState("");
    const [maxTime, setMaxTime] = useState(0);
    const [average, setAverage] = useState(0);
    const [totalDates, setTotalDates] = useState(0);
    const client = new HTTPClient();

    useEffect(() => {
        // obtener sesiones, hallar promedio y ranking
        client.getAvgTime()
        .then(res=>{
            setMaxTime(res.data.maxTime);
            setTotalDates(res.data.totalDates);
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

    const convertTime = (timeInSeconds) => {
        let hours = Math.floor(timeInSeconds /  3600);
        let minutes = Math.floor((timeInSeconds % 3600) / 60);
        
        // agregar 0 al inicio
        let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        let formattedHours = hours > 0 ? (hours < 10 ? `0${hours}` : hours) : '00';
        
        // retornar como string
        return `${formattedHours}:${formattedMinutes}`; 
    }
    
    const findRanking = () => {
       // sumar todos los puntajes
        let totalScore = Object.values(subjects).reduce((acc, score) => {
            return acc + score;
        }, 0);
        console.log("PUNTAJE TOTAL", totalScore);

        if (totalScore >= 0 && totalScore < 1000) {
            return "Aprendiz";
        } else if (totalScore >= 1000 && totalScore < 5000) {
            return "Mago";
        } else if (totalScore >= 5000 && totalScore < 10000) {
            return "Hechicero";
        } else if (totalScore >= 10000) {
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
                    <p>Record de horas estudiadas: {convertTime(maxTime)}</p>
                    <p>Promedio de horas estudiadas: {convertTime(average)}</p>
                    <p>Dias estudiados: {totalDates}</p>
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