import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { DEFAULT_BACKEND_PATH } from '../../../App';
import DeleteCommentButton from '../../trainerCommentsButtons/DeleteCommentButton';
import './TrainerDetails.css'
import EditCommentButton from '../../trainerCommentsButtons/EditCommentButton';

function TrainerDetails() {
    const params = useParams();
    const trainerId = params.id

    const tokenData = useSelector(state => state && state.user)
    const isLoggedIn = !!tokenData

    const [newComment, setNewComment] = useState(null)
    const [ratingUpdated, setRatingUpdated] = useState(false)
    const [newRating, setNewRating] = useState(0)
    const [trainer, setTrainer] = useState(null)
    const [ratings, setRatings] = useState(null)
    const [ratingAverage, setratingAverage] = useState(null)
    const [comments, setComments] = useState(null)
    const [showEditModule, setShowEditModule] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (!tokenData) {
            return
        }

        fetch(DEFAULT_BACKEND_PATH + 'users/details', {
            method: 'GET',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
            },
        })
            .then(response => {
                if (response.status == 200) {
                    return response.json()
                }
                alert(response.status)
            })
            .then(userData => {
                setUserId(userData.id)
            })
            .catch(e => console.log(e))
    }, [])

    const handleNewComment = () => {
        if (!newComment) {
            alert('Please fill the comment form!')
            return
        }

        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId + '/comments', {
            method: 'POST',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'comment': newComment
            })
        })
            .catch(e => console.log(e))

        alert('New comment posted!')
        setRatingUpdated(!ratingUpdated)
        setNewComment('')
    }

    const postComment = () => {
        if (!newRating) {
            alert('Please select a rating!')
            return
        }

        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId + '/ratings', {
            method: 'POST',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'rating': newRating
            })
        })
            .catch(e => console.log(e))

        alert('Trainer rating updated!')
        setRatingUpdated(!ratingUpdated)
    }

    const ratedAlready = () => {
        if (!ratings || !userId) {
            return false
        }
        let rated = false
        ratings.forEach(rating => {
            if (rating.fk_user_id == userId) {
                rated = true
                return
            }
        })
        return rated
    }

    useEffect(() => {
        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId)
            .then(response => response.json())
            .then(trainerData => {
                trainerData.ratingAverage = 0
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
                setRatings(ratingsArray)
            })
            .catch(e => console.log(e))

        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId + '/ratings/average')
            .then(response => response.json())
            .then(average =>
                setratingAverage(average)
            )
            .catch(e => console.log(e))
    }, [ratingUpdated])

    if (ratingAverage && trainer) {
        trainer.ratingAverage = ratingAverage
    }

    return (
        <>
            {!!trainer && <TrainerInfo props={trainer} />}
            <br></br>
            {isLoggedIn && <RateModule setNewRating={setNewRating} postComment={postComment} trainerId={ratedAlready() ? trainerId : null} setRatingUpdated={setRatingUpdated}/>}
            <br></br>
            {!!comments && !!comments.length ? <CommentsTable props={comments} setRatingUpdated={setRatingUpdated} setShowEditModule={setShowEditModule} userId={userId} /> : <NoCommentsSection />}
            <br></br>
            {isLoggedIn && <NewCommentModule setNewComment={setNewComment} handleNewComment={handleNewComment} commentAreaValue={newComment} />}
            <br></br>
            {!!showEditModule && <EditCommentModule commentId={showEditModule} setShowEditModule={setShowEditModule} setRatingUpdated={setRatingUpdated} />}
        </>
    )
}

