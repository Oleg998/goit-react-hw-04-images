import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Moal.module.css"

const modalRoot=document.getElementById("modal-root")



const Modal =({close , children}) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget||code==="Escape") {
      close();
    }
  };

  useEffect(()=>{
    document.addEventListener("keydown" , closeModal);
    return ()=>document.removeEventListener('keydown',closeModal);
  })


 
  
  
    return createPortal(
      <div onClick={closeModal} className={css.overlay}>
        <div className={css.modal}>
          <span onClick={close} className={css.close}>
            X
          </span>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }




export default Modal




