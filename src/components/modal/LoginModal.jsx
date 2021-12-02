import React from 'react'
import './LoginModal.css'

function LoginModal() {
    return (
        <>
            <div class="login-modal-form login-modal-body">
                <div class="login-modal-title">Welcome</div>
                <div class="login-modal-subtitle">Let's create your account!</div>
                <div class="login-modal-input-container ic1">
                    <input id="firstname" class="login-modal-input" type="text" placeholder=" " />
                    <div class="login-modal-cut"></div>
                    <label for="firstname" class="login-modal-placeholder">First name</label>
                </div>
                <div class="login-modal-input-container ic2">
                    <input id="lastname" class="login-modal-input" type="text" placeholder=" " />
                    <div class="login-modal-cut"></div>
                    <label for="lastname" class="login-modal-placeholder">Last name</label>
                </div>
                <div class="login-modal-input-container ic2">
                    <input id="email" class="login-modal-input" type="text" placeholder=" " />
                    <div class="login-modal-cut cut-short"></div>
                    <label for="email" class="login-modal-placeholder">Email</label>
                </div>
                <button type="text" class="login-modal-submit">submit</button>
            </div>
        </>
    )
}

export default LoginModal
