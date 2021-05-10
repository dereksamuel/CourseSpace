import React, { useState } from "react";
import { Overlay, ModalContent } from "./styles";
import { FaTimes } from "react-icons/fa";
import "./styles.css";
import { Button } from "../styles";

export default function Modal({ showMe, setShowMe, children, title, buttons, secondButton, closeFunctionModal }) {
  const closeModal = () => {
    const overlay = document.querySelector("#overlay");
    const modal = document.querySelector("#modal");
    overlay.style = "opacity: 0; transition: 0.5s;";
    modal.style = "opacity: 0; transition: 0.5s;";
    const timeout = setTimeout(() => {
      setShowMe(false);
      clearTimeout(timeout);
    }, 500);
  }
  return (
    <>
      <div>
        {
          showMe && <>
            <Overlay onClick={closeFunctionModal || closeModal} id="overlay">
            </Overlay>
            <ModalContent id="modal">
              <div className="containerClose">
                <div className="closeIcon" onClick={closeFunctionModal || closeModal}><FaTimes></FaTimes></div>
              </div>
              {
                title && <div className="containerTitle">
                  <p>{title}</p>
                </div>
              }
              {children}
              {
                buttons && <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", }}>
                  <div style={{ paddingTop: "1rem", }}>
                    <Button variant="gray" onClick={closeFunctionModal || closeModal} size_f="1rem" padding="0.8rem 1.5rem">Cancelar</Button>
                  </div>
                  <div style={{ paddingTop: "1rem", transition: "1s", }}>{secondButton}</div>
                </div>
              }
            </ModalContent>
          </>
        }
      </div>
    </>
  )
}
