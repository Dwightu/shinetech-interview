import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const [people, setPeople] = useState([])

    useEffect(() => {
        fetchPeople()
    }, [people])

    //Fetch People using Mock Backend: https://www.npmjs.com/package/json-server
    const fetchPeople = async () => {
        const response = await axios({method:'get',url:`http://localhost:3000/people`})
        const data = await response.data;
        setPeople(data)
    }

    const updatePeople = (id, payload) => {
        axios({
            method: 'put',
            url:`http://localhost:3000/people/${id}`,
            data:payload
        }).then(()=>{
            alert('successful')
        });    
    }

    const deletePeople=async(id,name)=>{
        if (window.confirm(`Are you sure you want to delete the name called ${name} ?`)) {
            axios({
                method: 'delete',
                url:`http://localhost:3000/people/${id}`,
            }).then(()=>{
                alert('successful')
            });
        }
    }

    const addPeople=(payload)=>{
        // Send a POST request
        axios({
            method: 'post',
            url:`http://localhost:3000/people`,
            data: payload
        }).then(()=>{
            alert('successful')
        });
    }


    const findById=(id)=>{
        return people.find(person => person.id === id) || {name:"未填写"};
    }


    return <DataContext.Provider value={{
        people,deletePeople,findById,addPeople,updatePeople
    }}>{children}</DataContext.Provider>
}




export default DataContext