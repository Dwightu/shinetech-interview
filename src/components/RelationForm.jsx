import React from 'react'
import { useState } from 'react';
import DataContext from '../context/DataContext';
import { useContext } from 'react';

function RelationForm(props) {
    const [inputs, setInputs] = useState({});
    const [relation,setRelation]=useState();
    const {findById,findRelation}=useContext(DataContext);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputs.id1=Number(inputs.id1);
    inputs.id2=Number(inputs.id2);
    alert(`${findById(inputs.id1).name}是${findById(inputs.id2).name}的${findRelation(inputs)}`)
  }

  
  return (
    <div>
        <br />
        <p className='Header'>查找关系</p>
        <form onSubmit={handleSubmit}>     
            <br />
            <label className='formLine'>ID1:
                <input 
                    type="text" 
                    name="id1" 
                    value={inputs.id1 || ""} 
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>ID2:
                <input 
                    type="text" 
                    name="id2" 
                    value={inputs.id2 || ""} 
                    onChange={handleChange}
                />
            </label>
            <br />
            <input type="submit" />
        </form>
    </div>
  )
}

export default RelationForm