import React, {useState} from 'react'
import { DEFAULT_BACKEND_PATH } from '../../App';
import { login } from '../../state/actions/userActions';
import store from '../../state/state';
import './LoginModal.css'

function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginClicked = (e) => {
        e.preventDefault()
        if (!email) {
            alert("Email field must not be empty!");
            return;
        }
        if (!password) {
            alert("Password field must not be empty!");
            return;
        }

        fetch(DEFAULT_BACKEND_PATH + 'users/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        )
            .then(res => res.json())
            .then(a => {
                console.log(a)
                if (a.error) {
                    alert(a.error);
                } else {
                    console.log(a)
                    store.dispatch(login(a))
                    alert('Successfully logged in!');
                    window.location.reload()
                }
            })
            .catch(e => console.log(e));
    }

    return (
        <>
            <div className="login-modal-form">
                <h1>Login to Gym App</h1>
                    <form >
                        <p><input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/></p>
                        <p><input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/></p>
                        <p className="remember_me">
                        <label>
                            <input type="checkbox" name="remember_me" id="remember_me"/>
                            Remember me on this computer
                        </label>
                        </p>
                        <p className="submit-modal-form"><input type="submit" value="Login" onClick={(e) => loginClicked(e)}/></p>
                    </form>
            </div>
        </>
    )
}

export default LoginModal
