import React, {useState} from 'react'
import { DEFAULT_BACKEND_PATH } from '../../App';
import './LoginModal.css'

function SignupModal() {
    const [termsAndConditions, setTermsAndConditions] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');    

    function signupClicked(e) {
        e.preventDefault()
        if (!name) {
            alert("Name field must not be empty!");
            return;
        }
        if (!surname) {
            alert("Surname field must not be empty!");
            return;
        }
        if (!email) {
            alert("Email field must not be empty!");
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            alert("Wrong email address!");
            return;
        }
        if (!password) {
            alert("Password field must not be empty!");
            return;
        }
        if (password.length < 6) {
            alert("Password length must be longer than 6 symbols!");
            return;
        }
        if (!termsAndConditions) {
            alert("You must accept our terms and contitions!");
            return;
        }
        const user = {
            email: email,
            password: password,
            name: name,
            surname: surname,
        }

        fetch(DEFAULT_BACKEND_PATH + 'users/signup', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'POST',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                console.log('asdf')
                if (response.status == 201) {
                    alert('User ' + name + ' created!')
                    window.location.reload()
                    return
                }
                if (response.status == 400) {
                    alert('User already exists!')
                    return
                }
                alert(response.status)  
            })
            .catch(e => console.log(e))
    }

    return (
        <div className="login-modal-form">
            <h1>Register to Gym App</h1>
                <form method="post" action="">
                    <p><input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/></p>
                    <p><input type="text" name="login" placeholder="Surname" onChange={e => setSurname(e.target.value)}/></p>
                    <p><input type="email" name="login" placeholder="Email" onChange={e => setEmail(e.target.value)}/></p>
                    <p><input type="password" name="password"  placeholder="Password" onChange={e => setPassword(e.target.value)}/></p>
                    <p className="remember_me">
                        <label>
                            <input type="checkbox" name="remember_me" id="remember_me" onClick={() => setTermsAndConditions(!termsAndConditions)}/>
                            I aggre to the Gym's term & conditions
                        </label>
                    </p>
                    <p className="submit-modal-form"><input type="submit" name="commit" value="Register" onClick={(e) => signupClicked(e)}/></p>
                </form>
        </div>
    )
}

export default SignupModal
