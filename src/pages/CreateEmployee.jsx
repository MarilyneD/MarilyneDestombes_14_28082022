import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { addEmployeeToList } from '../feature/employeesSlice';
import states from '../data/stateList';
import USACities from '../data/USACities';
import DatePicker from 'react-date-picker';
import Modal from '../components/Modal';


const CreateEmployee = () => {
      const dispatch = useDispatch();
      const globalStore = useSelector(state => state.employees);
      const regexName = /^[a-zA-Z-\s]+$/;
      const regexNumber = /^([0-9]|[1-9][0-9]|)$/;
      const [firstName, setfirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [department, setDepartment] = useState('');
      const [dateOfBirth, setDateOfBirth] = useState(new Date());
      const [startDate, setStartDate] = useState(new Date());
      const [state, setState] = useState('');
      const [cities, setCities]=useState(USACities);
      const [city, setCity] = useState('');
      const [street, setStreet] = useState('');
      const [zipCode, setzipCode] = useState('');
      const [employeeCreated,setEmployeeCreated] = useState(false);
      const [nbOfEmployeeCreated, setNbOfEmployeeCreated] = useState(0);
      const [stateList, setStateList] = useState(['']);
      const [error, setError] =useState(false);
      
  let navigate = useNavigate();
    useEffect(() => { if(!globalStore.employeesList){navigate("/")}       
        }, []);
  

useEffect(() => {
  setCities([]);
  setCities(USACities.filter(city => city.state=== state));
}, [state,setState]);


useEffect(() => {
  setError(false);
 }, [firstName, setfirstName,lastName, department, setDepartment, setLastName,street, setStreet,zipCode, setzipCode, city, setCity, state,setState]);



    
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
  let newid = 0;

  const getMaxId = () => {
    let ids = globalStore.employeesList.map((employee) => employee.id);
    //console.log("ids", ids);
    newid = Math.max(...ids) + 1;
    //console.log(newid);
  };
  getMaxId();

  let formData = {
    id: newid,
    firstName: firstName,
    lastName: lastName,
    department: department,
    startDate: startDate.toLocaleDateString(),
    dateOfBirth: dateOfBirth.toLocaleDateString(),
    street: street,
    city: city,
    state: state,
    zipCode: zipCode,
  };

  
  const employeeStillExist = () => {

    function withoutProperty(obj, property) {  
      const { [property]: unused, ...rest } = obj
    return rest
  }
   let employeesListNoID = globalStore.employeesList.map((employee) => withoutProperty(employee, 'id'));
   let formDataNoID = withoutProperty(formData, 'id');
   let found = employeesListNoID.find(employee => employee === formDataNoID);

    console.log("employeeListNoID",employeesListNoID.slice(199,210));
    console.log("formDataNoID",formDataNoID);
    console.log("found", found);
  
  };
  employeeStillExist();

   
 


  if (formData.firstName.length === 0 || formData.lastName.length === 0) {console.log(formData);
    setError(true);
  } else {
    console.log(formData);
    dispatch(addEmployeeToList(formData));

    const sendNewEmployee = async () => {
      axios
        .post("http://localhost:8000/newemployee", formData)
        .then((res) => res.data)
        .catch((error) => {
          console.log("error while sending new employee", error);
        });
    };
    sendNewEmployee();
    setEmployeeCreated(true);
    setNbOfEmployeeCreated(nbOfEmployeeCreated + 1);
  }
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
           
            <DatePicker
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
            <label htmlFor="city">City</label>
            <select name="city" id="city" onChange={(e) => handleCity(e)}>
              {cities.map((city,index) => (
                <option key={index} value={city.city}>
                  {" "}
                  {city.city}
                </option>
              ))}
            </select>
            </div>
            <div className="input-wrapper formData">
            <label htmlFor="street">Street</label>
            <input id="street" type="text" onChange={(e) => handleStreet(e)} />
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
        < Modal modalVisible={employeeCreated} nbOfEmployeeCreated={nbOfEmployeeCreated}/>
        {error && (<span className='form-error'> formulary not correctly completed / empty field</span>)} 
      </div>
    );
};

export default CreateEmployee;