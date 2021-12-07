import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { DEFAULT_BACKEND_PATH } from '../../../App';

function TrainerDetails() {
    const params = useParams();
    const trainerId = params.id

    const [trainer, setTrainer] = useState(null)
    const [ratings, setRatings] = useState(null)
    const [ratingAverage, setratingAverage] = useState(null)
    const [comments, setComments] = useState(null)

    useEffect(() => {
        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId)
            .then(response => response.json())
            .then(trainer => {
                const trainerData = Object.values(trainer).map(key => {
                    return (
                        <p>{key}</p>
                    )
                })
                setTrainer(trainerData)
            })
            .catch(e => console.log(e))

        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId + '/comments')
            .then(response => response.json())
            .then(commentsArray => {
                const comms = commentsArray.map(comment => {
                    return (
                        <ul>
                            {Object.values(comment).map(value => {
                                return (
                                    <li>{value}</li>
                                )
                            })}
                        </ul>
                    )
                })
                setComments(comms)
            })
            .catch(e => console.log(e))

        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId + '/ratings')
            .then(response => response.json())
            .then(ratingsArray => {
                const comms = ratingsArray.map(rating => {
                    return (
                        <ul>
                            {Object.values(rating).map(value => {
                                return (
                                    <li>{value}</li>
                                )
                            })}
                        </ul>
                    )
                })
                setRatings(comms)
            })
            .catch(e => console.log(e))

        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId + '/ratings/average')
            .then(response => response.json())
            .then(average =>
                setratingAverage(average)
            )
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            {!!trainer && trainer}
            <p>-------------------------------</p>
            {!!comments && comments}
            <p>-------------------------------</p>
            {!!ratings && ratings}
            <p>-------------------------------</p>
            {!!ratingAverage && <p>{ratingAverage}</p>}
        </>
    )
}

export default TrainerDetails
