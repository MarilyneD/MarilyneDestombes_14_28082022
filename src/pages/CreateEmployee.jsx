import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEmployeeToList } from '../feature/employeesSlice';
import states from '../data/stateList';
import USACities from '../data/USACities';
import DatePicker from 'react-date-picker';
import DropDown from '../components/DropDown';
import ModalPlugIn from 'marilyne-simplemodal-react';



const CreateEmployee = () => {
      const dispatch = useDispatch();
      const globalStore = useSelector(state => state.employees);
      const regexName = /^[a-zA-Z-\s]+$/;
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [department, setDepartment] = useState('');
      const [dateOfBirth, setDateOfBirth] = useState(new Date());
      const [startDate, setStartDate] = useState(new Date());
      const [state, setState] = useState('');
      const [cities, setCities]=useState(USACities);
      const [city, setCity] = useState('');
      const [street, setStreet] = useState('');
      const [zipCode, setZipCode] = useState('');
      const [employeeCreated,setEmployeeCreated] = useState(false);
      const [nbOfEmployeeCreated, setNbOfEmployeeCreated] = useState(0);
      const [error, setError] =useState(false);
      
let navigate = useNavigate();
useEffect(() => { if(!globalStore.employeesList){navigate("/")}}); 

useEffect(() => {
  setCities([]);
  setCities(USACities.filter(city => city.state=== state));
}, [state,setState]);


useEffect(() => {
  setError(false);
  setEmployeeCreated(false);
 }, [firstName, setFirstName,lastName, department, setDepartment, setLastName,street, setStreet,zipCode, setZipCode, city, setCity, state,setState]);


    
  const handleFirstName = async (e) => {
     e.preventDefault();
     let value = e.target.value;
     if (value.trim().length >= 2 && regexName.test(value)) {
     setFirstName(value);} 
};


const handleLastName = async (e) => {
     e.preventDefault();
     let value = e.target.value;
     if (value.trim().length >= 2 && regexName.test(value)) {
      setLastName(value);} 
  };

const handleStreet = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setStreet(value);
};

const handleState = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setState(value);
};


const handleCity = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setCity(value);
};

const handleZipCode = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setZipCode(value);
};


const handleDepartment = async (e) => {
  e.preventDefault();
  let value = e.target.value;
  setDepartment(value);
};


const handleSaveEmployee = async (e) => {
  e.preventDefault();
  let newid = 0;
  const getMaxId = () => {
    let ids = globalStore.employeesList.map((employee) => employee.id);
    //console.log("ids", ids);
    newid = Math.max(...ids) + 1;
    //console.log(newid);
  };
  getMaxId();

  let employeeFormularyData = {
    id: newid,
    firstName: firstName,
    lastName: lastName,
    department: department,
    startDate: startDate.toLocaleDateString(),
    dateOfBirth: dateOfBirth.toLocaleDateString(),
    street: street,
    city: city,
    state : state,
    zipCode: zipCode,
  };

  if (employeeFormularyData.firstName.length === 0 || employeeFormularyData.lastName.length === 0) {console.log(employeeFormularyData);
    setError(true);
  } else {
    console.log(employeeFormularyData);
    dispatch(addEmployeeToList(employeeFormularyData));

    const sendNewEmployee = async () => {
      axios
        .post("http://localhost:8000/newemployee", employeeFormularyData)
        .then((res) => res.data)
        .catch((error) => {
          console.log("error while sending new employee", error);
        });
    };
    sendNewEmployee();
    setEmployeeCreated(true);
    setNbOfEmployeeCreated(nbOfEmployeeCreated + 1);
    //setFirstName("");
  }
};



    return (
      <div className="create-employee-container">
        <img src="/img/createemployee-dark-green.svg" alt="" />
        <h2>Create Employee</h2>
        <form onSubmit={(e) => handleSaveEmployee(e)} id="create-employee">
          <div
            className="input-wrapper formData"
            data-error="Veuillez entrer au moins deux caractères"
          >
            <label className="first-name" htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              onChange={(e) => handleFirstName(e)}
            />
          </div>
          <div className="input-wrapper formData">
            <label className="last-name" htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              onChange={(e) => handleLastName(e)}
            />
          </div>

          <div className="input-wrapper formData">
            <label htmlFor="date-of-birth">Date of Birth</label>

            <DatePicker
              className="datepicker-style"
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date"
              onChange={setDateOfBirth}
              value={dateOfBirth}
              yearAriaLabel="Year"
              minDate={new Date(1950, 1, 1)}
              maxDate={new Date(2006, 0, 1)}
            />
          </div>

          <div className="input-wrapper formData">
            <label htmlFor="start-date">Start Date</label>

            <DatePicker
              className="datepicker-style"
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date"
              onChange={setStartDate}
              value={startDate}
              yearAriaLabel="Year"
            />
          </div>
          <fieldset className="address">
            <legend>Address</legend>
            <div className="input-wrapper formData">
              <label htmlFor="state">State</label>
              <DropDown
              name={"state"}
              id={"state"}
              onChangeFunction={(e) => {handleState(e)
              }}
              optionsArray={states.map(state => state.name)}
            />
            </div>
            <div className="input-wrapper formData">
              <label htmlFor="city">City</label>
              <DropDown
              name={"city"}
              id={"city"}
              onChangeFunction={(e) => {handleCity(e)
              }}
              optionsArray={cities.map(city => city.city)}
            />
            </div>

            <div className="input-wrapper formData">
              <label htmlFor="street">Street</label>
              <input
                id="street"
                type="text"
                onChange={(e) => handleStreet(e)}
              />
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
            <DropDown
              name={"department"}
              id={"department"}
              onChangeFunction={(e) => {handleDepartment(e)
              }}
              optionsArray={["Sales", "Marketing","Engineering","Human Resources","Legal"]}
            />
          </div>
          <div className="save-button-container">
            <input className="save-button" type="submit" value="Save" />
          </div>
        </form>
        <div className='modal-style' >
          <ModalPlugIn
          modalVisible={employeeCreated}
          mainTexT={"Employee Created !"}
          childrenText={nbOfEmployeeCreated + " Employees Created this session"}
        />
             
        </div>
        {error && (
          <span className="form-error">
            {" "}
            formulary not correctly completed / empty field
          </span>
        )}
      </div>
    );
};

export default CreateEmployee;