function TrainerInfo({ props }) {
    return (
        <div class="row justify-content-center no-gutters">
            <div class="col-auto">
                <table class="table table-responsive">
                    <thead class='justify-content-cente'>
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

function CommentsTable({ props, setRatingUpdated, setShowEditModule, userId }) {
    return (
        <div class="row justify-content-center no-gutters">
            <div class="col-auto">
                <table class="table table-responsive">
                    <thead class='justify-content-cente'>
                        <tr>
                            <th scope="col">Trainer comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Date</th>
                            <th scope="row">Comment</th>
                        </tr>
                        {props.map(comment => {
                            const time = comment.date.split('T')
                            const secondTimePart = time[1].split('.000Z')
                            const date = time[0] + ' ' + secondTimePart[0]
                            return (
                                <>
                                    <tr>
                                        <td>{date}</td>
                                        <td className='flex-comments'>
                                            {comment.comment}
                                            <div>
                                                <EditCommentButton creatorId={comment.fk_user_id} commentId={comment.id} setShowEditModule={setShowEditModule} userId={userId} />
                                                <DeleteCommentButton id={comment.fk_user_id} commentId={comment.id} setRatingUpdated={setRatingUpdated} userId={userId} />
                                            </div>
                                        </td>
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

function RateModule({ setNewRating, postComment, trainerId, setRatingUpdated }) {
    const tokenData = useSelector(state => state && state.user)

    const handleDelete = () => {
        if (!tokenData) {
            return
        }

        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId + '/ratings', {
            method: 'DELETE',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
            },
        })
            .then(response => {
                if (response.status == 204) {
                    alert('Deleted!')
                    setRatingUpdated((correntVal) => !correntVal)
                    return
                }
                alert(response.status)
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <div class='d-flex justify-content-center'>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onClick={(e) => setNewRating(1)} />
                    <label class="form-check-label" for="inlineRadio1">1</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={(e) => setNewRating(2)} />
                    <label class="form-check-label" for="inlineRadio2">2</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={(e) => setNewRating(3)} />
                    <label class="form-check-label" for="inlineRadio2">3</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={(e) => setNewRating(4)} />
                    <label class="form-check-label" for="inlineRadio2">4</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={(e) => setNewRating(5)} />
                    <label class="form-check-label" for="inlineRadio2">5</label>
                </div>

                <div class="form-check form-check-inline">
                    <button type="button" class="btn btn-secondary" onClick={() => postComment()}>Rate!</button>
                </div>
            </div>
            {!!trainerId && <div class='d-flex justify-content-center'>
                <button type="button" class="btn btn-danger" onClick={() => handleDelete()}>Delete My Rating</button>
            </div>}
        </>
    )
}

function NewCommentModule({ setNewComment, handleNewComment, commentAreaValue }) {
    return (
        <>
            <p class='d-flex justify-content-center'>
                Leave your opinion!
            </p>
            <div class='d-flex justify-content-center'>
                <div class="form-check form-check-inline">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" value={commentAreaValue} onChange={(e) => setNewComment(e.target.value)}></textarea>
                    <button type="button" class="btn btn-secondary" onClick={() => handleNewComment()}>Post Comment!</button>
                </div>
            </div>
        </>
    )
}

function EditCommentModule({ commentId, setShowEditModule, setRatingUpdated }) {
    const tokenData = useSelector(state => state && state.user)
    const [updatedComment, setUpdatedComment] = useState('')

    const handleEditComment = () => {
        if (!tokenData) {
            alert('Unauthorized')
            return
        }
        if (!updatedComment) {
            alert('Comment cannot be empty!')
            return
        }

        fetch(DEFAULT_BACKEND_PATH + 'trainers/comments/' + commentId, {
            method: 'PUT',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'comment': updatedComment
            })
        })
            .then(response => {
                if (response.status == 200) {
                    alert('Updated!')
                    setShowEditModule(null)
                    setRatingUpdated((currentValue) => !currentValue)
                    return
                }
                alert(response.status)
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <h3 class='d-flex justify-content-center'>
                EDIT COMMENT
            </h3>
            <div class='d-flex justify-content-center'>
                <div class="form-check form-check-inline">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder='Write new comment here...' onChange={(e) => setUpdatedComment(e.target.value)}></textarea>
                    <button type="button" class="btn btn-secondary" onClick={() => handleEditComment()}>EDIT!</button>
                </div>
            </div>
        </>
    )
}

export default TrainerDetails
