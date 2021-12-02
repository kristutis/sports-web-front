import React, { useState, useEffect } from 'react'
import './Trainers.css'

export default function Trainers() {
    
    const [trainers, setTrainers] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/trainers')
            .then(response => response.json())
            .then(trainers => setTrainers(trainers))
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <h1 className='default-page-front trainers'>Check out our trainers!</h1>
            
            {trainers.map(trainer => {
                return <h1>{trainer.moto}</h1>
            })}
        </>
    )
}
