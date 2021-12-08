import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_BACKEND_PATH } from '../../../App'

function Profile() {
    const tokenData = useSelector(state => state && state.user)

    const [user, setUser] = useState(null)
    const [userUpdated, setUserUpdated] = useState(false)

    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

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
                setUser(userData)
                setName(userData.name)
                setSurname(userData.surname)
                setEmail(userData.email)
                setPassword('')
                setRepeatPassword('')
            })
            .catch(e => console.log(e))
    }, [userUpdated])

    const handleUpdate = () => {
        if (!name) {
            alert('Name cannot be empty!')
            return
        }
        if (!surname) {
            alert('Surname cannot be empty!')
            return
        }
        if (!email) {
            alert('Email cannot be empty!')
            return
        }
        if ((password || repeatPassword) && password != repeatPassword) {
            alert('Passwords must match!')
            return
        }

        const user = {
            name: name,
            surname: surname,
            email: email
        }

        if (password) {
            user.password = password
        }

        fetch(DEFAULT_BACKEND_PATH + 'users', {
            method: 'PUT',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.status == 200) {
                    alert('Updated successfully!')
                    setUserUpdated(!userUpdated)
                    return
                }
                if (response.status == 400) {
                    alert('Email already exists!')
                    console.log(response)
                    return
                }
                alert(response.status)
            })
            .catch(e => console.log(e))
    }


    if (!tokenData) {
        return (
            <p>Login to view this page</p>
        )
    }

    if (!user) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <>
            <div class="row justify-content-center">
                <div class="col-auto">
                    <br></br>
                    {/* <h3>{user.name + ' ' + user.surname}</h3> */}
                    <table class="table table-dark">
                        <thead class="thead">
                            <tr>
                                <th scope="col">USER</th>
                                <th scope="col">DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">NAME</th>
                                <td>
                                    <input class="form-control form-control-sm" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">SURNAME</th>
                                <td>
                                    <input class="form-control form-control-sm" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">EMAIL</th>
                                <td>
                                    <input class="form-control form-control-sm" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">NEW PASSWORD</th>
                                <td>
                                    <input class="form-control form-control-sm" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">REPEAT PASSWORD</th>
                                <td>
                                    <input class="form-control form-control-sm" type="text" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-auto">
                    <button type="button" class="btn btn-dark" onClick={() => handleUpdate()}>UPDATE!</button>
                    <br></br>
                    <br></br>
                </div>
            </div>
        </>
    )
}

export default Profile
