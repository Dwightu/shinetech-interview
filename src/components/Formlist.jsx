import React from 'react'
import { useContext } from 'react';
import DataContext from '../context/DataContext';

function Formlist({item}) {

  const {deletePeople}=useContext(DataContext);


  return (
    <div>
        {JSON.stringify(item)}
        <button>Update</button>
        <button onClick={()=>deletePeople(item.id)}>Delete</button>
    </div>
  )
}

export default Formlist