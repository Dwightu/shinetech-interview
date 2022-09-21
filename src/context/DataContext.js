import { createContext, useState, useEffect } from "react";

const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const [people, setPeople] = useState([])

    useEffect(() => {
        fetchPeople()
    }, [])

    //Fetch feedback
    const fetchPeople = async () => {
        const response = await fetch(`http://localhost:3000/people`)
        const data = await response.json()
        setPeople(data)
    }

    const deletePeople=async(id)=>{
        if (window.confirm(`Are you sure you want to delete the name called ${id} ?`)) {
            setPeople(people.filter((item) => item.id !== id))
        }
    }


    return <DataContext.Provider value={{
        people,deletePeople
    }}>{children}</DataContext.Provider>
}




export default DataContext