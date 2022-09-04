import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addEmployeeToList } from '../feature/employeesSlice';
import states from '../data/stateList';
import DatePicker from 'react-date-picker';

const CreateEmployee = () => {
      const dispatch = useDispatch();
      const globalStore = useSelector(state => state.employees);
      const regexName = /^[a-zA-Z-\s]+$/;
      const regexNumber = /^([0-9]|[1-9][0-9]|)$/;
      const [firstName, setfirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [department, setDepartment] = useState('');
      const [dateOfBirth, setDateOfBirth] = useState('');
      const [startDate, setStartDate] = useState('');
      const [street, setStreet] = useState('');
      const [city, setCity] = useState('');
      const [state, setState] = useState('');
      const [zipCode, setzipCode] = useState('');
      const [value1, onChange1] = useState(new Date());
      const [value2, onChange2] = useState(new Date());
  

    
  const handleFirstName = async (e) => {
     e.preventDefault();
     let value = e.target.value;
  if (value.trim().length >= 2 && regexName.test(value)) {
    setfirstName(value);
   // formularyData[0].setAttribute("data-error-visible", "false");
  } else {
  //  formularyData[0].setAttribute("data-error-visible", "true");
  }
};

  
  const handleLastName = async (e) => {
     e.preventDefault();
     let value = e.target.value;
     setLastName(value);
  };


  const handleBirthDate = async (e) => {
    e.preventDefault();
    let value = e.target.value;
    setDateOfBirth(value);
 };


 const handleStartDate = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setStartDate(value);
};

const handleStreet = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setStreet(value);
};


const handleCity = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setCity(value);
};



const handleState = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setState(value);
};


const handleZipCode = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setzipCode(value);
};


const handleDepartment = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setDepartment(value);
};


const handleSaveEmployee = async (e) => {
  e.preventDefault();
  let newid=0;
  const getMaxId = () =>{
    const ids = globalStore.employeesList.map(employee => employee.id);
    console.log('ids',ids);
    newid=Math.max(...ids)+1;
    console.log(newid);
  };
  getMaxId();

  const formData = {
    'id': newid,
    'firstName' : firstName,
    'lastName' : lastName,
    'department' : department,
    'startDate' : startDate,
    'dateOfBirth' : dateOfBirth,
    'street' : street,
    'city' : city,
    'state' : state,


}
console.log(formData);
dispatch(addEmployeeToList(formData));
};



    return (
      <div className="create-employee-container">
        <h2>Create Employee</h2>
        <form onSubmit={(e) => handleSaveEmployee(e)} id="create-employee">
          <div
            className="input-wrapper formData"
            data-error="Veuillez entrer au moins deux caractères"
          >
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              onChange={(e) => handleFirstName(e)}
            />
          </div>
          <div className="input-wrapper formData">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              onChange={(e) => handleLastName(e)}
            />
          </div>

          <div className="input-wrapper formData">
            <label htmlFor="date-of-birth">Date of Birth</label>
            <input
              type="text"
              id="date-of-birth"
              onChange={(e) => handleBirthDate(e)}
            />
            <DatePicker
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            onChange={onChange1}
            value={value1}
            yearAriaLabel="Year"
          />
          </div>

          <div className="input-wrapper formData">
            <label htmlFor="start-date">Start Date</label>
            <input
              type="text"
              id="start-date"
              onChange={(e) => handleStartDate(e)}
            />
            <DatePicker
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            onChange={onChange2}
            value={value2}
            yearAriaLabel="Year"
          />
          </div>
          <fieldset className="address">
            <legend>Address</legend>
            <div className="input-wrapper formData">
            <label htmlFor="street">Street</label>
            <input id="street" type="text" onChange={(e) => handleStreet(e)} />
            </div>
            <div className="input-wrapper formData">
            <label htmlFor="city">City</label>
            <input id="city" type="text" onChange={(e) => handleCity(e)} />
            </div>
            <div className="input-wrapper formData">
              <label htmlFor="state">State</label>
            <select name="state" id="state" onChange={(e) => handleState(e)}>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {" "}
                  {state.name}
                </option>
              ))}
            </select>
            </div>
            <div className="input-wrapper formData">
              <label htmlFor="zip-code">Zip Code</label>
              <input
                id="zip-code"
                type="number"
                onChange={(e) => handleZipCode(e)}
              />
            </div>
          </fieldset>
          <div className="input-wrapper formData">
          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            onChange={(e) => handleDepartment(e)}
          >
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
          </div>
          <div className='save-button-container'>
          <input className="save-button" type="submit" value="Save" />
          </div>
        </form>
        <span id="confirmation" className="modal">
          Employee Created!
        </span>
      </div>
    );
};

export default CreateEmployee;