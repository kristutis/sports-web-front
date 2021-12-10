import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_BACKEND_PATH } from '../../App'

export default function EditCommentButton({ creatorId, commentId, setShowEditModule }) {
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

    if (!userId || creatorId != userId) {
        return null
    }

    const handleEdit = () => {
        setShowEditModule(commentId)
    }

    return (
        <>
            <button type="button" class="btn btn-warning push-button-left" onClick={() => handleEdit()}>Edit</button>
        </>
    )
}
