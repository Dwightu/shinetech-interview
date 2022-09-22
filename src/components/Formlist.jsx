import React, { useEffect } from 'react'
import { useContext } from 'react';
import DataContext from '../context/DataContext';

function Formlist({item}) {
  const {deletePeople,findById}=useContext(DataContext);
  const father_name = findById(item.father_id).name;
  const monther_name=findById(item.monther_id).name;
  const partner_name=findById(item.partner_id).name;

  const content=`${item.id}`+" | "+`${item.name}`+" | "+`${item.sex}`+" | "+`${item.birthday}`
                +``+" | "+ `${father_name}`+" | "+`${monther_name}`+" | "+`${partner_name}`


  return (
    <div>
        {content}
        <button onClick={()=>deletePeople(item.id,item.name)}>Delete</button>
    </div>
  )
}

export default Formlist