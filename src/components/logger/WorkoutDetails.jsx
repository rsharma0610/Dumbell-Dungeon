import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "../../styles/WorkoutDetails.css"
import axios from "axios";


function WorkoutDetails(props){
    
    const { id } = useParams();
    console.log(id)
    const [workoutDetails, setWorkoutDetails] = useState({
        title: "",
        lift: "",
        protein: "",
        notes: ""
    })

    useEffect(() => {
        if(props.clicked){
            async function getLiftById(){
                try{
                    const result = await axios.get(`http://localhost:4000/get-lift/${id}`)
                    //const [title, lift, protein, note] = result.data
                    //console.log(title, lift, protein, note);
                    console.log(result.data);
                    setWorkoutDetails(() => {
                        return{
                            title: result.data.title,
                            lift: result.data.lift,
                            protein: result.data.protein,
                            notes: result.data.note
                        }
                    });
                }catch(error){
                    console.log("Error communicating with the express server", error);
                }
            }
            getLiftById();
        }
    },[])

    function handleInputChange(event){
        const {name, value} = event.target;
        setWorkoutDetails((prevWorkoutDetails) => {
            return {
                ...prevWorkoutDetails,
                [name]: value
            }
        })
    }

    async function handleSubmit(){
        const {title, lift, protein, notes} = workoutDetails;
        try{
            await axios.post('http://localhost:4000/submit-lift', {
                title,
                lift,
                protein,
                notes
            });
        
        }catch(err){
            console.log("There was an error submitting your workout");
        }
        
        setWorkoutDetails(() => {
            console.log("Inside reseting the inputs");
            return{
                title: "",
                lift: "",
                protein: "",
                notes: ""
            }
        })
    }
    return(
        <div className="details_container">
            <h1>Workout Logger</h1>
            <label>Workout Name: </label>
            <input onChange={handleInputChange} name="title" value={workoutDetails.title} placeholder="Title"></input>
            <label>Lift Summary: </label>
            <textarea onChange={handleInputChange} name="lift" value={workoutDetails.lift} rows="15"></textarea>
            <label>Daily Protein Tracker: </label>
            <textarea onChange={handleInputChange} name="protein" value={workoutDetails.protein} rows="5"></textarea>
            <label>Additional Notes: </label>
            <textarea onChange={handleInputChange} name="notes" value={workoutDetails.notes} rows="5"></textarea>
            <button onClick={handleSubmit} type="button">Submit</button>

        </div>
    )
}

export default WorkoutDetails;