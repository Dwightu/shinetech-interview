import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import Formlist from './Formlist';

function Form() {
  const {people}=useContext(DataContext);

  return (
    <div className='Form'>
      {
        people.map(item=>(<Formlist/>))
      }
    </div>
  )
}

export default Form