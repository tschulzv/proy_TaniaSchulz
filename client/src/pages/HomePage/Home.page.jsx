import React, { useState, useEffect } from "react";
import moment from 'moment';
import HTTPClient from "../../utils/HTTPClient";
import Navbar from "../../components/Navbar.component";
import Stopwatch from "../../components/Stopwatch.component";
import "./Home.style.css";
import "../../components/StyleUtils.style.css";

const Home = (props) => {
    const [userData, setUserData] = useState();
    const [todaySessions, setTodaySessions] = useState([]);
    const [totalTime, setTotalTime] = useState();
    const [showMsg, setShowMsg] = useState(false);
    let totalTimeToday = 0;
    let score = 0;
    const client = new HTTPClient();

    // obtener el tiempo total estudiado de hoy, si es que lo hay
    useEffect(() => {
        if (props.todaySessions && props.userData){
            // obtener sesiones de hoy y sumar el tiempo total de hoy
            setTodaySessions(props.todaySessions);
            const totalSeconds = props.todaySessions.reduce((acc, session) => acc + session.timeInSeconds, 0);
            setTotalTime(totalSeconds);
            setUserData(props.userData);
            console.log("[HOME] USUARIO:", userData);
        }
    }, [props.todaySessions]);

    const addSession = (timeInSeconds, subject) => {
        let date = moment().format('L');
        const newSession = {subject, date, timeInSeconds};
        console.log(newSession);
        client.createSession(newSession)
            .then((res) => { 
                addToDOM(timeInSeconds, newSession);
                console.log("SESION AGREGADA", res);
            })
            .catch((err) => {console.log("error", err)});
        addScore(timeInSeconds, subject);
        
        // el mensaje desaparece en 3 seg
        setTimeout(() => {
            setShowMsg(false);
        }, 3000);
    }

    const addToDOM = (timeInSeconds, newSession) => {
        // añadir tiempo y sesion
        setTotalTime(totalTime + timeInSeconds);
        setTodaySessions([...todaySessions, newSession]);
    }

    const addScore = (time, subject) => {
        // 1 hora de estudio = 100 puntos 
        score = Math.floor((100/3600) * time);
        setShowMsg(true);
        let copySubjects = { ...userData.subjects };
        // obtener puntaje anterior, luego sumarlo
        let prevScore = copySubjects[subject];
        copySubjects = {
            ...userData.subjects,
            [subject] : prevScore + score
        }
        console.log("UPDATED SCORE:", copySubjects);
        
        client.editUser({ ...userData, subjects: copySubjects })
            .then((res) => console.log("ajustes guardados", res))
            .catch((err) => console.log(err));
        
    }

    const convertTime = (timeInSeconds) => {
        let hours = Math.floor(timeInSeconds /  3600);
        let minutes = Math.floor((timeInSeconds % 3600) / 60);
        
        // Ensure that single-digit minutes are formatted with leading zero
        let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        
        // Ensure that single-digit hours are formatted with leading zero if there are minutes
        let formattedHours = hours > 0 ? (hours < 10 ? `0${hours}` : hours) : '00';
        
        // Return formatted time as a string
        return `${formattedHours}:${formattedMinutes}`; 
    }

    return (
        <div className="wrapper">
            <Navbar title1="ORGANIZADOR" link1="/resources" title2="ESTADISTICAS" link2="/stats" title3="AJUSTES" link3="/settings" />
            <div className="content">
                <div className="side-bar">
                    <h2>Hoy has estudiado {convertTime(totalTime)} </h2>
                    <div className="subject-box">
                        <h3>Sesiones</h3>
                        <div className="display-session">
                            {
                                todaySessions?.map((session, index) => (
                                    <p style={{color : "black"}}>{session.subject} - {convertTime(session.timeInSeconds)}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="main-content">
                    {props.loading ? <p>Loading...</p> : 
                    <Stopwatch subjects={props.subjects} addSession={addSession}/>}
                     {showMsg && <p>Bien hecho! Has ganado {score} puntos</p>}
                </div>
            </div>
        </div>
    )

}

export default Home;
