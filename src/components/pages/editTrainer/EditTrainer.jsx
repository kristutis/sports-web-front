import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { DEFAULT_BACKEND_PATH } from '../../../App';

function EditTrainer(props) {
    const params = useParams();
    const trainerId = params.id

    const tokenData = useSelector(state => state && state.user)

    const [isAdmin, setIsAdmin] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [moto, setMoto] = useState('')

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

        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId, {
            method: 'GET',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(trainerData => {
                setName(trainerData.name)
                setSurname(trainerData.surname)
                setPrice(trainerData.price)
                setDescription(trainerData.description)
                setMoto(trainerData.moto)
            })
            .catch(e => console.log(e))
    }, [])

    const handleUpdate = () => {
        if (!name) {
            alert('Incorrect name!')
            return
        }
        if (!surname) {
            alert('Incorrect surname!')
            return
        }
        if (price <= 0) {
            alert('Incorrect price!')
            return
        }
        if (!description) {
            alert('Incorrect description!')
            return
        }
        if (!moto) {
            alert('Incorrect moto!')
            return
        }

        const newTrainer = {
            name: name,
            surname: surname,
            price: price,
            description: description,
            moto: moto
        }

        fetch(DEFAULT_BACKEND_PATH + 'trainers/' + trainerId, {
            method: 'PUT',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTrainer)
        })
            .then(response => {
                if (response.status == 200) {
                    alert('UPDATED successfully!')
                    props.history.push('/edit-trainers')
                    return
                }
                alert(response.status)
            })
            .catch(e => console.log(e))
    }

    if (!isAdmin) {
        return (
            <p>You do not have permission to view this page</p>
        )
    }

    return (
        <>
            <div class="row justify-content-center">
                <div class="col-auto">
                    <table class="table table-dark create-trainer-table">
                        <thead class="thead">
                            <tr>
                                <th colspan="2">
                                    <h4 class="text-center font-weight-bold">Edit Trainer</h4>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Name</th>
                                <td>
                                    <input class="form-control form-control-sm" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Surname</th>
                                <td>
                                    <input class="form-control form-control-sm" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Price</th>
                                <td>
                                    <input class="form-control form-control-sm" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td>
                                    <textarea class="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Moto</th>
                                <td>
                                    <input class="form-control form-control-sm" type="text" value={moto} onChange={(e) => setMoto(e.target.value)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-auto">
                    <button type="button" class="btn btn-success" onClick={() => handleUpdate()}>UPDATE!</button>
                </div>
            </div>
        </>
    )
}

export default EditTrainer
