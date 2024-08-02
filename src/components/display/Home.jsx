import React, {useState, useEffect} from "react";
import Lift from "./Lift.jsx"
import "../../styles/Home.css"
import axios from "axios";

function Home(){
    const [lifts, setLifts] = useState([]);

    useEffect(() => {
        getLifts();
    }, [])

    async function getLifts(){
        try{
            const result = await axios.get('http://localhost:4000/get-lifts')
            console.log(result.data);
            setLifts(result.data);
        }catch(error){
            console.log("Error fetching the lifts", error);
        }
    }

    return(
        <div className="main_container">
            <h1>Lifts</h1>
            <div className="lifts_container">
                {lifts.map((log) => {
                    return(
                        <Lift id={log.id} key={log.id}title={log.title} date={log.logged_at} />
                    )
                })}
            </div>
        </div>
    )
}

export default Home;