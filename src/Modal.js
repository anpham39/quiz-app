import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { modalOpen, closeModal, correct, questions } = useGlobalContext();

  return (
    <div className={modalOpen ? "modal-container isOpen" : "modal-container"}>
      <div className="modal-content">
        {correct > 0 ? (
          <div>
            <h2>Congratulation!</h2>
            <p>
              You answered {((correct / questions.length) * 100).toFixed(0)}% of
              questions correctly
            </p>
          </div>
        ) : (
          <div>
            <h2>Oops :(</h2>
            <p>
              You answered {((correct / questions.length) * 100).toFixed(0)}% of
              questions correctly. Give it another try!
            </p>
          </div>
        )}
        <button className="close-btn" onClick={closeModal}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
