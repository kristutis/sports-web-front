import React from 'react'
import './LoginModal.css'

function LoginModal() {
    return (
        <>
            <div class="login">
                <h1>Login to Gym App</h1>
                    <form method="post" action="">
                        <p><input type="text" name="login" value="" placeholder="Email"/></p>
                        <p><input type="password" name="password" value="" placeholder="Password"/></p>
                        <p class="remember_me">
                        <label>
                            <input type="checkbox" name="remember_me" id="remember_me"/>
                            Remember me on this computer
                        </label>
                        </p>
                        <p class="submit"><input type="submit" name="commit" value="Login"/></p>
                    </form>
            </div>
        </>
    )
}

export default LoginModal
