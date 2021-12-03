import React from 'react'
import './LoginModal.css'

function LoginModal() {
    return (
        <>
            <div className="login">
                <h1>Login to Gym App</h1>
                    <form method="post" action="">
                        <p><input type="email" name="login" placeholder="Email"/></p>
                        <p><input type="password" name="password"  placeholder="Password"/></p>
                        <p className="remember_me">
                        <label>
                            <input type="checkbox" name="remember_me" id="remember_me"/>
                            Remember me on this computer
                        </label>
                        </p>
                        <p className="submit"><input type="submit" name="commit" value="Login"/></p>
                    </form>
            </div>
        </>
    )
}

export default LoginModal
