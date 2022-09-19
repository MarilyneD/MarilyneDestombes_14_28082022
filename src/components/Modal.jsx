import React, { useCallback, useEffect, useRef, useState } from 'react';


const Modal = ({ modalVisible, mainTexT, childrenText }) => {
  const [isActive, setIsActive] = useState(modalVisible);
  const ref = useRef(null);

  const handleCloseModal = async (e) => {
    e.preventDefault();
    setIsActive(false);
    console.log("création employee, isactive ?", isActive);
  };

  useEffect(() => {
    setIsActive(modalVisible);
  }, [modalVisible]);

  

  const handelKeydown = useCallback((e) => {
      if (e.key === 'Escape') return setIsActive(false);console.log("escape pressed");
  }, [setIsActive])

  
  useEffect(() => {
      if (isActive) {
          document.addEventListener('keydown', handelKeydown);
      } else {
          document.removeEventListener('keydown', handelKeydown)
      }
      return () => {
          document.removeEventListener('keydown', handelKeydown)
      }
  }, [isActive, handelKeydown, ref])

  //style={{ display: isActive ? "block" : "none" }}



  return (
    isActive && (
      <div className="modal" ref={ref}>
        <div className="modal-content">
          <div className="close-container">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
          </div>
          <p>{mainTexT}</p>
          <p>{childrenText}</p>
        </div>
      </div>)
   
  );
};

export default Modal;