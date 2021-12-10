import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_BACKEND_PATH } from '../../App'
import './DeleteCommentButton.css'

function DeleteCommentButton({ id, commentId, setRatingUpdated }) {
    const tokenData = useSelector(state => state && state.user)

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

    const handleDelete = () => {
        fetch(DEFAULT_BACKEND_PATH + 'trainers/comments/' + commentId, {
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

    if (!userId || userId != id) {
        return null
    }

    return (
        <>
            <button type="button" class="btn btn-danger push-button-left" onClick={() => handleDelete()}>Delete</button>
        </>
    )
}

export default DeleteCommentButton
