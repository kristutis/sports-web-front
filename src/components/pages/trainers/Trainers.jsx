import React, { useState, useEffect } from 'react'
import { DEFAULT_BACKEND_PATH } from '../../../App'
import FrontDoorCardsContainer, { CARDS_PLACEMENT } from '../../frontDoorCards/FrontDoorCardsContainer'
import './Trainers.css'

const trainerPhoto = 'https://images.squarespace-cdn.com/content/v1/534b1517e4b0b2883888bafe/1565890017595-AC8HP5XWLOOHRS1FX0FW/Personal-Trainer-in-Chicago.jpg?format=1500w'
const title = 'Check out our trainers!'

// const cardsData = Array(5).fill(
//     {
//         src: 'https://urec.uark.edu/_resources/images/fitness_wellness/personal-trainer-1-compressor.jpg',
//         text: 'Explore our new deals from only $20',
//         label: '50% off!',
//         path: '/services',
//     }
// )

export default function Trainers() {
    const [trainers, setTrainers] = useState([])

    useEffect(() => {
        fetch(DEFAULT_BACKEND_PATH + 'trainers')
            .then(response => response.json())
            .then(trainers => {
                const trainerData = trainers.map(trainer => {
                    return {
                        src: trainerPhoto,
                        text: trainer.moto,
                        label: trainer.name,
                        path: '/services',
                    }
                })
                setTrainers(trainerData)
            })
            .catch(e => console.log(e))
    }, [])

    console.log(trainers)

    return (
        <>
            <h1 className='default-page-front trainers'>TRAINERS</h1>
            <FrontDoorCardsContainer data={trainers} placement={CARDS_PLACEMENT[1]} title={title}/>
        </>
    )
}
