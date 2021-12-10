import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_BACKEND_PATH } from '../../App'
import './DeleteCommentButton.css'

function DeleteCommentButton({ id, commentId, setRatingUpdated, userId }) {
    const tokenData = useSelector(state => state && state.user)

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
