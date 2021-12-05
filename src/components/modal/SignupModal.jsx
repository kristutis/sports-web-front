import React, {useState} from 'react'
import './LoginModal.css'

function SignupModal() {
    const [termsAndConditions, setTermsAndConditions] = useState(false)

    // const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    function registerUser() {
        if (name === '') {
            alert("Name field must not be empty!");
            return;
        }
        if (surname === '') {
            alert("Surname field must not be empty!");
            return;
        }
        if (email === '') {
            alert("Email field must not be empty!");
            return;
        }
        if (password === '') {
            alert("Password field must not be empty!");
            return;
        }
        const user = {
            email: email,
            password: password,
            name: name,
            surname: surname,
        }
        // console.log(user);
        // fetch("https://sportsconnectedback.azurewebsites.net/api/users/add",
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(user)
        //     }
        // )
        //     .then(res => res.json())
        //     .then(a => {
        //         if (a.error === false) {
        //             alert(a.message);
        //             props.onModalClick();
        //         } else {
        //             alert(a.message);
        //             dispatch(setError(a.message));
        //             props.onAlertClick();
        //         }
        //     });
    }

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
                    <p className="submit"><input type="submit" name="commit" value="Register" onClick={(e) => e.preventDefault()}/></p>
                </form>
        </div>
    )
}

export default SignupModal
