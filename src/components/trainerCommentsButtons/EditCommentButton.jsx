import React from 'react'

export default function EditCommentButton({ creatorId, commentId, setShowEditModule, userId }) {
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
