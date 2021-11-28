import React, { useState, useEffect } from 'react'
import FrontDoorCardsContainer from '../../../frontDoorCards/FrontDoorCardsContainer'
import FrontDoorVideo from '../../frontDoorVideo/FrontDoorVideo'

export default function Home() {
    const [trainers, setTrainers] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/trainers')
            .then(response => response.json())
            .then(trainers => setTrainers(trainers))
            .catch(e => console.log(e))
    }, [])

    return (
        <div>
            <FrontDoorVideo/>
            <FrontDoorCardsContainer/>
            {trainers.map(trainer => {
                return <h1>{trainer.moto}</h1>
            })}
        </div>
    )
}
