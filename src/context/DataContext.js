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


    return <DataContext.Provider value={{
        people
    }}>{children}</DataContext.Provider>
}




export default DataContext