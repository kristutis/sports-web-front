import React from "react";
import LoginModal from "./LoginModal";
import "./Modal.css";
import SignupModal from "./SignupModal";

export default function Modal(props) {
  const toggleModal = () => {
    props.setLoginModal(false)
    props.setSignupModal(false)
  };

  const modalOpened = props.loginModal || props.signupModal

  if(modalOpened) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {modalOpened && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Please fill out form</h2>
            {props.loginModal && <LoginModal/>}
            {props.signupModal && <SignupModal/>  }
            <button className="close-modal" onClick={toggleModal}>
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}