import React, {useState} from 'react'
import './LoginModal.css'

function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <div className="login">
                <h1>Login to Gym App</h1>
                    <form >
                        <p><input type="email" placeholder="Email"/></p>
                        <p><input type="password" placeholder="Password"/></p>
                        <p className="remember_me">
                        <label>
                            <input type="checkbox" name="remember_me" id="remember_me"/>
                            Remember me on this computer
                        </label>
                        </p>
                        <p className="submit"><input type="submit" value="Login" onClick={(e) => e.preventDefault()}/></p>
                    </form>
            </div>
        </>
    )
}

export default LoginModal
