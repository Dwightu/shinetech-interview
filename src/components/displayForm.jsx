import { useState } from 'react';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

export default function MyForm(props) {
  
  const {addPeople,updatePeople}=useContext(DataContext);


  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputs.father_id=Number(inputs.father_id)
    inputs.monther_id=Number(inputs.monther_id)
    inputs.partner_id=Number(inputs.partner_id)
    if(props.showId){
      updatePeople(inputs.id,inputs);
    }else{
      addPeople(inputs);
    }
  }

  return (
    <>
        <br />
        <br />
        {props.showId ? "请输入想更改的成员信息":"请输入想添加的成员信息"}    
        <form onSubmit={handleSubmit}>
            {props.showId ? <label>                    
              <br />
                    ID:
                    <input 
                        type="text" 
                        name="id" 
                        value={inputs.id || ""} 
                        onChange={handleChange}
                    />
            </label> : null}
            
            <br />
            <label>姓名:
                <input 
                    type="text" 
                    name="name" 
                    value={inputs.name || ""} 
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>性别:
                    <input 
                    type="text" 
                    name="sex" 
                    value={inputs.sex || ""} 
                    onChange={handleChange}
                    />
                </label>
                <br />        
            <label>生日:
                <input 
                type="text" 
                name="birthday" 
                value={inputs.birthday || ""} 
                onChange={handleChange}
                />
            </label>
            <br />
            <label>母亲ID:
                <input 
                type="number" 
                name="monther_id" 
                value={inputs.monther_id || ""} 
                onChange={handleChange}
                />
            </label>
            <br />
            <label>父亲ID:
                <input 
                type="number" 
                name="father_id" 
                value={inputs.father_id || ""} 
                onChange={handleChange}
                />
            </label>
            <br />
            <label>配偶ID:
                <input 
                type="number" 
                name="partner_id" 
                value={inputs.partner_id || ""} 
                onChange={handleChange}
                />
            </label>
            <br />
            <input type="submit" />
        </form>
    </>
  )
}