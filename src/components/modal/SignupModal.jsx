import React, {useState} from 'react'
import './LoginModal.css'

function SignupModal() {
    const [termsAndConditions, setTermsAndConditions] = useState(false)

    return (
        <div className="login">
            <h1>Register to Gym App</h1>
                <form method="post" action="">
                    <p><input type="text" placeholder="Name"/></p>
                    <p><input type="text" name="login" placeholder="Surname"/></p>
                    <p><input type="email" name="login" placeholder="Email"/></p>
                    <p><input type="password" name="password"  placeholder="Password"/></p>
                    <p className="remember_me">
                    </p>
                    <p className="remember_me">
                        <label>
                            <input type="checkbox" name="remember_me" id="remember_me" onClick={() => setTermsAndConditions(!termsAndConditions)}/>
                            I aggre to the Gym's term & conditions
                        </label>
                    </p>
                    <p className="submit"><input type="submit" name="commit" value="Register"/></p>
                </form>
        </div>
    )
}

export default SignupModal
