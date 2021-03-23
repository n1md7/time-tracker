import React from "react";
import {IconContext} from 'react-icons';
import {FaAsterisk} from 'react-icons/fa';

export default function Required() {
  return (
    <IconContext.Provider value={{color: 'red', size: '0.6em'}}>
      <FaAsterisk title={'required'}/>
    </IconContext.Provider>
  )
}