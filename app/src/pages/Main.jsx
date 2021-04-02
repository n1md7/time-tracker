import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import {IconContext} from 'react-icons';
import {FaStopCircle, FaPlayCircle} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import {timeFormat, TimeInterval} from "../helpers";
import useFetchProjects from "../hooks/project/useFetchProjects";
import '../styles/main.scss';

export default function Main() {
  const [style, setStyle] = useState({color: 'green', size: '2.4em'});
  const [isTracking, setIsTracking] = useState(false);
  const [time, setTime] = useState(0);
  const [originalTitle, setOriginalTitle] = useState('');
  const [fetchProjects, projects, fetching] = useFetchProjects();

  const isTrackingHandler = () => setIsTracking(!isTracking);

  useEffect(() => {
    setOriginalTitle(document.title || 'Time Track');
    fetchProjects();
  }, [])

  useEffect(() => {
    const defaultStyle = {
      color: 'green',
      size: '2.4em'
    };
    if (isTracking) {
      defaultStyle.color = 'red';
    }
    setStyle(defaultStyle);
  }, [isTracking]);

  useEffect(() => {
    let interval = null;
    if (isTracking) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTracking, time]);

  useEffect(() => {
    if (isTracking) {
      document.title = `${timeFormat(time, TimeInterval.mm_ss)} | ${originalTitle}`;
    } else {
      document.title = originalTitle;
    }
  }, [isTracking, time]);

  return (
    <NavBar>
      <div className="p-3 d-flex justify-content-center align-items-center time-track">
        <div className="input-group ">
          <input type="text"
                 className="form-control rounded-0"
                 placeholder="What are you working on?"/>
          <div className="input-group-append">
            <select disabled={fetching} className="btn btn-outline-secondary dropdown-toggle rounded-0">
              <option value="">{fetching ? 'Loading...' : 'Select project'}</option>
              {
                projects.map((project, key) => (
                  <option key={key} value={project.id}>{project.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="px-3">{
          timeFormat(time, TimeInterval.all) || '00:00:00'
        }</div>
        <button className="btn p-0 rounded-0" onClick={isTrackingHandler}>
          <IconContext.Provider value={style}>
            {
              isTracking ? <FaStopCircle/> : <FaPlayCircle/>
            }
          </IconContext.Provider>
        </button>
        <button className="btn p-0 rounded-0">
          <IconContext.Provider value={{size: '2.0em', color: 'black'}}>
            <MdDelete/>
          </IconContext.Provider>
        </button>
      </div>
    </NavBar>
  );
}