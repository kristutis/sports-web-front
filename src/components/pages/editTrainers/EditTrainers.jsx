import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DEFAULT_BACKEND_PATH } from '../../../App'
import './EditTrainers.css'

function EditTrainers() {
    const tokenData = useSelector(state => state && state.user)

    const [isAdmin, setIsAdmin] = useState(false)
    const [trainers, setTrainers] = useState(null)
    const [trainerDeleted, setTrainerDeleted] = useState(false)

    const handleDelete = (id) => {
        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
            },
        })
            .then(response => {
                if (response.status == 404) {
                    alert('Trainer not found!')
                    return
                }
                if (response.status == 204) {
                    alert('Trainer deleted!')
                    setTrainerDeleted(!trainerDeleted)
                    return
                }
                alert(response.status)
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        if (!tokenData) {
            return
        }

        fetch(DEFAULT_BACKEND_PATH + 'users/details', {
            method: 'GET',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(res => {
                setIsAdmin(res.role == 255)
            })
            .catch(e => console.log(e))

        fetch(DEFAULT_BACKEND_PATH + 'trainers')
            .then(response => response.json())
            .then(trainerData => {
                setTrainers(trainerData)
            })
            .catch(e => console.log(e))
    }, [trainerDeleted])

    if (!isAdmin) {
        return (
            <p>You do not have permission to view this page</p>
        )
    }

    return (
        <>
            <table class="table table-dark table-margin">
                <thead class="thead">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Description</th>
                        <th scope="col">Moto</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {!!trainers && trainers.map((trainer) => {
                        return (
                            <TrainerRow trainer={trainer} handleDelete={handleDelete} />
                        )
                    })}
                </tbody>
            </table>
            <Link to='/create-trainer'>
                <button type="button" class="btn btn-success btn-lg col-12">Create New Trainer</button>
            </Link>
        </>
    )
}

function TrainerRow({ trainer, handleDelete }) {
    const route = '/edit-trainer/' + trainer.id
    return (
        <tr>
            <th scope="row">{trainer.id}</th>
            <td>{trainer.name}</td>
            <td>{trainer.surname}</td>
            <td>{trainer.desription}</td>
            <td>{trainer.moto}</td>
            <td>{trainer.price}</td>
            <td>
                <Link to={route}>
                    <button type="button" class="btn btn-outline-warning">EDIT</button>
                </Link>
                <button type="button" class="btn btn-outline-danger" onClick={() => handleDelete(trainer.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default EditTrainers
