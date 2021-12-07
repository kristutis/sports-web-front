    import React, { useState, useEffect } from 'react'
    import { useParams } from "react-router-dom"
    import { useSelector } from 'react-redux'
    import store from '../../../state/state'
    import { DEFAULT_BACKEND_PATH } from '../../../App';

    function TrainerDetails() {
        const params = useParams();
        const trainerId = params.id

        const isLoggedIn = useSelector(state => !!state && !!state.user)

        const [newRating, setNewRating] = useState(0)
        const [trainer, setTrainer] = useState(null)
        const [ratings, setRatings] = useState(null)
        const [ratingAverage, setratingAverage] = useState(null)
        const [comments, setComments] = useState(null)

        const postComment = () => {
            if (!newRating) {
                alert('Please select a rating!')
            }
            console.log(newRating)
        }

        useEffect(() => {
            fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId)
                .then(response => response.json())
                .then(trainerData => {
                    setTrainer(trainerData)
                })
                .catch(e => console.log(e))

            fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId + '/comments')
                .then(response => response.json())
                .then(commentsArray => {
                    setComments(commentsArray)
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

        if (ratingAverage) {
            trainer.ratingAverage = ratingAverage
        }

        return (
            <>
                {!!trainer && <TrainerInfo props={trainer}/>}   
                <br></br>
                {!!comments && !!comments.length ? <CommentsTable props={comments}/> : <NoCommentsSection/>}
                <br></br>
                {isLoggedIn && <RateModule setNewRating={setNewRating} postComment={postComment}/>}
            </>
        )
    }

    function TrainerInfo({props}) {
        return (
            <div class="row justify-content-center">
                <div class="col-auto">
                    <table class="table table-responsive">
                        <thead  class='justify-content-cente'>
                            <tr>
                                <th scope="col">Trainer information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{props.name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Surname</th>
                                <td>{props.surname}</td>
                            </tr>
                            <tr>
                                <th scope="row">Moto</th>
                                <td>{props.moto}</td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td>{props.description}</td>
                            </tr>
                            <tr>
                                <th scope="row">Price</th>
                                <td>{props.price + '$'}</td>
                            </tr>
                            {props.ratingAverage && (
                                <tr>
                                    <th scope="row">Rating</th>
                                    <td>{props.ratingAverage}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    function CommentsTable({props}) {
        return (
            <div class="row justify-content-center">
                <div class="col-auto">
                    <table class="table table-responsive">
                        <thead  class='justify-content-cente'>
                            <tr>
                                <th scope="col">Trainer comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">DateTime</th>
                                <th scope="row">Comment</th>
                            </tr>
                            {props.map(comment => {
                                return (
                                    <>
                                        <tr>
                                            <td>{comment.date}</td>
                                            <td>{comment.comment}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    function NoCommentsSection() {
        return (
            <>
                <p class='d-flex justify-content-center'>
                    Trainer Does not have any comments.
                </p>
                <p class='d-flex justify-content-center'>
                    BE FIRST!
                </p>
            </>
        )
    }

    function RateModule({setNewRating, postComment}) {
        return (
            <div class='d-flex justify-content-center'>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onClick={(e) => setNewRating(1)}/>
                    <label class="form-check-label" for="inlineRadio1">1</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={(e) => setNewRating(2)}/>
                    <label class="form-check-label" for="inlineRadio2">2</label>
                </div>
                
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={(e) => setNewRating(3)}/>
                    <label class="form-check-label" for="inlineRadio2">3</label>
                </div>
                
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={(e) => setNewRating(4)}/>
                    <label class="form-check-label" for="inlineRadio2">4</label>
                </div>
            
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={(e) => setNewRating(5)}/>
                    <label class="form-check-label" for="inlineRadio2">5</label>
                </div>

                <div class="form-check form-check-inline">
                    <button type="button" class="btn btn-secondary" onClick={() => postComment()}>Rate!</button>
                </div>
            </div>
        )
    }

    export default TrainerDetails
