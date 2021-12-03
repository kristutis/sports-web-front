import React from 'react'
import { useParams } from "react-router-dom";

function TrainerDetails() {
    const params = useParams();

    return (
        <div>
            <p>hello</p>
            <p>{params.id}</p>
        </div>
    )
}

export default TrainerDetails
