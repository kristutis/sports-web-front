import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_BACKEND_PATH } from '../../../App'

function Users() {
    const tokenData = useSelector(state => state && state.user)

    const [isAdmin, setIsAdmin] = useState(false)
    const [users, setUsers] = useState(null)
    const [userDeleted, setUserDeleted] = useState(false)

    const handleDelete = (id) => {
        fetch(DEFAULT_BACKEND_PATH + 'users/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setUserDeleted(!userDeleted)
                if (response.status == 404) {
                    alert('User not found!')
                    return
                }
                if (response.status == 204) {
                    alert('User deleted!')
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

        fetch(DEFAULT_BACKEND_PATH + 'users', {
            method: 'GET',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status == 403) {
                    return
                }
                setIsAdmin(true)
                return response.json()
            })
            .then(users => {
                setUsers(users)
            })
            .catch(e => console.log(e))
    }, [userDeleted])

    if (!isAdmin) {
        return (
            <p>You do not have permission to view this page</p>
        )
    }

    return (
        <>
            <table class="table table-dark">
                <thead class="thead">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Reg date</th>
                        <th scope="col">Modify date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!!users && users.map((user) => {
                        return (
                            <UserRow user={user} handleDelete={handleDelete}/>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

function UserRow({ user, handleDelete }) {
    const userId = user.id
    return (
        <tr>
            <th scope="row">{user.id}</th>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.reg_date.split('T')[0]}</td>
            <td>{user.modify_date.split('T')[0]}</td>
            <td><button type="button" class="btn btn-secondary" onClick={() => handleDelete(userId)}>Delete</button></td>
        </tr>
    )
}

export default Users
