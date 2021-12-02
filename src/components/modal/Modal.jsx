import React from "react";
import LoginModal from "./LoginModal";
import "./Modal.css";

export default function Modal(props) {
  const toggleModal = () => {
    props.setLoginModal(!props.loginModal);
  };

  if(props.loginModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {props.loginModal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Please fill out form</h2>
            {props.loginModal && <LoginModal/>}
            <button className="close-modal" onClick={toggleModal}>
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}