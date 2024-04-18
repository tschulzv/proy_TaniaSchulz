import {
    BrowserRouter as Router,
    useNavigate
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.component";
import "./Stats.style.css";
const Stats = (props) => {
    const [loading, setLoading] = useState(true);
    const {
        name,
        avatar, 
        subjects,
        stats
    } = props.userData;
    const [ranking, setRanking] = useState();
    const [bestSubject, setBestSubject] = useState("");
    const [worstSubject, setWorstSubject] = useState("");

    useEffect(() => {
        setRanking(findRanking);
        // ordenar mejor y peor asignatura
        let subjLength = Object.keys(subjects).length;
        let sortedSubjects = Object.entries(subjects).sort((a, b) => b[1] - a[1]);
        console.log("ORDENADO:", sortedSubjects);
        setBestSubject(sortedSubjects[0][0]);
        console.log("ORDENADO:", bestSubject);
        setWorstSubject(sortedSubjects[subjLength - 1][0]);
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
                    <p>Promedio de horas estudiadas: {stats.avgTime}</p>
                    <p>Dias estudiados: {stats.dayCount}</p>
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