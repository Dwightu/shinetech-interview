import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import Formlist from './Formlist';
import { useState } from 'react';
import UpdateForm from './displayForm';

function Form() {
  const {people}=useContext(DataContext);
  const [displayForm,setDisplayForm]=useState(false);
  const [showId,setShowId]=useState(false);

  return (
    <div className='Form'>
      {
        people.map(item=>(<Formlist key={item.id} item={item}/>))
      }
      <br />
      <button onClick={()=>{setDisplayForm(!displayForm);setShowId(true)}}>我想更改一个成员信息</button> 
      <button onClick={()=>{setDisplayForm(!displayForm);setShowId(false)}}>我想添加一个成员信息</button>
      {displayForm&&<UpdateForm showId={showId}/>}
    </div>
  )
}

export default Form