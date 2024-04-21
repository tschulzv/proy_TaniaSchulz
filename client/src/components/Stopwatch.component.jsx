import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import "./StyleUtils.style.css";

const Stopwatch = (props) => {
  const subjects = props.subjects; 
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [buttonText, setButtonText] = useState("Iniciar");
  const [isRunning, setIsRunning] = useState(false);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    //isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const handleChange = (e) => {
    setSelectedSubject(e.target.value);
    console.log(selectedSubject);
  }

  const handleBtn = () => {
    // si el cronometro no esta corriendo, iniciar y cambiar texto
    if (!isRunning){
      setButtonText("Pausar");
      start();
    } else { // si esta corriendo, pausar y cambiar el texto
      setButtonText("Iniciar");
      pause();
    }
  }

  const toggleTimer = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
    setIsRunning(!isRunning);
  };

  const endSession = () => {
    setIsRunning(false);
    // guardar tiempo en segundos
    let timeInSeconds = totalSeconds;
    //  resetear y detener
    reset(0, false);
    console.log("TOTAL:", timeInSeconds);
    console.log("ASIGNATURA: ", selectedSubject);
    // pasarle el tiempo en segundos a la Home page
    props.addSession(timeInSeconds, selectedSubject);
  }

  return (
    <>
      <div className="circle-div">
          <div className="circle-content">
              <div className="watch-txt">
                  <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
              </div>
              <select id="subject" onChange={(e) => {handleChange(e)}}>
                  {
                  subjects && subjects.map((subject, i) => (
                      <option value={subject}>{subject}</option>
                  ))}
              </select>
              <button onClick={toggleTimer}>{isRunning ? 'Pausar' : 'Iniciar'}</button>
              {isRunning && <button onClick={endSession} className="btn">Detener</button>}
          </div>
      </div>
    </>
  );
}

export default Stopwatch;
//<button onClick={handleBtn} className="btn">{buttonText}</button>
//<button onClick={pause} className="btn">Pause</button>