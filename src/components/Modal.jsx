import React, { useEffect, useState } from 'react';


const Modal = ({ modalVisible, nbOfEmployeeCreated }) => {
  const [isActive, setIsActive] = useState(false);
  const handleCloseModal = async (e) => {
    setIsActive(false);
    e.preventDefault();
    console.log("création employee, isactive ?", isActive);
  };

  useEffect(() => {
    setIsActive(modalVisible);
  }, [modalVisible, nbOfEmployeeCreated]);

  // console.log(
  //   "property received in Modal component modalVisible",
  //   modalVisible,
  //   "isActive",
  //   isActive
  //);

  return (
    
      <div className="modal" style={{ display: isActive ? "block" : "none" }}>
        <div className="modal-content">
          <div className="close-container">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
          </div>
          <p>Employee Created !</p>
          <p>{nbOfEmployeeCreated} Employees Created this session</p>
        </div>
      </div>
   
  );
};

export default Modal;